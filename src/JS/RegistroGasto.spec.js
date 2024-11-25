import {Gastos, validarCampos} from "./RegistroGasto.js";

// Mock de sessionStorage
const mockSessionStorage = (() => {
  let store = {};

  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {}; // Limpiar todo el almacenamiento
    },
    removeItem: (key) => {
      delete store[key];
    },
  };
})();

// Asignar el mock a global
Object.defineProperty(global, "sessionStorage", {
  value: mockSessionStorage,
});


describe("Gastos", () => {
  
  beforeEach(() => {
    sessionStorage.clear(); 
  });
  it("registrar un gasto", () => {
    const gastos = new Gastos();
    const registroGasto = {
      fecha: "2024-10-12",
      monto: 200,
      descripcion: "compra de libros",
    };

    gastos.registrarGasto(registroGasto);

    const gastoRegistrado = gastos.obtenerGastos();
    expect(gastoRegistrado).toContainEqual(registroGasto);
  });

  it("registrar un gasto sin descripción", () => {

    const gastos = new Gastos();
    const registroGasto = {
      fecha: "2024-10-12",
      monto: 50,
      descripcion: "", // Descripción vacía
    };

    gastos.registrarGasto(registroGasto);
    const gastoRegistrado = gastos.obtenerGastos()[0];
    expect(gastoRegistrado.descripcion).toEqual("");
  });
  it("no permite registrar un gasto sin fecha", () => {
    const gastos = new Gastos();
    const registroGasto = { monto: 100,descripcion: "compra de libros" };

    gastos.registrarGasto(registroGasto);
    const gastoRegistrado = gastos.obtenerGastos();
    expect(gastoRegistrado).toEqual([]);  
  });
  
  it("debería retornar un error si la fecha es una cadena vacía", () => {
    const errores = validarCampos("", 100); 
    expect(errores).toEqual(["El campo de fecha es obligatorio."]);
  });

  it("debería retornar un error si el monto es una cadena vacía", () => {
    const errores = validarCampos("2024-10-23", ""); 
    expect(errores).toEqual(["El campo de monto es obligatorio."]);
  });
  it("debería cargar los datos previamente guardados desde sessionStorage", () => {
    const gastosPrevios = [
      { fecha: "2024-10-12", monto: 200, descripcion: "compra de libros" },
      { fecha: "2024-10-13", monto: 100, descripcion: "paseo" }
    ];
  
    sessionStorage.setItem('gastos', JSON.stringify(gastosPrevios));
  
    const gastos = new Gastos();

    const gastosRegistrados = gastos.obtenerGastos();
    expect(gastosRegistrados).toEqual(gastosPrevios);  
  });
  

});
