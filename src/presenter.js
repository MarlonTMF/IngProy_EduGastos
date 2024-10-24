import Gastos from "./gastos.js";

const fecha = document.querySelector("#fecha");
const monto = document.querySelector("#monto");
const descripcion = document.querySelector("#descripcion");

const form = document.querySelector("#gastos-form");
const gastosdiv = document.querySelector("#gastos-div");
const gastos = new Gastos();

const cargarGastos = () => {
  const gastosGuardados = JSON.parse(localStorage.getItem("gastos")) || [];
  console.log("Gastos cargados desde localStorage:", gastosGuardados);
  gastosGuardados.forEach(gasto => gastos.registrarGasto(gasto));
  mostrarGastos(gastosGuardados);
};

const mostrarGastos = (gastosRegistrados) => {
  gastosdiv.innerHTML = "<ul>";
  gastosRegistrados.forEach((gastoRegistrado) => {
    gastosdiv.innerHTML += 
       `<li>${gastoRegistrado.fecha} ${gastoRegistrado.monto} ${gastoRegistrado.descripcion}</li>`;
  });
  gastosdiv.innerHTML += "</ul>";
};

cargarGastos();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const fechaValue = fecha.value;
  const montoValue = Number.parseInt(monto.value);
  const descripcionValue = descripcion.value;
  
  const gasto = {
    fecha: fechaValue,
    monto: montoValue,
    descripcion: descripcionValue,
  };
  gastos.registrarGasto(gasto);

  localStorage.setItem("gastos", JSON.stringify(gastos.obtenerGastos()));
  console.log("Gastos guardados en localStorage:", gastos.obtenerGastos());

  const gastosRegistrados = gastos.obtenerGastos();
  mostrarGastos(gastosRegistrados);
});