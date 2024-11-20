import { Presupuesto } from "./JS/PresupuestoM";

class Gastos {
  constructor(presupuesto) {
    this.presupuesto = presupuesto;
    // Intentar cargar los gastos desde sessionStorage al instanciar la clase
    const gastosGuardados = sessionStorage.getItem('gastos');
    this.gastos = gastosGuardados ? JSON.parse(gastosGuardados) : [];
  }

  registrarGasto(gasto) {
    // Validar campos antes de agregar el gasto
    if (!gasto.fecha || !gasto.monto || !gasto.categoria) {
      return; // Salir si falta fecha o monto
    }

    const categorias = this.presupuesto.getCategories(); // Usa la instancia de Presupuesto
    const categoria = categorias.find((cat) => cat.name === gasto.categoria);

    if(!categoria){
      alert("La categoría selecionada no es valida.");
      return;
    }

    if((categoria.gastado || 0) + gasto.monto > categoria.amount){
      alert(`El gasto excede el presupuesto disponible para la categoria: ${categoria.name}`);
      return;
    }

    this.gastos.push(gasto);
    categoria.gastado = (categoria.gastado || 0) + gasto.monto;
    sessionStorage.setItem('gastos', JSON.stringify(this.gastos));
    sessionStorage.setItem('budgets', JSON.stringify(categorias));
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
