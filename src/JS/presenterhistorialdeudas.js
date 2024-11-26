import Deudas from "../Deudas.js";

document.addEventListener("DOMContentLoaded", () => {
  const deudas = new Deudas();
  const historialDiv = document.getElementById("historial-deudas-div");
  const totalDeudasSpan = document.getElementById("total-deudas");
  const formRegistrarDeuda = document.getElementById("form-registrar-deuda");
  const mensajeError = document.getElementById("mensaje-error");

  // Mostrar las deudas existentes
  const deudasRegistradas = deudas.getDeudas();
  deudasRegistradas.forEach((deuda) => {
    const deudaElemento = document.createElement("div");
    deudaElemento.textContent = `${deuda.procedencia} - ${deuda.cantidad} - ${deuda.interes}%`;
    historialDiv.appendChild(deudaElemento);
  });

  // Calcular el total y mostrarlo
  totalDeudasSpan.textContent = deudasRegistradas.reduce((total, deuda) => total + parseFloat(deuda.cantidad), 0);

  // Registrar nuevas deudas
  formRegistrarDeuda.addEventListener("submit", (e) => {
    e.preventDefault();

    const procedencia = document.getElementById("procedencia").value;
    const cantidad = parseFloat(document.getElementById("cantidad").value);
    const interes = parseFloat(document.getElementById("interes").value);

    if (!procedencia || isNaN(cantidad) || isNaN(interes)) {
      mensajeError.textContent = "Todos los campos son obligatorios.";
      mensajeError.style.display = "block";
      return;
    }

    mensajeError.style.display = "none";

    const nuevaDeuda = { procedencia, cantidad, interes };
    deudas.registrarDeuda(nuevaDeuda);

    // Actualizar la lista y el total
    const deudaElemento = document.createElement("div");
    deudaElemento.textContent = `${procedencia} - ${cantidad} - ${interes}%`;
    historialDiv.appendChild(deudaElemento);
    totalDeudasSpan.textContent = deudas.getDeudas().reduce((total, deuda) => total + parseFloat(deuda.cantidad), 0);

    formRegistrarDeuda.reset();
  });
});
