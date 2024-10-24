import Gastos from "../gastos";

beforeEach(() => {
  // Mock de localStorage
  global.localStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
  };

  // Simulación de un estado inicial vacío de localStorage
  localStorage.getItem.mockReturnValueOnce(null);
});

describe("Gastos", () => {
    it("registrar un gasto", () => {
        //Given -- arrange
        const gastos = new Gastos();
        const registroGasto = {
          fecha: "2024-10-12",
          monto: 45,
          descripcion: "compra de libros",
        };
    
        //When -act
        gastos.registrarGasto(registroGasto);
    
        //Then --assert
        let gastoRegistrado = gastos.obtenerGastos();
        expect(gastoRegistrado).toEqual([registroGasto]);
      });
}),

describe("Gastos", () => {
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
