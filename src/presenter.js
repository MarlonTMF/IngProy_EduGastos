//import Gastos from "./gastos";
import Ingresos from "./JS/ingresos";

const fechaGasto = document.querySelector("#fecha-gasto");
const montoGasto = document.querySelector("#monto-gasto");
const descripcionGasto = document.querySelector("#descripcion-gasto");

const fechaIngreso = document.querySelector("#fecha-ingreso");
const montoIngreso = document.querySelector("#monto-ingreso");
const descripcionIngreso = document.querySelector("#descripcion-ingreso");

const formGasto = document.querySelector("#gastos-form");
const formIngreso = document.querySelector("#ingresos-form");

const gastosDiv = document.querySelector("#gastos-div");
const ingresosDiv = document.querySelector("#ingresos-div");

const gastos = new Gastos();
const ingresos = new Ingresos();

// Manejar el formulario de gastos
formGasto.addEventListener("submit", (event) => {
  event.preventDefault();
  const fechaValue = fechaGasto.value;
  const montoValue = Number.parseInt(montoGasto.value);
  const descripcionValue = descripcionGasto.value;
  
  const gasto = {
    fecha: fechaValue,
    monto: montoValue,
    descripcion: descripcionValue,
  };
  gastos.registrarGasto(gasto);
  
  const gastosRegistrados = gastos.obtenerGastos();
  console.log("gastos: " + gastosRegistrados);
  console.log("gastos registrados: " + gastosRegistrados);

  gastosDiv.innerHTML = "<ul>";  
  gastosRegistrados.forEach((gastoRegistrado) => {
    gastosDiv.innerHTML += 
       "<li>" + gastoRegistrado.fecha + "  " + gastoRegistrado.monto + "  " + gastoRegistrado.descripcion + "</li>";
  });
  gastosDiv.innerHTML += "</ul>";
});

// Manejar el formulario de ingresos
formIngreso.addEventListener("submit", (event) => {
  event.preventDefault();
  const fechaValue = fechaIngreso.value;
  const montoValue = Number.parseInt(montoIngreso.value);
  const descripcionValue = descripcionIngreso.value;
  
  const ingreso = {
    fecha: fechaValue,
    monto: montoValue,
    descripcion: descripcionValue,
  };
  ingresos.registrarIngreso(ingreso);
  
  const ingresosRegistrados = ingresos.obtenerIngresos();
  console.log("ingresos: " + ingresosRegistrados);
  console.log("ingresos registrados: " + ingresosRegistrados);

  ingresosDiv.innerHTML = "<ul>";  
  ingresosRegistrados.forEach((ingresoRegistrado) => {
    ingresosDiv.innerHTML += 
       "<li>" + ingresoRegistrado.fecha + "  " + ingresoRegistrado.monto + "  " + ingresoRegistrado.descripcion + "</li>";
  });
  ingresosDiv.innerHTML += "</ul>";
});
