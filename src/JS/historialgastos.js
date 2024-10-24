import Gastos from '../gastos';

const gastos = new Gastos();
const gastosListDiv = document.querySelector("#gastos-list");

// Obtener los gastos del localStorage y mostrarlos
const listaGastos = gastos.obtenerGastos();

if (listaGastos.length > 0) {
  listaGastos.forEach(gasto => {
    gastosListDiv.innerHTML += `
      <div>Fecha: ${gasto.fecha}</div>
      <div>Monto: $${gasto.monto}</div>
      <div>Descripción: ${gasto.descripcion}</div>
      <hr>
    `;
  });
} else {
  gastosListDiv.innerHTML = "<p>No hay gastos registrados</p>";
}

// Botón para volver al registro de gastos
document.querySelector("#volver-registro").addEventListener("click", () => {
  window.location.href = "./registro.html"; // Volver al formulario de registro
});
