#include <WiFi.h>
#include <HTTPClient.h>

// Pinos usados no ESP32
#define RX 16
#define TX 17

const char* testeURL = "http://www.google.com";

// Potência de transmissão em dBm a 1 metro de distância (padrão típico)
const int txPower = -59;

// Número de roteadores a serem retornados
const int NUM_ROUTERS = 3;
int ID = 01;  // ID do dispositivo

// Defina aqui a rede WiFi e SENHA_DO_WIFI para conexão
const char* NOME_DO_WIFI = "Bocao 2.4g";
const char* SENHA_DO_WIFI = "PEDAGOGA22";

// URL do servidor para enviar os dados
const char* urlServer = "http://192.168.100.85:3000/localizacaos";

// Defina os SSIDs dos três pontos Wi-Fi específicos que você deseja monitorar
const char* SSID_ALVO[NUM_ROUTERS] = {"", "", ""};

// Pinos dos LEDs
const int ledVerde = 2;     // Pino onde o LED verde está conectado
const int ledVermelha = 15;      // Pino onde o LED vermelho está conectado
const int botaoStatus = 4;       // Pino onde o botão está conectado
const int ledAmarela = 5;       //Pino onde o LED amarelo está conectado (LED DE SINALIZAÇÃO DE ERRO)

bool ledVerdeLigado = true;         // Variável para armazenar o estado do LED (true = verde ligado, false = vermelho ligado)
volatile bool botaoPressionado = false; // Variável alterada pela interrupção

const char* statusAtual = "Disponivel"; // Variável que armazena o estado atual dos LEDs

// Função chamada quando o botão é pressionado
void IRAM_ATTR botaoFoiPressionado() {
  static unsigned long ultimoAperto = 0;
  unsigned long aperto = millis();

  // Apenas troca o estado se o debounce estiver satisfeito
  if (aperto - ultimoAperto > 50) { // 100ms debounce
    ledVerdeLigado = !ledVerdeLigado;  // Alterna o estado do LED verde
    botaoPressionado = true;  // Marca que o botão foi pressionado
    ultimoAperto = aperto;  // Atualiza o tempo do último aperto
  }
}

//funções para n haver erro de compilação
void verificarConexaoWiFi();
void conectarWiFi();
void enviarDadosParaServidor(String listaSSID[], float listaDistancias[], int numRoteadores, int ID, String estadoLeds);
void selecionarRoteadoresEspecificos(String listaSSID[], float listaDistancias[], int n, int numRoteadores);
float calcularDistancia(int32_t rssi, int txPower);
void piscarLedAmarelo(int numPiscar, int tempoLigada, int tempoDesligada);
//

void setup() {
  Serial.begin(115200);
  // Exemplo para usar pinos diferentes
  Serial1.begin(9600, SERIAL_8N1, RX, TX); // Aqui 16 é RX2 e 17 é TX2
  
  // Conecta-se à rede WiFi definida
  conectarWiFi();
  
  // Configuração dos pinos
  pinMode(ledVerde, OUTPUT);
  pinMode(ledVermelha, OUTPUT);
  pinMode(ledAmarela, OUTPUT);
  pinMode(botaoStatus, INPUT_PULLUP);
  
  // Inicie com o LED verde ligado e o vermelho desligado
  digitalWrite(ledVerde, HIGH);
  digitalWrite(ledVermelha, LOW);
  digitalWrite(ledAmarela, LOW);

  // Configura a interrupção no botão
  attachInterrupt(digitalPinToInterrupt(botaoStatus), botaoFoiPressionado, FALLING);
  
  Serial.println("Iniciando busca por redes WiFi...");
}

unsigned long ultimaVarredura = 0;  // Para controlar a varredura WiFi
const unsigned long intervaloVarredura = 5000;  // 5 segundos

