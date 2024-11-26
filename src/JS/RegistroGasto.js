import { Presupuesto } from "./PresupuestoM";

class Gastos {
  constructor(presupuesto) {
    this.presupuesto = presupuesto;
    // Intentar cargar los gastos desde sessionStorage al instanciar la clase
    const gastosGuardados = sessionStorage.getItem('gastos');
    this.gastos = gastosGuardados ? JSON.parse(gastosGuardados) : [];
  }

  registrarGasto(gasto) {
    if (!gasto.fecha) {
      throw new Error("El campo de fecha es obligatorio.");
    }
    if (!gasto.descripcion.trim()) {
      throw new Error("La descripción no puede estar vacía.");
    }
    // Validar campos antes de agregar el gasto
    if (!gasto.fecha || !gasto.monto || !gasto.categoria) {
      return; // Salir si falta fecha o monto
    }
  
    const categorias = this.presupuesto.getCategories(); // Usa la instancia de Presupuesto
    const categoria = categorias.find((cat) => cat.name === gasto.categoria);
  
    if (!categoria) {
      alert("La categoría seleccionada no es válida.");
      return;
    }
  
    if ((categoria.gastado || 0) + parseFloat(gasto.monto) > categoria.amount) {
      alert(`El gasto excede el presupuesto disponible para la categoría: ${categoria.name}`);
      return;
    }
  
    this.gastos.push(gasto);
    categoria.gastado = (categoria.gastado || 0) + parseFloat(gasto.monto); // Asegúrate de que el monto sea numérico
    sessionStorage.setItem('gastos', JSON.stringify(this.gastos));
    sessionStorage.setItem('budgets', JSON.stringify(categorias)); // Guardar la lista de categorías actualizada
  }

  obtenerGastos() {
    return this.gastos;
  }

  calcularTotal() {
    return this.gastos.reduce((total, gasto) => total + parseFloat(gasto.monto), 0); // Asegúrate de que monto sea numérico
  }

  editarGasto(index, gastoActualizado) {
    // Validar campos obligatorios
    if (!gastoActualizado.fecha || !gastoActualizado.monto || !gastoActualizado.categoria) {
      return ["El campo de fecha, monto y categoría son obligatorios."];
    }
  
    // Obtener el gasto actual y su categoría asociada
    const gastoActual = this.gastos[index];
    const categorias = this.presupuesto.getCategories();
    const categoriaActual = categorias.find((cat) => cat.name === gastoActual.categoria);
    const categoriaNueva = categorias.find((cat) => cat.name === gastoActualizado.categoria);
  
    // Revertir el gasto en la categoría actual
    if (categoriaActual) {
      categoriaActual.gastado -= parseFloat(gastoActual.monto);
    }
  
    // Verificar si el nuevo gasto supera el presupuesto de la nueva categoría
    if ((categoriaNueva.gastado || 0) + parseFloat(gastoActualizado.monto) > categoriaNueva.amount) {
      alert(`El gasto excede el presupuesto disponible para la categoría: ${categoriaNueva.name}`);
      if (categoriaActual) {
        categoriaActual.gastado += parseFloat(gastoActual.monto); // Restaurar el monto en la categoría actual
      }
      return;
    }
  
    // Actualizar el gasto y la categoría
    this.gastos[index] = gastoActualizado;
    categoriaNueva.gastado = (categoriaNueva.gastado || 0) + parseFloat(gastoActualizado.monto);
  
    // Guardar los cambios en el almacenamiento
    sessionStorage.setItem('gastos', JSON.stringify(this.gastos));
    sessionStorage.setItem('budgets', JSON.stringify(categorias));
  }

  eliminarGasto(indice) {
    const gastoEliminado = this.gastos[indice];
    if (!gastoEliminado) {
        return; // Si no existe el gasto, no hacer nada
    }

    // Eliminar el gasto del arreglo
    this.gastos.splice(indice, 1);
    sessionStorage.setItem("gastos", JSON.stringify(this.gastos));

    const categorias = this.presupuesto.getCategories();
    const categoria = categorias.find((cat) => cat.name === gastoEliminado.categoria);
    if (categoria) {
        // Actualiza la categoría reduciendo el monto gastado
        categoria.gastado -= parseFloat(gastoEliminado.monto);
        
        // Guardar los cambios en las categorías
        sessionStorage.setItem('budgets', JSON.stringify(categorias));
    }
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
