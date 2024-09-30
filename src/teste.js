const { createCanvas } = require('canvas');
const fs = require('fs');

// Função para calcular a posição do ponto usando trilateração
function encontrarPosicao(distancias) {
    // Posições fixas dos roteadores
    const roteadores = [[1, 1], [1, 9], [9, 5]];
    const x1 = roteadores[0][0];
    const y1 = roteadores[0][1];
    const x2 = roteadores[1][0];
    const y2 = roteadores[1][1];
    const x3 = roteadores[2][0];
    const y3 = roteadores[2][1];

    const r1 = distancias[0];
    const r2 = distancias[1];
    const r3 = distancias[2];

    // Cálculo usando fórmulas de trilateração
    const A = 2 * (x2 - x1);
    const B = 2 * (y2 - y1);
    const C = r1 * r1 - r2 * r2 - x1 * x1 + x2 * x2 - y1 * y1 + y2 * y2;
    const D = 2 * (x3 - x1);
    const E = 2 * (y3 - y1);
    const F = r1 * r1 - r3 * r3 - x1 * x1 + x3 * x3 - y1 * y1 + y3 * y3;

    // Verificar se E é zero para evitar divisão por zero
    if (E === 0) {
        throw new Error("Divisão por zero detectada no cálculo de trilateração");
    }

    // Resolvendo para x e y
    const x = (C - F * (B / E)) / (A - D * (B / E));
    const y = (C - A * x) / B;

    return [x, y];
}

// Exemplo de distâncias (em metros)
const distancias = [5, 5, 10];  // Ajuste as distâncias conforme necessário

// Encontrar a posição com base nas distâncias
const posicao = encontrarPosicao(distancias);

// Desenhar a matriz e a posição estimada
const roteadores = [[1, 1], [1, 9], [9, 5]];
console.log(roteadores, (posicao[0] * (-1.0)), posicao[1]);




// /////

// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const bodyParser = require('body-parser');

// dotenv.config();

// const app = express();
// app.use(cors());
// const PORT = process.env.PORT || 3000; // Defina a porta aqui

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// // Conectar ao MongoDB
// mongoose.set('strictQuery', false);
// const connectToDatabase = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('Conectado ao MongoDB Atlas com sucesso');
//   } catch (error) {
//     console.error('Erro ao conectar ao MongoDB Atlas:', error);
//   }
// };

// // Definição do esquema e modelo para Localizacao
// const localizacaoSchema = new mongoose.Schema({
//   ID: String,
//   router1_ssid: String,
//   router1_distancia: Number,
//   router2_ssid: String,
//   router2_distancia: Number,
//   router3_ssid: String,
//   router3_distancia: Number,
//   status: String,
// }, { timestamps: true });

// const Localizacao = mongoose.model('Localizacao', localizacaoSchema);

// app.get('/', (req, res) => {
//   res.send('Servidor está funcionando!');
// });

// // Rota para receber os dados do ESP32 via POST
// app.post('/localizacaos', async (req, res) => {
//   const { ID, router1_ssid, router1_distancia, router2_ssid, router2_distancia, router3_ssid, router3_distancia, Status } = req.body;

//   // Processar os dados recebidos
//   console.log('Dados recebidos do ESP32:', req.body);

//   try {
//     // Criar uma nova instância do modelo Localizacao
//     const localizacao = new Localizacao({
//       ID,
//       router1_ssid,
//       router1_distancia,
//       router2_ssid,
//       router2_distancia,
//       router3_ssid,
//       router3_distancia,
//       status: Status,
//     });

//     // Salvar a nova localização no banco de dados
//     await localizacao.save();

//     // Enviar uma resposta para o ESP32
//     res.status(200).send('Dados recebidos com sucesso');
//   } catch (error) {
//     console.error('Erro ao salvar dados:', error);
//     res.status(500).send('Erro ao processar os dados');
//   }
// });

// // Rota para obter dados filtrados de distâncias
// app.get('/localizacaos', async (req, res) => {
//   try {
//     const localizacoes = await Localizacao.find({}, 'ID router1_distancia router2_distancia router3_distancia');
//     res.status(200).json(localizacoes);
//   } catch (error) {
//     console.error('Erro ao obter localizações:', error);
//     res.status(500).send('Erro ao obter as localizações');
//   }
// });

// // Conectar ao banco de dados
// connectToDatabase();

// // Iniciar o servidor
// app.listen(PORT, () => {
//   console.log(`Servidor rodando em http://localhost:${PORT}`);
// });

// // Middleware para erros de rota
// app.use((req, res, next) => {
//   console.error(`404 Not Found: ${req.method} ${req.originalUrl}`);
//   res.status(404).json({ message: 'Not Found' });
// });

// // Middleware para erros do servidor
// app.use((err, req, res, next) => {
//   console.error(`500 Internal Server Error: ${err.message}`);
//   res.status(500).json({ message: 'Internal Server Error' });
// });

///esse codigo tá zoado (provavelmente)