import Ingresos from "./ingresos";

class Gastos {
  constructor() {
    const gastosGuardados = sessionStorage.getItem('gastos');
    this.gastos = gastosGuardados ? JSON.parse(gastosGuardados) : [];
  }

  registrarGasto(gasto) {
    if (!gasto.fecha || !gasto.monto) {
      return;  
    }
    const nuevoGasto = { 
      fecha: gasto.fecha, 
      monto: gasto.monto, 
      descripcion: gasto.descripcion || "" 
    };
    this.gastos.push(nuevoGasto);
    sessionStorage.setItem('gastos', JSON.stringify(this.gastos));
  }

  obtenerGastos() {
    return this.gastos;
  }

  calcularTotal() {
    return this.gastos.reduce((total, gasto) => total + parseFloat(gasto.monto), 0); // Asegúrate de que monto sea numérico
  }
  editarGasto(index, gastoActualizado) {
    if (!gastoActualizado.fecha || !gastoActualizado.monto) {
      return ["El campo de fecha y monto son obligatorios."];
    }
    this.gastos[index] = gastoActualizado;
    sessionStorage.setItem('gastos', JSON.stringify(this.gastos));
  }
  eliminarGasto(indice) {
    this.gastos.splice(indice, 1); 
    sessionStorage.setItem("gastos", JSON.stringify(this.gastos)); 
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


