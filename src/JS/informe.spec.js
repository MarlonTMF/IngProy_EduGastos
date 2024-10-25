import { Gastos } from "../gastos.js";

beforeEach(() => {
  // Mock de sessionStorage
  global.sessionStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
  };

  // Simulación de un estado inicial vacío de sessionStorage
  sessionStorage.getItem.mockReturnValue(null);
});

describe("Informe de Gastos", () => {
  it("debería mostrar un informe vacío cuando no hay gastos registrados", () => {
    // Given
    const gastos = new Gastos();

    // When
    const gastosRegistrados = gastos.obtenerGastos();

    // Then
    expect(gastosRegistrados).toEqual([]);
  });

  it("debería mostrar un informe con un gasto registrado", () => {
    // Given
    const gastos = new Gastos();
    const registroGasto = {
      fecha: "2024-10-12",
      monto: 45,
      descripcion: "compra de libros",
    };

    // When
    gastos.registrarGasto(registroGasto);
    const gastosRegistrados = gastos.obtenerGastos();

    // Then
    expect(gastosRegistrados).toEqual([registroGasto]);
    expect(sessionStorage.setItem).toHaveBeenCalledWith(
      "gastos",
      JSON.stringify([registroGasto])
    );
  });
});
