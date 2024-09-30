const PedidoRepository = require('../repositories/pedidoRepository');
const MontadorRepository = require('../repositories/montadorRepository');

class PedidoService {
  async createPedido(pedidoData) {
    try {
      const pedido = await PedidoRepository.create(pedidoData);
      await MontadorRepository.updateTotalPedidos(pedido.idMontador, 1);
      return pedido;
    } catch (error) {
      throw new Error('Erro ao criar pedido: ' + error.message);
    }
  }

  async getPedidoById(pedidoId) {
    try {
      return await PedidoRepository.findById(pedidoId);
    } catch (error) {
      throw new Error('Erro ao obter pedido: ' + error.message);
    }
  }

  async getPedidosByMontador(montadorId) {
    try {
      return await PedidoRepository.getByMontador(montadorId);
    } catch (error) {
      throw new Error('Erro ao obter pedidos pelo montador: ' + error.message);
    }
  }

  async getTotalPedidos() {
    try {
      return await PedidoRepository.countTotal();
    } catch (error) {
      throw new Error('Erro ao obter total de pedidos: ' + error.message);
    }
  }

  async deletePedido(pedidoId) {
    try {
      const pedido = await PedidoRepository.findById(pedidoId);
      if (pedido) {
        await MontadorRepository.updateTotalPedidos(pedido.idMontador, -1);
        return await PedidoRepository.delete(pedidoId);
      }
      return null;
    } catch (error) {
      throw new Error('Erro ao deletar pedido: ' + error.message);
    }
  }
}

module.exports = new PedidoService();
