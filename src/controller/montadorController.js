const montadorService = require('../services/montadorService.js');

async function getById(req, res) {
  const { montadorId } = req.params;
  try {
    const montador = await montadorService.getMontadorById(montadorId);
    res.json(montador);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter montador' });
  }
}

async function createMontador(req, res) {
  const newMontador = req.body;
  try {
    const montador = await montadorService.createMontador(newMontador);
    res.status(201).json(montador);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar montador' });
  }
}

async function updateMontador(req, res) {
  const { montadorId } = req.params;
  const updateData = req.body;
  try {
    const montador = await montadorService.updateMontador(montadorId, updateData);
    res.json(montador);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar montador' });
  }
}

async function deleteMontador(req, res) {
  const { montadorId } = req.params;
  try {
    await montadorService.deleteMontador(montadorId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar montador' });
  }
}

// Exportar as funções
module.exports = {
  getById,
  createMontador,
  updateMontador,
  deleteMontador,
};
