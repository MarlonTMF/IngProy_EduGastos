class Deudas {
    constructor() {
      const deudasGuardadas = sessionStorage.getItem("deudas");
      this.deudas = deudasGuardadas ? JSON.parse(deudasGuardadas) : [];
    }
  
    registrarDeuda(deuda) {
      if (!deuda.procedencia || !deuda.cantidad || !deuda.interes) {
        return;
      }
      this.deudas.push(deuda);
      sessionStorage.setItem("deudas", JSON.stringify(this.deudas));
    }
  
    getDeudas() {
      return this.deudas;
    }
  
    calcularTotal() {
      return this.deudas.reduce((total, deuda) => total + parseFloat(deuda.cantidad), 0);
    }
  }
  
  export default Deudas;
  