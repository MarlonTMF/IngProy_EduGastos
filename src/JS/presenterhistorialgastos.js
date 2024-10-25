import {Gastos} from "../gastos.js";

document.addEventListener("DOMContentLoaded", () => {
  const gastos = new Gastos();
  const historialDiv = document.getElementById("historial-gastos-div");
  const totalGastosSpan = document.getElementById("total-gastos");
  const registrarBtn = document.getElementById("registrar-gasto-button");
  const mensajeError = document.getElementById("mensaje-error");

  // Verificar si historialDiv y totalGastosSpan existen antes de usarlos
  if (historialDiv && totalGastosSpan) {
    const gastosRegistrados = gastos.obtenerGastos();
    gastosRegistrados.forEach((gasto) => {
      const gastoElemento = document.createElement("div");
      gastoElemento.textContent = `${gasto.fecha} - ${gasto.monto} - ${gasto.descripcion}`;
      historialDiv.appendChild(gastoElemento);
    });

    totalGastosSpan.textContent = gastos.calcularTotal();
  }

  // Registrar gasto solo si registrarBtn existe
  if (registrarBtn) {
    registrarBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const fecha = document.getElementById("fecha").value;
      const monto = document.getElementById("monto").value;
      const descripcion = document.getElementById("descripcion").value;

      if (!fecha || !monto || !descripcion) {
        mensajeError.textContent = "Debe llenar todos los campos.";
        mensajeError.style.display = "block";
        return;
      }

      const registroGasto = { fecha, monto: Number(monto), descripcion };
      gastos.registrarGasto(registroGasto);

      if (historialDiv && totalGastosSpan) {
        const nuevoGastoElemento = document.createElement("div");
        nuevoGastoElemento.textContent = `${fecha} - ${monto} - ${descripcion}`;
        historialDiv.appendChild(nuevoGastoElemento);
        totalGastosSpan.textContent = gastos.calcularTotal();
      }
      mensajeError.style.display = "none";
    });
  }
});