import Gastos from "../gastos.js";

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
