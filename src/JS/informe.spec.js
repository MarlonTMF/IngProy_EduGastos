import Gastos from "../gastos.js";

describe("Informe de Gastos", () => {
  it("debería mostrar un informe vacío cuando no hay gastos registrados", () => {
    
    const gastos = new Gastos();
    const gastosRegistrados = gastos.obtenerGastos();
    expect(gastosRegistrados).toEqual([]);
  });
});