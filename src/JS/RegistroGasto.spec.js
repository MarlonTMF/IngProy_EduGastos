import {Gastos, validarCampos} from "./RegistroGasto.js";
describe.skip("Gastos", () => {
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
  it("no permite registrar un gasto sin fecha", () => {
    const gastos = new Gastos();
    const registroGasto = { descripcion: "compra de libros" };

    gastos.registrarGasto(registroGasto);
    let gastoRegistrado = gastos.obtenerGastos();
    expect(gastoRegistrado).toBeUndefined();  
  });
  
  it("debería retornar un error si la fecha es una cadena vacía", () => {
    const errores = validarCampos("", 100); 
    expect(errores).toEqual(["El campo de fecha es obligatorio."]);
  });

  it("debería retornar un error si el monto es una cadena vacía", () => {
    const errores = validarCampos("2024-10-23", ""); 
    expect(errores).toEqual(["El campo de monto es obligatorio."]);
  });

});
