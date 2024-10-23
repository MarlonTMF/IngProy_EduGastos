import Gastos from "../gastos.js";

describe("Informe de Gastos", () => {
  it("debería mostrar un informe vacío cuando no hay gastos registrados", () => {
    
    const gastos = new Gastos();
    const gastosRegistrados = gastos.obtenerGastos();
    expect(gastosRegistrados).toEqual([]);
  });

  it("debería mostrar un informe con un gasto registrado", () => {

    const gastos = new Gastos();
    const registroGasto = {
      fecha: "2024-10-12",
      monto: 45,
      descripcion: "compra de libros",
    };
    gastos.registrarGasto(registroGasto);

    const gastosRegistrados = gastos.obtenerGastos();

    expect(gastosRegistrados).toEqual([registroGasto]);
  });
});