import { Gastos } from "../gastos";

beforeEach(() => {
  // Mock de sessionStorage
  global.sessionStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
  };

  // Simulación de un estado inicial vacío de sessionStorage
  sessionStorage.getItem.mockReturnValue(null);
});

describe("Gastos", () => {
  it("debe registrar un gasto correctamente", () => {
    // Given -- Arrange
    const gastos = new Gastos();
    const registroGasto = {
      fecha: "2024-10-12",
      monto: 45,
      descripcion: "compra de libros",
    };

    // When -- Act
    gastos.registrarGasto(registroGasto);

    // Then -- Assert
    const gastoRegistrado = gastos.obtenerGastos();
    expect(gastoRegistrado).toEqual([registroGasto]);
    expect(sessionStorage.setItem).toHaveBeenCalledWith(
      "gastos",
      JSON.stringify([registroGasto])
    );
  });

  it("debe calcular el total de los gastos correctamente", () => {
    // Given -- Arrange
    const gastos = new Gastos();
    const registroGasto1 = { fecha: "2024-10-12", monto: 45, descripcion: "compra de libros" };
    const registroGasto2 = { fecha: "2024-10-14", monto: 55, descripcion: "Fotocopias varias" };

    // When -- Act
    gastos.registrarGasto(registroGasto1);
    gastos.registrarGasto(registroGasto2);

    // Then -- Assert
    expect(gastos.calcularTotal()).toEqual(100);
  });
});
