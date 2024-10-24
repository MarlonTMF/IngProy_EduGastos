import Gastos from "../gastos.js";

document.addEventListener("DOMContentLoaded", () => {
  const gastos = new Gastos();
  const historialDiv = document.getElementById("historial-gastos-div");
  const totalGastosSpan = document.getElementById("total-gastos");

  // Mostrar los gastos en la página
  const gastosRegistrados = gastos.obtenerGastos();
  gastosRegistrados.forEach((gasto) => {
    const gastoElemento = document.createElement("div");
    gastoElemento.textContent = `${gasto.fecha} - ${gasto.monto} - ${gasto.descripcion}`;
    historialDiv.appendChild(gastoElemento);
  });

  // Mostrar el total de los gastos
  totalGastosSpan.textContent = gastos.calcularTotal();
});
