import { Gastos, validarCampos } from "./JS/RegistroGasto.js"; 
import { Presupuesto } from "./JS/PresupuestoM.js";
import Ingresos from "./JS/ingresos.js";

// Crear instancias
const presupuesto = new Presupuesto(new Ingresos());
const gastos = new Gastos(presupuesto);
let editingIndex = null; // Variable para rastrear el índice del gasto en edición

// Elementos de la interfaz
const formulario = document.getElementById('gastos-form');
const gastosDiv = document.getElementById('gastos-div');
const categorySelect = document.getElementById('categoria');

// Elementos para los mensajes de error
const errorFechaDiv = document.getElementById('error-fecha'); // Definir correctamente
const errorMontoDiv = document.getElementById('error-monto'); // Definir correctamente

// Renderizar categorías
function renderCategoriesDropdown() {
  const categories = presupuesto.getCategories();
  categorySelect.innerHTML = '<option value="">Seleccione una categoría</option>';
  categories.forEach(cat => {
    categorySelect.innerHTML += `<option value="${cat.name}">${cat.name}</option>`;
  });
}

// Renderizar todos los gastos
function renderGastos() {
  gastosDiv.innerHTML = ""; // Limpiar los gastos antes de renderizar
  const gastosList = gastos.obtenerGastos(); // Obtener todos los gastos registrados
  gastosList.forEach((gasto, index) => {
    gastosDiv.innerHTML += `
      <div class="gasto-item">
        <p>Fecha: ${gasto.fecha} - Monto: $${gasto.monto} - Categoría: ${gasto.categoria} - Descripción: ${gasto.descripcion || 'Sin descripción'}
          <button class="editar-gasto" data-index="${index}">Editar</button>
          <button class="eliminar-gasto" data-index="${index}">Eliminar</button>
        </p>
      </div>
    `;
  });
}

// Evento al enviar el formulario
formulario.addEventListener('submit', (event) => {
  event.preventDefault();

  // Obtener valores del formulario
  const fecha = document.getElementById('fecha').value;
  const monto = document.getElementById('monto').value;
  const descripcion = document.getElementById('descripcion').value || ""; 
  const categoria = categorySelect.value;
  
  const errores = validarCampos(fecha, monto);

  // Limpiar mensajes de error
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
    return; 
  }

  const nuevoGasto = { fecha, monto, descripcion, categoria };

  if (editingIndex !== null) {
    // Editar gasto existente
    gastos.editarGasto(editingIndex, nuevoGasto);
    editingIndex = null; // Reiniciar la variable
    formulario.reset();
    document.getElementById('registrar-gasto-button').value = "Registrar gasto"; // Cambiar texto del botón
  } else {
    // Registrar nuevo gasto
    if (!categoria) {
      alert("Debe seleccionar una categoría.");
      return;
    }
    gastos.registrarGasto(nuevoGasto);
  }

  // Mostrar los gastos en la página
  renderGastos();
  formulario.reset();
  renderCategoriesDropdown(); // Actualiza el desplegable
});

// Evento para editar un gasto
gastosDiv.addEventListener('click', (event) => {
  if (event.target.classList.contains('editar-gasto')) {
    const index = event.target.dataset.index;
    const gasto = gastos.obtenerGastos()[index];
    
    document.getElementById('fecha').value = gasto.fecha;
    document.getElementById('monto').value = gasto.monto;
    document.getElementById('descripcion').value = gasto.descripcion;
    categorySelect.value = gasto.categoria;
    // Establecer el índice del gasto en edición
    editingIndex = index;

    // Cambiar el texto del botón
    document.getElementById('registrar-gasto-button').value = "Guardar cambios";
  }

  if (event.target.classList.contains('eliminar-gasto')) {
    const index = event.target.dataset.index;
    gastos.eliminarGasto(index); // Eliminar gasto por índice
    renderGastos();
  }
});


renderCategoriesDropdown();
renderGastos();
