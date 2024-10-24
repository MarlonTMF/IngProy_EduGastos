import Gastos from "../gastos.js";

const generarInformeButton = document.querySelector("#generar-informe-button");
const informeTbody = document.querySelector("#informe-tbody");
const errorDiv = document.querySelector("#error-div");

const gastos = new Gastos();

const cargarGastos = () => {
  const gastosGuardados = JSON.parse(localStorage.getItem("gastos")) || [];
  console.log("Gastos cargados desde localStorage en informe:", gastosGuardados);
  gastosGuardados.forEach(gasto => gastos.registrarGasto(gasto));
};

cargarGastos();

generarInformeButton.addEventListener("click", () => {
  const gastosRegistrados = gastos.obtenerGastos();
  console.log("Gastos registrados al generar informe:", gastosRegistrados);
  
  if (gastosRegistrados.length === 0) {
    errorDiv.style.display = "block";
    errorDiv.textContent = "No hay gastos registrados para mostrar.";
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
