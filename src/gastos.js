class Gastos {
  constructor() {
    const gastosGuardados = JSON.parse(localStorage.getItem("gastos")) || [];
    this.gastos = gastosGuardados;
  }
  registrarGasto(gasto) {
    this.gastos.push(gasto);
    localStorage.setItem("gastos", JSON.stringify(this.gastos));
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

