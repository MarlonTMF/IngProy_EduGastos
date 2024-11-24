import {Gastos, validarCampos} from "./gastos.js"; 

// Lógica para registrar y mostrar gastos
const formulario = document.getElementById('gastos-form');
const gastosDiv = document.getElementById('gastos-div');
const gastos = new Gastos();

formulario.addEventListener('submit', (event) => {
  event.preventDefault();

  // Obtener valores del formulario
  const fecha = document.getElementById('fecha').value;
  const monto = document.getElementById('monto').value;
  const descripcion = document.getElementById('descripcion').value || ""; 
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
 
  const nuevoGasto = { fecha, monto, descripcion };
  gastos.registrarGasto(nuevoGasto);

  const gastoElement = document.createElement("div");
  gastoElement.classList.add("gasto-item");

  gastoElement.innerHTML = `
    <p>
      Fecha: ${fecha} - Monto: ${monto} - Descripción: ${descripcion || '_ _ _'}
      <button class="editar-gasto">Editar</button>
    </p>
  `;

  const editarButton = gastoElement.querySelector(".editar-gasto");
  editarButton.
  editarBut
addEventListener("click", () => {
    
    con
console.log("Editar clicado para el gasto:", nuevoGasto);
  });
  gastosDiv.appendChild(gastoElement);
});