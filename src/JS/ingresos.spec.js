import Ingresos from "./ingresos";

describe("Ingresos", () => {
    let ingresos;

    beforeEach(() => {
        // Simular `sessionStorage`
        global.sessionStorage = (() => {
            let store = {};
            return {
                getItem: jest.fn((key) => store[key] || null),
                setItem: jest.fn((key, value) => {
                    store[key] = value;
                }),
                clear: jest.fn(() => {
                    store = {};
                }),
            };
        })();

        // Crear una nueva instancia de Ingresos antes de cada prueba
        ingresos = new Ingresos();
        sessionStorage.clear(); // Limpiar `sessionStorage` antes de cada prueba
    });

    it("Registrar un ingreso", () => {
        const registroIngreso = {
            fecha: "2024-10-19",
            monto: 100,
            descripcion: "mesada semanal",
        };

        ingresos.registrarIngreso(registroIngreso);

        // Verificar que el ingreso se haya registrado correctamente
        const ingresoRegistrado = ingresos.obtenerIngresos();
        expect(ingresoRegistrado).toEqual([registroIngreso]);

        // Verificar que los ingresos se guardaron en `sessionStorage`
        expect(sessionStorage.setItem).toHaveBeenCalledWith(
            "ingresos",
            JSON.stringify([registroIngreso])
        );
    });
    
    it("Registrar un ingreso de salario", () => {
        const registroIngreso = {
            fecha: "2024-10-22",
            monto: 1000,
            descripcion: "salario mensual",
        };

        ingresos.registrarIngreso(registroIngreso);

        // Verificar que el ingreso se haya registrado correctamente
        const ingresoRegistrado = ingresos.obtenerIngresos();
        expect(ingresoRegistrado).toEqual([registroIngreso]);

        // Verificar que los ingresos se guardaron en `sessionStorage`
        expect(sessionStorage.setItem).toHaveBeenCalledWith(
            "ingresos",
            JSON.stringify([registroIngreso])
        );
    });
});