void loop() {
  // Verifica se o WiFi está conectado
  verificarConexaoWiFi();

  // Verifica se o botão foi pressionado
  if (botaoPressionado) {
    if (ledVerdeLigado) {
      digitalWrite(ledVerde, HIGH);  // Liga o LED verde
      digitalWrite(ledVermelha, LOW);  // Desliga o LED vermelho
      statusAtual = "Disponivel";  // Atualiza o status para "Disponível"
    } else {
      digitalWrite(ledVerde, LOW);  // Desliga o LED verde
      digitalWrite(ledVermelha, HIGH);  // Liga o LED vermelho
      statusAtual = "Ocupado";  // Atualiza o status para "Ocupado"
    }
    botaoPressionado = false;  // Reseta a variável após processar o evento
  }

  // Executa a varredura WiFi a cada 5 segundos sem usar delay
  unsigned long agora = millis();
  if (agora - ultimaVarredura >= intervaloVarredura) {
    ultimaVarredura = agora;

    int n = WiFi.scanNetworks();
    if (n == 0) {
      Serial.println("Nenhuma rede encontrada");
    } else {
      Serial.printf("%d redes encontradas:\n", n);
    
      // Array para armazenar SSID e distâncias
      String listaSSID[n];
      float listaDistancias[n];
    
      for (int i = 0; i < n; ++i) {
        String ssid = WiFi.SSID(i);
        int32_t rssi = WiFi.RSSI(i);
        float distancia = calcularDistancia(rssi, txPower);
      
        listaSSID[i] = ssid;
        listaDistancias[i] = distancia;
      
        Serial.printf("SSID: %s, RSSI: %d dBm, Distância estimada: %.2f metros\n", ssid.c_str(), rssi, distancia);
      }
    
      // Seleciona os roteadores desejados ou substitui pelos mais próximos
      selecionarRoteadoresEspecificos(listaSSID, listaDistancias, n, NUM_ROUTERS);

      // Envia as informações para o servidor, incluindo o estado dos LEDs
      enviarDadosParaServidor(listaSSID, listaDistancias, NUM_ROUTERS, ID, statusAtual);
    }
  }
}

void piscarLedAmarelo(int numPiscar, int tempoLigada, int tempoDesligada) {
  for (int i = 0; i < numPiscar; i++) {
    digitalWrite(ledAmarela, HIGH);
    delay(tempoLigada);
    digitalWrite(ledAmarela, LOW);
    delay(tempoDesligada);
  }
}

// Função para conectar à rede WiFi indefinidamente

void conectarWiFi() {
  WiFi.begin(NOME_DO_WIFI, SENHA_DO_WIFI);  // Inicia a conexão com o WiFi
  int tentativas = 0;
  // Continua tentando conectar enquanto não estiver conectado
  while (WiFi.status() != WL_CONNECTED) {
    delay(100);  // Aguarda 100 ms entre as tentativas
    Serial.println("Tentando conectar ao WiFi...");  // Exibe uma mensagem a cada tentativa
    // Pisca o LED amarelo 2 vezes
    piscarLedAmarelo(2, 500, 1000);
    tentativas ++;

    if (tentativas > 30)
    {
      piscarLedAmarelo(5, 500, 500);
      Serial.print("Falha ao conectar ao WiFi apos varias tentativas. Reiniciando...");
    }
  }

  // Quando a conexão for bem-sucedida
  Serial.println("Conectado ao WiFi!");  // Mensagem de sucesso

  if(checagemDeInternet()){
    Serial.println("Conectado à internet.");
  } else {
    Serial.println("Sem acesso à internet.");
    piscarLedAmarelo(4, 1000, 500);
    return;
  }
}


// Função para verificar a conexão WiFi e tentar reconectar se desconectado
void verificarConexaoWiFi() {

  if (WiFi.status() != WL_CONNECTED) {
    int tentativas = 0;
    Serial.print("WiFi desconectado!\nTentando reconectar...");

    while (WiFi.status() != WL_CONNECTED) {
      
      // Tenta reconectar ao WiFi
      conectarWiFi();

      // Espera 3 segundos antes de tentar novamente
      delay(3000);
      
      tentativas++; //Contador

      if (tentativas > 30)
      {
        piscarLedAmarelo(5, 500, 500);
        Serial.print("Falha ao conectar ao WiFi apos varias tentativas. Reiniciando...");
      }
      
    }
  }
}

// Função para calcular a distância com base no RSSI
float calcularDistancia(int32_t rssi, int txPower) {
  if (rssi == 0) {
    return -1.0; // Impossível calcular a distância
  }
  
  float ratio = rssi * 1.0 / txPower;
  if (ratio < 1.0) {
    return pow(ratio, 10);
  } else {
    return (0.89976) * pow(ratio, 7.7095) + 0.111;
  }
}

