import Gastos from "./RegistroGasto.js";
describe("Gastos", () => {
  it("registrar un gasto", () => {
    const gastos = new Gastos();
    const registroGasto = {
      fecha: "2024-10-12",
      monto: 200,
      descripcion: "compra de libros",
    };

    gastos.registrarGasto(registroGasto);

    let gastoRegistrado = gastos.obtenerGastos();
    expect(gastoRegistrado).toEqual(registroGasto);
  });

  it("registrar un gasto sin descripción", () => {

    const gastos = new Gastos();
    const registroGasto = {
      fecha: "2024-10-12",
      monto: 50,
      descripcion: "", // Descripción vacía
    };

    gastos.registrarGasto(registroGasto);
    let gastoRegistrado = gastos.obtenerGastos();
    expect(gastoRegistrado.descripcion).toEqual("");
  });
  it("no permite registrar un gasto sin fecha, ni monto", () => {
    const gastos = new Gastos();
    const registroGasto = { descripcion: "compra de libros" };

    gastos.registrarGasto(registroGasto);
    let gastoRegistrado = gastos.obtenerGastos();
    expect(gastoRegistrado).toBeUndefined();  
  });
});
