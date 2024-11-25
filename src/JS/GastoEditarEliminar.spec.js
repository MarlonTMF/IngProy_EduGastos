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
describe("Editar y Eliminar un gasto", () => {

    it("debería editar un gasto existente", () => {
      const gastos = new Gastos();
      const gastoOriginal = { fecha: "2024-11-01", monto: 100, descripcion: "Cine" };
      const gastoActualizado = { fecha: "2024-11-05", monto: 150, descripcion: "Teatro" };
  
      gastos.registrarGasto(gastoOriginal);
      gastos.editarGasto(0, gastoActualizado);
  
      expect(gastos.obtenerGastos()[0]).toEqual(gastoActualizado);
    });


  });