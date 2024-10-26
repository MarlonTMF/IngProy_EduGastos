import { Gastos } from "../gastos.js";

const generarInformeButton = document.querySelector("#generar-informe-button");
const informeTbody = document.querySelector("#informe-tbody");
const errorDiv = document.querySelector("#error-div");

const gastos = new Gastos();

// Cargar gastos desde sessionStorage
const cargarGastos = () => {
  const gastosGuardados = gastos.obtenerGastos(); // Usa el método para obtener los gastos
  console.log("Gastos cargados desde sessionStorage en informe:", gastosGuardados);
  return gastosGuardados;
};

generarInformeButton.addEventListener("click", () => {
  const gastosRegistrados = cargarGastos(); // Carga los gastos al hacer clic

  if (gastosRegistrados.length === 0) {
    errorDiv.style.display = "block";
    errorDiv.textContent = "No hay gastos registrados para mostrar.";
    informeTbody.innerHTML = ""; // Limpiar tabla si no hay gastos
    return;
  }

  errorDiv.style.display = "none";
  informeTbody.innerHTML = "";

  gastosRegistrados.forEach((gasto) => {
    const row = document.createElement("tr");
    const fechaCell = document.createElement("td");
    const montoCell = document.createElement("td");
    const descripcionCell = document.createElement("td");

    fechaCell.textContent = gasto.fecha;
    montoCell.textContent = gasto.monto;
    descripcionCell.textContent = gasto.descripcion;

    row.appendChild(fechaCell);
    row.appendChild(montoCell);
    row.appendChild(descripcionCell);

    informeTbody.appendChild(row);
  });
});
