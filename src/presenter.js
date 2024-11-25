import { Gastos, validarCampos } from "./JS/RegistroGasto";

// Elementos de la interfaz
const formulario = document.getElementById('gastos-form');
const gastosDiv = document.getElementById('gastos-div');
const errorFechaDiv = document.getElementById('error-fecha');
const errorMontoDiv = document.getElementById('error-monto');

// Instancia de la clase Gastos
const gastos = new Gastos();
let indiceEdicion = null; 

// Evento al enviar el formulario
formulario.addEventListener('submit', (event) => {
  event.preventDefault();

  // Obtener valores del formulario
  const fecha = document.getElementById('fecha').value;
  const monto = document.getElementById('monto').value;
  const descripcion = document.getElementById('descripcion').value || "";

  // Validar campos
  const errores = validarCampos(fecha, monto);
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

  const nuevoGasto = { fecha, monto, descripcion };

  if (indiceEdicion !== null) {
    const erroresEdicion = validarCampos(nuevoGasto.fecha, nuevoGasto.monto);
        if (erroresEdicion.length > 0) {
          return;
        }
    gastos.editarGasto(indiceEdicion, nuevoGasto);
    indiceEdicion = null; 
  } else {
    gastos.registrarGasto(nuevoGasto);
  }

  formulario.reset();
  renderizarGastos();
});

function renderizarGastos() {
  gastosDiv.innerHTML = ""; 
  gastos.obtenerGastos().forEach((gasto, index) => {
    const gastoElement = document.createElement("div");
    gastoElement.classList.add("gasto-item");

    gastoElement.innerHTML = `
      <p>
        Fecha: ${gasto.fecha} - Monto: ${gasto.monto} - Descripción: ${gasto.descripcion || "_ _ _"}
        <button class="editar-gasto">Editar</button>
        <button class="eliminar-gasto">Eliminar</button>
      </p>
    `;
    const editarButton = gastoElement.querySelector(".editar-gasto");
    editarButton.addEventListener("click", () => {
      // Cargar los datos del gasto en el formulario
      document.getElementById("fecha").value = gasto.fecha;
      document.getElementById("monto").value = gasto.monto;
      document.getElementById("descripcion").value = gasto.descripcion;

      indiceEdicion = index;
    });
    const eliminarButton = gastoElement.querySelector(".eliminar-gasto");
    eliminarButton.addEventListener("click", () => {
      const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este gasto?");
      if (confirmacion) {
        gastos.eliminarGasto(index); 
        renderizarGastos(); 
      }
    });
    gastosDiv.appendChild(gastoElement);
  });
}
renderizarGastos();
