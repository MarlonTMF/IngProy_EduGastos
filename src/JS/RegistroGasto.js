class Gastos {
  constructor() {
    this.gastos = [];
  }

  registrarGasto(gasto) {
    if (!gasto.fecha || !gasto.monto) {
      return;  
    }
    this.gastos.push(gasto);
  }

  obtenerGastos() {
    return this.gastos[0];
  }
}

export { Gastos };

