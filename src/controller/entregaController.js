const EntregaService = require('../services/entregaService.js');

async function requestEntrega(req, res) {
  const { idMontador, idRebocador, rotaEntrega, tempoEstimadoEntrega } = req.body;
  try {
    const entrega = await EntregaService.requestEntrega(idMontador, idRebocador, rotaEntrega, tempoEstimadoEntrega);
    res.json(entrega);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao solicitar entrega' });
  }
}

async function getEntregaById(req, res) {
  const { id } = req.params;
  try {
    const entrega = await EntregaService.getEntregaById(id);
    res.json(entrega);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter entrega' });
  }
}

async function updateEntrega(req, res) {
  const { id } = req.params;
  const newData = req.body;
  try {
    const entrega = await EntregaService.updateEntrega(id, newData);
    res.json(entrega);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar entrega' });
  }
}

async function getEntregasByUserId(req, res) {
  const { userId } = req.params;
  try {
    const entregas = await EntregaService.getEntregasByUserId(userId);
    res.json(entregas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter entregas do usuário' });
  }
}

module.exports = {
  requestEntrega,
  getEntregaById,
  updateEntrega,
  getEntregasByUserId,
};
