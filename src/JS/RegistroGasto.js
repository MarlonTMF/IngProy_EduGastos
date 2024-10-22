
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

function validarCampos(fecha) {
  let errores = [];
  if (!fecha) {
    errores.push("El campo de fecha es obligatorio.");
  }
  return errores;
}
export { Gastos, validarCampos };


