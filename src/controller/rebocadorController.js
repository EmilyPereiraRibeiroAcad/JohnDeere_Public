const RebocadorService = require('../services/rebocadorService.js');

async function register(req, res) {
  const { userId, nome, email, senha } = req.body;
  try {
    const rebocador = await RebocadorService.registerRebocador(userId, nome, email, senha);
    res.status(201).json(rebocador);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao registrar rebocador' });
  }
}

async function profile(req, res) {
  const { id } = req.user;
  try {
    const rebocador = await RebocadorService.getRebocadorByUserId(id);
    res.json(rebocador);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter perfil do rebocador' });
  }
}

async function updateProfile(req, res) {
  const { userId } = req.user;
  const { nome, email } = req.body;
  try {
    const rebocador = await RebocadorService.updateRebocador(userId, nome, email);
    res.json(rebocador);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar perfil do rebocador' });
  }
}

async function listPedidos(req, res) {
  const { id } = req.params;
  try {
    const pedidos = await RebocadorService.listPedidos(id);
    res.json(pedidos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar pedidos do rebocador' });
  }
}

// Exportar as funções
module.exports = {
  register,
  profile,
  updateProfile,
  listPedidos,
};
