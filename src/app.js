const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Conectar ao MongoDB
mongoose.set('strictQuery', false);
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado ao MongoDB Atlas com sucesso');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB Atlas:', error);
  }
};

//Variavel global
global.router1_distancia = 0.0;
global.router2_distancia = 0.0;
global.router3_distancia = 0.0;


// Definindo esquemas e modelos
const localizacaoSchema = new mongoose.Schema({
  ID: String,
  router1_ssid: String,
  router1_distancia: Number,
  router2_ssid: String,
  router2_distancia: Number,
  router3_ssid: String,
  router3_distancia: Number,
  status: String,
}, { timestamps: true });

const Localizacao = mongoose.model('Localizacao', localizacaoSchema);

const distanciaSchema = new mongoose.Schema({
  ID: String,
  router1_distancia: Number,
  router2_distancia: Number,
  router3_distancia: Number,
}, { timestamps: true });

const Distancia = mongoose.model('Distancia', distanciaSchema);

// Rota de teste
app.get('/', (req, res) => {
  res.send('Servidor está funcionando!');
});

// Rota para receber os dados do ESP32 via POST
app.post('/localizacaos', async (req, res) => {
  const { ID, router1_ssid, router1_distancia, router2_ssid, router2_distancia, router3_ssid, router3_distancia, Status } = req.body;

  console.log('Dados recebidos do ESP32:', req.body);

  try {
    // Criar e salvar a nova localização no banco de dados
    const localizacao = new Localizacao({
      ID,
      router1_ssid,
      router1_distancia,
      router2_ssid,
      router2_distancia,
      router3_ssid,
      router3_distancia,
      status: Status,
    });

    await localizacao.save();

    // Atualizar ou criar as distâncias na coleção Distancia
    await Distancia.findOneAndUpdate(
      { ID },
      {
        router1_distancia,
        router2_distancia,
        router3_distancia,
      },
      { upsert: true }
    );

    res.status(200).send('Dados recebidos e salvos com sucesso');
  } catch (error) {
    console.error('Erro ao salvar dados:', error);
    res.status(500).send('Erro ao processar os dados');
  }
});

// Rota para obter dados filtrados de distâncias
app.get('/distancias', async (req, res) => {
  try {
    const distancias = await Distancia.find({}, 'ID router1_distancia router2_distancia router3_distancia');
    res.status(200).json(distancias);
  } catch (error) {
    console.error('Erro ao obter distâncias:', error);
    res.status(500).send('Erro ao obter as distâncias');
  }
});

// Conectar ao banco de dados
connectToDatabase();

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// Middleware para erros de rota
app.use((req, res, next) => {
  console.error(`404 Not Found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ message: 'Not Found' });
});

// Middleware para erros do servidor
app.use((err, req, res, next) => {
  console.error(`500 Internal Server Error: ${err.message}`);
  res.status(500).json({ message: 'Internal Server Error' });
});




const fs = require('fs');
const { createCanvas } = require('canvas');

// Função para calcular a posição do ponto usando trilateração
function encontrarPosicao(distancia) {
    const roteadores = [[1, 1], [1, 9], [9, 5]];
    const x1 = roteadores[0][0];
    const y1 = roteadores[0][1];
    const x2 = roteadores[1][0];
    const y2 = roteadores[1][1];
    const x3 = roteadores[2][0];
    const y3 = roteadores[2][1];

    const r1 = distancia[0];
    const r2 = distancia[1];
    const r3 = distancia[2];

    const A = 2 * (x2 - x1);
    const B = 2 * (y2 - y1);
    const C = r1 * r1 - r2 * r2 - x1 * x1 + x2 * x2 - y1 * y1 + y2 * y2;
    const D = 2 * (x3 - x1);
    const E = 2 * (y3 - y1);
    const F = r1 * r1 - r3 * r3 - x1 * x1 + x3 * x3 - y1 * y1 + y3 * y3;

    if (E === 0) {
        throw new Error("Divisão por zero detectada no cálculo de trilateração");
    }

    const x = (C - F * (B / E)) / (A - D * (B / E));
    const y = (C - A * x) / B;

    return [x, y];
}

// Função para desenhar a matriz e a posição calculada em um canvas
function desenharMatriz(posicao, roteadores) {
    const canvas = createCanvas(500, 500);
    const ctx = canvas.getContext('2d');

    // Desenhar o fundo
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Escala de conversão (assumindo que a matriz é 10x10 e canvas é 500x500)
    const escala = 50;

    // Desenhar roteadores
    ctx.fillStyle = '#0000ff'; // Cor azul para roteadores
    roteadores.forEach(([x, y]) => {
        ctx.beginPath();
        ctx.arc(x * escala, canvas.height - y * escala, 10, 0, Math.PI * 2);
        ctx.fill();
    });

    // Desenhar a posição estimada
    ctx.fillStyle = '#ff0000'; // Cor vermelha para posição estimada
    ctx.beginPath();
    ctx.arc(posicao[0] * escala, canvas.height - posicao[1] * escala, 10, 0, Math.PI * 2);
    ctx.fill();

    // Salvar o canvas em um arquivo
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync('./trilateracao.png', buffer);
    console.log('Imagem salva como trilateracao.png');
}

// Exemplo de distâncias (em metros)
const distancia = [router1_distancia, router2_distancia, router3_distancia];  // Ajuste as distâncias conforme necessário

// Encontrar a posição com base nas distâncias
const posicao = encontrarPosicao(distancia);

// Desenhar a matriz e a posição estimada
const roteadores = [[1, 1], [1, 9], [9, 5]];
desenharMatriz(posicao, roteadores);
