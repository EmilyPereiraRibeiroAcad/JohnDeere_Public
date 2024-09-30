const montadorService = require('../services/montadorService');

async function getMontadorById(req, res) {
  const { id } = req.params;
  try {
    const montador = await montadorService.getMontadorById(id);
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
  const { id } = req.params;
  const updateData = req.body;
  try {
    const montador = await montadorService.updateMontador(id, updateData);
    res.json(montador);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar montador' });
  }
}

async function deleteMontador(req, res) {
  const { id } = req.params;
  try {
    await montadorService.deleteMontador(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar montador' });
  }
}

// Exportação padrão do conjunto de funções
const montadorController = {
  getMontadorById,
  createMontador,
  updateMontador,
  deleteMontador,
};

module.exports = montadorController;
