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

  // Manejar el registro de nuevos gastos
  const registrarBtn = document.getElementById("registrar-gasto-button");
  const mensajeError = document.getElementById("mensaje-error");

  registrarBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // Obtener los valores de los campos
    const fecha = document.getElementById("fecha").value;
    const monto = document.getElementById("monto").value;
    const descripcion = document.getElementById("descripcion").value;

    // Validar que todos los campos estén llenos
    if (!fecha || !monto || !descripcion) {
      mensajeError.textContent = "Debe llenar todos los campos.";
      mensajeError.style.display = "block"; // Mostrar el mensaje de error
      return; // Salir de la función sin registrar el gasto
    }

    // Si todos los campos están completos, registrar el gasto
    const registroGasto = { fecha, monto: Number(monto), descripcion };
    gastos.registrarGasto(registroGasto);

    // Actualizar la lista de gastos y el total
    const nuevoGastoElemento = document.createElement("div");
    nuevoGastoElemento.textContent = `${fecha} - ${monto} - ${descripcion}`;
    historialDiv.appendChild(nuevoGastoElemento);
    totalGastosSpan.textContent = gastos.calcularTotal();

    // Ocultar el mensaje de error si el registro es exitoso
    mensajeError.style.display = "none";
  });
});

