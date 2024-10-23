import Ingresos from "./JS/ingresos";

const fechaIngreso = document.querySelector("#fecha-ingreso");
const montoIngreso = document.querySelector("#monto-ingreso");
const descripcionIngreso = document.querySelector("#descripcion-ingreso");

const formIngreso = document.querySelector("#ingresos-form");
const ingresosDiv = document.querySelector("#ingresos-div");
const ingresos = new Ingresos();

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
