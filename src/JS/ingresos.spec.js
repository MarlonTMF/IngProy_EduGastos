import Ingresos from "./ingresos";

describe.skip("Ingresos", () => {
    it("Registrar un ingreso", () => {
        const ingresos = new Ingresos();
        const registroIngreso = {
            fecha: "2024-10-19",
            monto: 100,
            descripcion: "mesada semanal",
        };

        ingresos.registrarIngreso(registroIngreso);

        let ingresoRegistrado = ingresos.obtenerIngresos();
        expect(ingresoRegistrado).toEqual([registroIngreso]);
    })
    
    it("Registrar un ingreso de salario", () => {

        const ingresos = new Ingresos();
        const registroIngreso = {
          fecha: "2024-10-22",
          monto: 1000,
          descripcion: "salario mensual",
        };
    
        ingresos.registrarIngreso(registroIngreso);
    
        let ingresoRegistrado = ingresos.obtenerIngresos();
        expect(ingresoRegistrado).toEqual([registroIngreso]);
      })

});