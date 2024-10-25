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
  // Registrar gasto
  const nuevoGasto = { fecha, monto, descripcion };
  gastos.registrarGasto(nuevoGasto);

  // Mostrar el gasto en la página
  gastosDiv.innerHTML += `<p>Fecha: ${fecha} - Monto: ${monto} - Descripción: ${descripcion || 'Sin descripción'}</p>`;
});