class Ingresos {
  constructor() {
    // Cargar ingresos desde sessionStorage o inicializar con un arreglo vacío
    const ingresosGuardados = sessionStorage.getItem("ingresos");
    this.ingresos = ingresosGuardados ? JSON.parse(ingresosGuardados) : [];
    console.log("Ingresos inicializados desde sessionStorage:", this.ingresos);
  }

  registrarIngreso(ingreso) {
    this.ingresos.push(ingreso); // Agregar el nuevo ingreso al arreglo
    this.actualizarSessionStorage(); // Guardar en sessionStorage
    console.log("Ingreso registrado:", ingreso);
    console.log("Todos los ingresos registrados:", this.ingresos);
  }

  obtenerIngresos() {
    console.log("Obteniendo ingresos:", this.ingresos);
    return this.ingresos; // Retorna todos los ingresos registrados
  }

  obtenerTotalIngresos() {
    const total = this.ingresos.reduce((total, ingreso) => total + ingreso.monto, 0);
    console.log("Total de ingresos calculado:", total);
    return total;
  }

  // Método para actualizar el sessionStorage
  actualizarSessionStorage() {
    sessionStorage.setItem("ingresos", JSON.stringify(this.ingresos));
    console.log("Ingresos guardados en sessionStorage:", this.ingresos);
  }
}

export default Ingresos;
