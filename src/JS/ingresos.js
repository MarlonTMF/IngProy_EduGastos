class Ingresos {
    constructor() {
      this.ingresos = [];
    }
    registrarIngreso(ingreso) {
      this.ingresos.push(ingreso);
    }
    obtenerIngresos() {
      return this.ingresos;
    }
  }
  
export default Ingresos;