// Função para selecionar os roteadores desejados ou substitui pelos mais próximos
void selecionarRoteadoresEspecificos(String listaSSID[], float listaDistancias[], int n, int numRoteadores) {
  String roteadoresSelecionados[numRoteadores];
  float distanciasSelecionadas[numRoteadores];

  // Inicializa os arrays de SSID e distâncias selecionadas
  for (int i = 0; i < numRoteadores; i++) {
    roteadoresSelecionados[i] = "";
    distanciasSelecionadas[i] = 1e6; // Valor arbitrariamente grande
  }

  // Primeiro, tenta encontrar os SSIDs desejados
  for (int i = 0; i < numRoteadores; i++) {
    for (int j = 0; j < n; j++) {
      if (listaSSID[j] == SSID_ALVO[i]) {
        roteadoresSelecionados[i] = listaSSID[j];
        distanciasSelecionadas[i] = listaDistancias[j];
        break;
      }
    }
  }

  // Para cada SSID não encontrado, substitui pelo mais próximo disponível que não esteja na lista de selecionados
  for (int i = 0; i < numRoteadores; i++) {
    if (roteadoresSelecionados[i] == "") {
      int indexMaisProximo = -1;
      float menorDistancia = 1e6; // Valor arbitrariamente grande
      
      for (int j = 0; j < n; j++) {
        // Verifica se o SSID já foi selecionado
        bool jaSelecionado = false;
        for (int k = 0; k < numRoteadores; k++) {
          if (listaSSID[j] == roteadoresSelecionados[k]) {
            jaSelecionado = true;
            break;
          }
        }

        // Se não foi selecionado e a distância é menor, seleciona este
        if (!jaSelecionado && listaDistancias[j] < menorDistancia) {
          indexMaisProximo = j;
          menorDistancia = listaDistancias[j];
        }
      }

      // Se encontrou um SSID para substituir, faz a substituição
      if (indexMaisProximo != -1) {
        roteadoresSelecionados[i] = listaSSID[indexMaisProximo];
        distanciasSelecionadas[i] = listaDistancias[indexMaisProximo];
      }
    }
  }

  // Substitui os arrays originais pelos selecionados
  for (int i = 0; i < numRoteadores; i++) {
    listaSSID[i] = roteadoresSelecionados[i];
    listaDistancias[i] = distanciasSelecionadas[i];
  }

  // Exibe os roteadores selecionados
  Serial.print("Roteadores selecionados: ");
  for (int i = 0; i < numRoteadores; i++) {
    Serial.printf("%s (%.2f metros)", roteadoresSelecionados[i].c_str(), distanciasSelecionadas[i]);
    if (i < numRoteadores - 1) Serial.print(" e ");
  }
  Serial.println();
}

// Função para enviar dados ao servidor via HTTP
void enviarDadosParaServidor(String listaSSID[], float listaDistancias[], int numRoteadores, int ID, String estadoLeds) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(urlServer);

    String payload = "ID=" + String(ID);
    for (int i = 0; i < numRoteadores; i++) {
      payload += "&router" + String(i+1) + "_ssid=" + listaSSID[i];
      payload += "&router" + String(i+1) + "_distancia=" + String(listaDistancias[i], 2);
    }
    payload += "&Status=" + estadoLeds;  // Adiciona o estado dos LEDs à string de dados

    http.addHeader("Content-Type", "application/x-www-form-urlencoded");

    // Tenta enviar os dados para o servidor até 5 vezes
    for (int tentativa = 0; tentativa < 10; tentativa++) {
      int httpResponseCode = http.POST(payload);
      
      if (httpResponseCode > 0) {
        String response = http.getString();
        Serial.printf("Resposta do servidor: %s\n", response.c_str());
        break;  // Sai do loop se a solicitação foi bem-sucedida
      } else {
        Serial.printf("Erro na solicitação HTTP (tentativa %d): %d\n", tentativa + 1, httpResponseCode);
        piscarLedAmarelo(3, 500, 500);
      }

      if (tentativa == 9) {  // Se chegou à última tentativa e falhou
        Serial.println("Erro: Não foi possível enviar os dados após 5 tentativas. Retornando ao loop.");
        http.end();
        piscarLedAmarelo(5, 500, 500);
      }
    }
    http.end();
  } else {
    Serial.println("Erro: Não conectado ao WiFi");
  }
}

bool checagemDeInternet() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(testeURL);  // Tenta acessar o Google
    int httpCode = http.GET();

    if (httpCode > 0) {  // Se conseguir obter uma resposta
      return true;  // Acesso à internet disponível
    } else {
      return false;  // Não conseguiu acessar a internet
    }
    
    http.end();
  }
  return false;  // Não está conectado ao WiFi
}
