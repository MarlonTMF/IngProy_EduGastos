// Adaptación de la clase Gastos con almacenamiento en sessionStorage y validación
class Gastos {
  constructor() {
    // Intentar cargar los gastos desde sessionStorage al instanciar la clase
    const gastosGuardados = sessionStorage.getItem('gastos');
    this.gastos = gastosGuardados ? JSON.parse(gastosGuardados) : [];
  }

  registrarGasto(gasto) {
    // Validar campos antes de agregar el gasto
    if (!gasto.fecha || !gasto.monto) {
      return; // Salir si falta fecha o monto
    }
    // Agregar el gasto y guardarlo en sessionStorage
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

// Función para validar los campos
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
