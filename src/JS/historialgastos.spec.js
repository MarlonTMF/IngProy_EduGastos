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
});
