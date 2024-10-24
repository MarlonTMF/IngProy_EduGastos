import Gastos from "./gastos.js";

const fecha = document.querySelector("#fecha");
const monto = document.querySelector("#monto");
const descripcion = document.querySelector("#descripcion");

const form = document.querySelector("#gastos-form");
const gastosdiv = document.querySelector("#gastos-div");
const gastos = new Gastos();

// Array global para almacenar los gastos
window.gastosArray = window.gastosArray || [];

const mostrarGastos = (gastosRegistrados) => {
  gastosdiv.innerHTML = "<ul>";
  gastosRegistrados.forEach((gastoRegistrado) => {
    gastosdiv.innerHTML += 
       `<li>${gastoRegistrado.fecha} ${gastoRegistrado.monto} ${gastoRegistrado.descripcion}</li>`;
  });
  gastosdiv.innerHTML += "</ul>";
};

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

  // Guardar en el array global
  window.gastosArray.push(gasto);
  console.log("Gastos guardados en el array global:", window.gastosArray);

  mostrarGastos(window.gastosArray);
});
