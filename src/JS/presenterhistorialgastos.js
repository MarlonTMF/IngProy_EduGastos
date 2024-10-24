import Gastos from "../gastos";

// Simula obtener los gastos previamente registrados (puedes modificar esta parte para integrarlo con almacenamiento real, como localStorage o una base de datos).
const gastos = new Gastos();  // En una aplicación real, puedes cargar los gastos aquí desde un almacenamiento persistente.

const historialGastosDiv = document.querySelector("#historial-gastos-div");

// Obtiene los gastos registrados
const gastosRegistrados = gastos.obtenerGastos();

// Muestra los gastos en la página
if (gastosRegistrados.length > 0) {
  historialGastosDiv.innerHTML = "<ul>";
  gastosRegistrados.forEach((gasto) => {
    historialGastosDiv.innerHTML += `<li>${gasto.fecha} - ${gasto.monto} - ${gasto.descripcion}</li>`;
  });
  historialGastosDiv.innerHTML += "</ul>";
} else {
  historialGastosDiv.innerHTML = "<p>No hay gastos registrados</p>";
}