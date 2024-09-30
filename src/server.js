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

// // Rota de teste
// app.get('/', (req, res) => {
//   res.send('Servidor está funcionando!');
// });

// // Definindo as rotas
// const userRoutes = require('./routes/userRoutes.js');
// const rebocadorRoutes = require('./routes/rebocadorRoutes.js');
// const montadorRoutes = require('./routes/montadorRoutes.js');
// const entregaRoutes = require('./routes/entregaRoutes.js');
// const pedidoRoutes = require('./routes/pedidoRoutes.js');
// const pontuacaoRoutes = require('./routes/pontuacaoRoutes.js');
// const Localizacao = require('./models/Localizacao.js');
// const posicaoRoutes = require ('./routes/posicaoRoutes.js');
// // const calculoRoutes = require('./routes/calculoRoutes'); // Ajuste o caminho conforme necessário

// // app.use('/calculos', calculoRoutes);
// app.use('/users', userRoutes);
// app.use('/rebocadors', rebocadorRoutes);
// app.use('/montadores', montadorRoutes);
// app.use('/entregas', entregaRoutes);
// app.use('/pedidos', pedidoRoutes);
// app.use('/pontuacao', pontuacaoRoutes);
// app.use ('/posicao', posicaoRoutes);

// // Rota para receber os dados do ESP32 via POST
// app.post('/localizacaos', async (req, res) => {
//   const { ID, router1_ssid, router1_distancia, router2_ssid, router2_distancia, router3_ssid, router3_distancia, Status } = req.body;

//   // Processar os dados recebidos
//   console.log('Dados recebidos do ESP32:', req.body);

//   try {
//     // Criar uma nova instância do modelo Localizacao
//     const localizacaoSchema = new mongoose.Schema({
//       ID: String,
//       router1_ssid: String,
//       router1_distancia: Number,
//       router2_ssid: String,
//       router2_distancia: Number,
//       router3_ssid: String,
//       router3_distancia: Number,
//       status: String,
//     }, { timestamps: true });
    
//     const Localizacao = mongoose.model('Localizacao', localizacaoSchema);
    
//     // Definição do esquema e modelo para Distancia
//     const distanciaSchema = new mongoose.Schema({
//       ID: String,
//       router1_distancia: Number,
//       router2_distancia: Number,
//       router3_distancia: Number,
//     }, { timestamps: true });
    
//     const Distancia = mongoose.model('Distancia', distanciaSchema);
    
//     // Rota para receber os dados do ESP32 via POST
//     app.post('/localizacaos', async (req, res) => {
//       const { ID, router1_ssid, router1_distancia, router2_ssid, router2_distancia, router3_ssid, router3_distancia, Status } = req.body;
    
//       // Processar os dados recebidos
//       console.log('Dados recebidos do ESP32:', req.body);
    
//       try {
//         // Criar e salvar a nova localização no banco de dados
//         const localizacao = new Localizacao({
//           ID,
//           router1_ssid,
//           router1_distancia,
//           router2_ssid,
//           router2_distancia,
//           router3_ssid,
//           router3_distancia,
//           status: Status,
//         });
    
//         await localizacao.save();
    
//         // Atualizar ou criar as distâncias na coleção Distancia
//         await Distancia.findOneAndUpdate(
//           { ID },
//           {
//             router1_distancia,
//             router2_distancia,
//             router3_distancia,
//           },
//           { upsert: true } // Cria um novo documento se não existir
//         );
    
//         // Enviar uma resposta para o ESP32
//         res.status(200).send('Dados recebidos e salvos com sucesso');
//       } catch (error) {
//         console.error('Erro ao salvar dados:', error);
//         res.status(500).send('Erro ao processar os dados');
//       }
//     });
    
//     // Rota para obter dados filtrados de distâncias
//     app.get('/distancias', async (req, res) => {
//       try {
//         const distancias = await Distancia.find({}, 'ID router1_distancia router2_distancia router3_distancia');
//         res.status(200).json(distancias);
//       } catch (error) {
//         console.error('Erro ao obter distâncias:', error);
//         res.status(500).send('Erro ao obter as distâncias');
//       }
//     });
    

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
