import Ingresos from "./ingresos";

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

function validarCampos(fecha, monto) {
  let errores = [];
  if (!fecha) {
    errores.push("El campo de fecha es obligatorio.");
  }
  if (!monto) {
    errores.push("El campo de monto es obligatorio.");
  }

  return errores;
}
export { Gastos, validarCampos };


