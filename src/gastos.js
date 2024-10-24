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
}
export default Gastos;