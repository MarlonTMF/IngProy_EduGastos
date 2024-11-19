import Ingresos from "./JS/ingresos";

// Selección de elementos del DOM
const fechaIngreso = document.querySelector("#fecha-ingreso");
const montoIngreso = document.querySelector("#monto-ingreso");
const descripcionIngreso = document.querySelector("#descripcion-ingreso");
const formIngreso = document.querySelector("#ingresos-form");
const ingresosDiv = document.querySelector("#ingresos-div");

// Crear instancia de Ingresos
const ingresos = new Ingresos();

// Función para renderizar los ingresos en el DOM
function renderIngresos() {
  const ingresosRegistrados = ingresos.obtenerIngresos();
  ingresosDiv.innerHTML = "<ul>";
  ingresosRegistrados.forEach((ingreso) => {
    ingresosDiv.innerHTML += `
      <li>${ingreso.fecha} - $${ingreso.monto} - ${ingreso.descripcion}</li>
    `;
  });
  ingresosDiv.innerHTML += "</ul>";
}

// Renderizar ingresos al cargar la página
renderIngresos();

// Manejar el formulario de ingreso
formIngreso.addEventListener("submit", (event) => {
  event.preventDefault();

  // Validar y recoger valores del formulario
  const fechaValue = fechaIngreso.value;
  const montoValue = parseFloat(montoIngreso.value);
  const descripcionValue = descripcionIngreso.value;

  if (!fechaValue || isNaN(montoValue) || !descripcionValue) {
    alert("Por favor complete todos los campos con valores válidos.");
    return;
  }

  // Crear y registrar un nuevo ingreso
  const ingreso = {
    fecha: fechaValue,
    monto: montoValue,
    descripcion: descripcionValue,
  };
  ingresos.registrarIngreso(ingreso);

  // Renderizar ingresos actualizados
  renderIngresos();

  // Resetear el formulario
  formIngreso.reset();
});
