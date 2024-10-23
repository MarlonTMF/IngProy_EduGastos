import Gastos from "./gastos";

const fecha = document.querySelector("#fecha");
const monto = document.querySelector("#monto");
const descripcion = document.querySelector("#descripcion");

const form = document.querySelector("#gastos-form");
const gastosdiv = document.querySelector("#gastos-div");
const gastos = new Gastos();

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
  
  const gastosRegistrados = gastos.obtenerGastos();
  console.log("gastos: "+ gastosRegistrados);
  console.log("gastos registrados: "+gastosRegistrados);

  gastosdiv.innerHTML = "<ul>";  
  gastosRegistrados.forEach((gastoRegistrado) => {
    gastosdiv.innerHTML+= 
       "<li>"+gastoRegistrado.fecha+"  "+gastoRegistrado.monto+"  "+gastoRegistrado.descripcion+"</li>";
    });
  gastosdiv.innerHTML+= "</ul>";
});
