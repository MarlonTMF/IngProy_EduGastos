class Gastos {
  constructor() {
    this.gastos = [];
  }
  registrarGasto(gasto) {
    this.gastos.push(gasto);
  }
  obtenerGastos() {
    return this.gastos;
  }
    // Método que calcula el total de los gastos
    calcularTotal() {
      return this.gastos.reduce((total, gasto) => total + gasto.monto, 0);
  }
}
export default Gastos;

