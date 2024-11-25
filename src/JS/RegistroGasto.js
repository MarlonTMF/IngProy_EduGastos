
class Gastos {
  constructor() {
    const gastosGuardados = sessionStorage.getItem('gastos');
    this.gastos = gastosGuardados ? JSON.parse(gastosGuardados) : [];
  }

  registrarGasto(gasto) {
    if (!gasto.fecha || !gasto.monto) {
      return;  
    }
    this.gastos.push(gasto);
    sessionStorage.setItem('gastos', JSON.stringify(this.gastos));
  }

  obtenerGastos() {
    return this.gastos;
  }

  calcularTotal() {
    return this.gastos.reduce((total, gasto) => total + parseFloat(gasto.monto), 0); // Asegúrate de que monto sea numérico
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


