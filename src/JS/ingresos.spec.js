import Ingresos from "./JS/ingresos";

describe("Ingresos", () => {
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
});