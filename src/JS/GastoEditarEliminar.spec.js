import { Gastos, validarCampos } from "./RegistroGasto.js";

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
  let presupuestoMock;

  beforeEach(() => {
    sessionStorage.clear();
    presupuestoMock = {
      getCategories: jest.fn(() => [
        { name: "Ocio", amount: 300, gastado: 0 },
        { name: "Alimentos", amount: 500, gastado: 0 },
      ]),
    };
  });

  it("debería editar un gasto existente", () => {
    const gastos = new Gastos(presupuestoMock);
    const gastoOriginal = { fecha: "2024-11-01", monto: 100, descripcion: "Cine", categoria: "Ocio" };
    const gastoActualizado = { fecha: "2024-11-05", monto: 150, descripcion: "Teatro", categoria: "Ocio" };

    gastos.registrarGasto(gastoOriginal);
    gastos.editarGasto(0, gastoActualizado);

    expect(gastos.obtenerGastos()[0]).toEqual(gastoActualizado);
  });

  it.skip("no debería editar si falta fecha o monto", () => {
    const gastos = new Gastos(presupuestoMock);
    const gastoOriginal = { fecha: "2024-11-01", monto: 100, descripcion: "Cine", categoria: "Ocio" };

    gastos.registrarGasto(gastoOriginal);

    const gastoSinMonto = { fecha: "2024-11-02", monto: "", descripcion: "Cena", categoria: "Alimentos" };
    const gastoSinFecha = { fecha: "", monto: 200, descripcion: "Cena", categoria: "Alimentos" };

    expect(() => gastos.editarGasto(0, gastoSinMonto)).toThrow("El campo de fecha, monto y categoría son obligatorios.");
    expect(() => gastos.editarGasto(0, gastoSinFecha)).toThrow("El campo de fecha, monto y categoría son obligatorios.");
  });

  it.skip("no debería permitir editar si el nuevo monto excede el presupuesto de la categoría", () => {
    const gastos = new Gastos(presupuestoMock);
    const gastoOriginal = { fecha: "2024-11-01", monto: 100, descripcion: "Cine", categoria: "Ocio" };
    const gastoExcesivo = { fecha: "2024-11-05", monto: 400, descripcion: "Fiesta", categoria: "Ocio" };

    gastos.registrarGasto(gastoOriginal);

    expect(() => gastos.editarGasto(0, gastoExcesivo)).toThrow(
      "El gasto excede el presupuesto disponible para la categoría: Ocio"
    );
  });

  it("debería eliminar un gasto existente", () => {
    const gastos = new Gastos(presupuestoMock);
    const gasto1 = { fecha: "2024-11-01", monto: 100, descripcion: "Cine", categoria: "Ocio" };
    const gasto2 = { fecha: "2024-11-05", monto: 150, descripcion: "Teatro", categoria: "Ocio" };

    gastos.registrarGasto(gasto1);
    gastos.registrarGasto(gasto2);

    gastos.eliminarGasto(0);

    const sessionData = JSON.parse(sessionStorage.getItem("gastos"));
    expect(sessionData).toHaveLength(1);
    expect(sessionData).toEqual([gasto2]);
  });

  it.skip("debería recalcular el monto gastado al eliminar un gasto", () => {
    const gastos = new Gastos(presupuestoMock);
    const gasto1 = { fecha: "2024-11-01", monto: 100, descripcion: "Cine", categoria: "Ocio" };
    const gasto2 = { fecha: "2024-11-05", monto: 150, descripcion: "Teatro", categoria: "Ocio" };

    gastos.registrarGasto(gasto1);
    gastos.registrarGasto(gasto2);

    const categoriasAntes = presupuestoMock.getCategories();
    expect(categoriasAntes[0].gastado).toBe(250); // Verificar monto gastado antes de eliminar

    gastos.eliminarGasto(0);

    const categoriasDespues = presupuestoMock.getCategories();
    expect(categoriasDespues[0].gastado).toBe(150); // Verificar monto gastado después de eliminar
  });
});
