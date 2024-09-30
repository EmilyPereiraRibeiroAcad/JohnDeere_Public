const PedidoService = require('../services/pedidoService.js');

async function createPedido(req, res) {
  const { idMontador, descricao } = req.body;
  try {
    const pedido = await PedidoService.createPedido({ idMontador, descricao });
    res.status(201).json(pedido);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar pedido' });
  }
}

async function getPedidoById(req, res) {
  const { id } = req.params;
  try {
    const pedido = await PedidoService.getPedidoById(id);
    if (pedido) {
      res.json(pedido);
    } else {
      res.status(404).json({ error: 'Pedido não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter pedido' });
  }
}

async function getByMontadorId(req, res) {
  const { montadorId } = req.params;
  try {
    const pedidos = await PedidoService.getPedidosByMontador(montadorId);
    res.status(200).json(pedidos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

async function updatePedido(req, res) {
  const { id } = req.params;
  const newData = req.body;
  try {
    const pedido = await PedidoService.updatePedido(id, newData);
    if (pedido) {
      res.json(pedido);
    } else {
      res.status(404).json({ error: 'Pedido não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar pedido' });
  }
}

// Exportar as funções
module.exports = {
  createPedido,
  getPedidoById,
  getByMontadorId,
  updatePedido,
};
