# JohnDeere_Public
Repositorio publico do projeto John Deere
# Projeto JohnDeere Uber

## Introdução

**Problemática:**

Os principais desafios enfrentados incluem a localização precisa de equipamentos móveis, como carrinhos rebocadores, em grandes áreas de armazenamento e distribuição. A falta de visibilidade sobre a posição exata desses carrinhos pode resultar em perda de tempo e uma gestão ineficaz dos recursos.

**Objetivos:**

1. **Desenvolver um sistema de rastreamento preciso** para carrinhos rebocadores, utilizando triangulação de roteadores.
2. **Melhorar a eficiência na localização e utilização** dos carrinhos rebocadores dentro de grandes áreas de operação.
3. **Fornecer uma interface web intuitiva**, que permita aos operadores visualizar em tempo real a posição dos carrinhos.
4. **Reduzir o tempo de busca e aumentar a produtividade operacional** através de um sistema de rastreamento confiável e acessível.

## Desenvolvimento

### Arquitetura do Sistema

A arquitetura do sistema de rastreamento foi desenvolvida utilizando o ESP32 para capturar dados de localização, roteadores para enviar e receber esses dados, e um servidor para processar as informações.

#### Componentes da Arquitetura:

1. **ESP32**: Responsável por coletar e enviar dados de localização via Wi-Fi.
2. **Roteadores Wi-Fi**: Instalados estrategicamente, coletam a intensidade do sinal do ESP32 e transmitem os dados ao servidor.
3. **Servidor Central**: Processa os dados enviados pelos roteadores e realiza os cálculos de triangulação para determinar a posição exata dos carrinhos.
4. **Aplicativo Web**: Interface desenvolvida para que operadores visualizem a posição dos carrinhos em tempo real.

### Descrição de Execução dos Componentes

- **ESP32**: O ESP32 rodará diretamente nos carrinhos, coletando dados de intensidade de sinal e enviando-os via Wi-Fi para os roteadores mais próximos. Esses dados serão enviados em intervalos regulares para garantir precisão.

- **Roteadores**: Posicionados nas extremidades do local de operação, os roteadores recebem as informações dos ESP32 e comunicam a distância estimada entre o carrinho e o roteador ao servidor central, utilizando uma rede local.

- **Servidor Central**: Rodando localmente ou em um servidor de nuvem (dependendo da escala do sistema), o servidor receberá os dados dos roteadores, realizará os cálculos de triangulação e armazenará a posição dos carrinhos em um banco de dados. Este servidor também fornecerá uma API para o aplicativo web, permitindo o acesso aos dados em tempo real.

- **Aplicativo Web**: Hospedado em um servidor web, a interface web será acessada por operadores para visualizar a posição dos carrinhos, verificar sua disponibilidade e facilitar a gestão operacional.

### Funcionamento e Resultados Esperados

- **Funcionamento**: O sistema IoT baseado no ESP32 comunicará constantemente a localização dos carrinhos para os roteadores. Estes, por sua vez, retransmitirão as informações para o servidor, que processará e calculará a posição exata do carrinho utilizando algoritmos de triangulação. Os operadores poderão visualizar essa posição em tempo real por meio da interface web.

- **Resultados Esperados**: Espera-se uma melhoria significativa na eficiência da gestão dos carrinhos, reduzindo o tempo de busca e aumentando a produtividade operacional. O sistema fornecerá dados precisos e em tempo real, ajudando na tomada de decisões rápidas e informadas.

### Tecnologias Envolvidas

- **ESP32**: Hardware IoT utilizado para coleta de dados.
- **Wi-Fi**: Meio de comunicação entre ESP32 e roteadores.
- **Servidor**: Responsável pelo processamento e armazenamento de dados. Pode ser implementado em um ambiente de nuvem (AWS, Azure, etc.) ou localmente, dependendo da infraestrutura disponível.
- **Node.js**: Utilizado no desenvolvimento do servidor e processamento de dados.
- **MongoDB**: Banco de dados utilizado para armazenar os dados de localização dos carrinhos e o resultado da triangulação.
- **JavaScript (ES2016)**: Para o desenvolvimento da interface web.
- **HTML5 e CSS3**: Para estrutura e estilo da interface web.

## Resultados

O sistema de rastreamento desenvolvido obteve os seguintes resultados:

1. **Aumento da Eficiência Operacional**: A implementação do rastreamento em tempo real reduziu significativamente o tempo gasto na localização dos carrinhos rebocadores, otimizando a utilização dos recursos e melhorando o fluxo de trabalho nas áreas de operação.

2. **Precisão na Localização**: Utilizando a triangulação de sinal entre os roteadores e o ESP32, foi possível obter uma precisão de localização dentro da margem esperada, permitindo o monitoramento exato dos carrinhos em grandes áreas.

3. **Visualização em Tempo Real**: O aplicativo web oferece uma interface intuitiva, permitindo que os operadores acompanhem em tempo real a posição exata dos carrinhos, facilitando a tomada de decisões rápidas e assertivas.

4. **Redução do Tempo de Busca**: O sistema possibilitou uma redução significativa no tempo de busca dos carrinhos, aumentando a eficiência geral do processo e reduzindo o tempo de ociosidade dos operadores.

5. **Escalabilidade**: A arquitetura modular e o uso de tecnologias como ESP32 e servidores locais ou na nuvem permitem a escalabilidade do sistema para atender a diferentes tamanhos de áreas e volumes de carrinhos.

6. **Integração de Hardware e Software**: A integração bem-sucedida entre o hardware IoT (ESP32), os roteadores, o servidor central e o aplicativo web garantiu um fluxo contínuo de dados e processamento eficiente, resultando em uma solução robusta e confiável.



## Testes de desempenho
1 Teste de Precisão de Localização - Foi criada dentro da pasta TESTS o serviço testeLocalizacaoService.test.js feito pra testar a precisão dos dados recebidos, teste foi feito durante os testes do esp para que pudéssemos diminuir ou aumentar o delay e a "tara" da distancia.

Teste de Estabilidade de Sinal - já existe e está integrado ao código do server.js onde caso exista uma influencia negativa no sinal, faça com que gere erros como 500 - internal server
Teste de Tempo de Resposta - existe um delay no código do Arduino para que a partir desse tempo determinado, envie uma mensagem no terminal de que a mensagem não foi enviada, ou de que foi enviada e recebida com sucesso.
Teste de Consumo de Energia - Caso o dispositivo do ESP32 tenha problema de conexão o LED amarelo pisca, alertando a baixa potencia de energia.
Teste de Capacidade Multidispositivo Simultâneos - No código do esp já existe uma filtragem de dispositivos, para que não seja armazenado os dados de mais de 3 roteadores ao mesmo tempo.a

