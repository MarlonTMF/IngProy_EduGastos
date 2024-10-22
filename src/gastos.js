class Gastos {
  constructor() {
    this.gastos = [];
  }
  registrarGasto(gasto) {
    this.gastos.push(gasto);
  }
  obtenerGastos() {
    return this.gastos[0];
  }
}
//export default Gastos;
