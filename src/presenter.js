import {Gastos, validarCampos} from "./gastos.js"; 
import { Presupuesto } from "./JS/PresupuestoM.js";
import Ingresos from "./JS/ingresos.js";


// Crear instancias
const presupuesto = new Presupuesto(new Ingresos());
const gastos = new Gastos(presupuesto);

// Lógica para registrar y mostrar gastos
const formulario = document.getElementById('gastos-form');
const gastosDiv = document.getElementById('gastos-div');
const categorySelect = document.getElementById('categoria');

function renderCategoriesDropdown(){
  const categories = presupuesto.getCategories();
  categorySelect.innerHTML = '<option value="">Seleccione una categoría</option>'
  categories.forEach(cat=> {
    categorySelect.innerHTML += `<option value="${cat.name}">${cat.name}</option>`;
  });
}

formulario.addEventListener('submit', (event) => {
  event.preventDefault();

  // Obtener valores del formulario
  const fecha = document.getElementById('fecha').value;
  const monto = document.getElementById('monto').value;
  const descripcion = document.getElementById('descripcion').value || ""; 
  const categoria = categorySelect.value;
  
  const errores = validarCampos(fecha, monto);
  const errorFechaDiv = document.getElementById('error-fecha');
  const errorMontoDiv = document.getElementById('error-monto');

  errorFechaDiv.textContent = "";
  errorMontoDiv.textContent = "";

  if (errores.length > 0) {
    errores.forEach(error => {
      if (error.includes("fecha")) {
        errorFechaDiv.textContent = error; 
      }
      if (error.includes("monto")) {
        errorMontoDiv.textContent = error; 
      }
    });
    return;  // Detener si hay errores
  }
  // Registrar gasto

  if(!categoria){
    alert("Debe seleccionar una categoría.");
    return;
  }

  const nuevoGasto = { fecha, monto, descripcion, categoria };
  gastos.registrarGasto(nuevoGasto);

  // Mostrar el gasto en la página
  gastosDiv.innerHTML += `<p>Fecha: ${fecha} - Monto: $${monto} - Categoría: ${categoria} - Descripción: ${descripcion || 'Sin descripción'}</p>`;
  formulario.reset();
  renderCategoriesDropdown(); // Actualiza el desplegable

});

renderCategoriesDropdown();
