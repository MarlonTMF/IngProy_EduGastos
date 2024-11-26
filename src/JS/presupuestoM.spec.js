import { Presupuesto } from './PresupuestoM.js';
import Ingresos from './ingresos';

describe("Presupuesto", () => {
    let ingresosMock;

    beforeEach(() => {
        global.alert = jest.fn(); // Simula la función alert

        // Mock de sessionStorage con contenedor en memoria
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

        // Mock de ingresos
        ingresosMock = {
            obtenerIngresos: jest.fn(() => [
                { fuente: 'Salario', monto: 2000 },
                { fuente: 'Freelance', monto: 500 }
            ]),
            obtenerTotalIngresos: jest.fn(() => 2500)
        };

        sessionStorage.clear(); // Limpiar sessionStorage antes de cada prueba
    });

    it("Debería inicializar correctamente con el total de ingresos y categorías guardadas", () => {
        // Mockear sessionStorage para obtener datos previos
        sessionStorage.setItem('budgets', JSON.stringify([])); // No hay categorías guardadas

        const presupuesto = new Presupuesto(ingresosMock);

        // Comprobar valores iniciales
        expect(presupuesto.getPresupuestoTotalGlobal()).toBe(2500); // El total de ingresos debe ser 2500
        expect(presupuesto.getCategories()).toEqual([]); // No hay categorías guardadas
        expect(presupuesto.getPresupuestoMensualRestante()).toBe(0); // No se ha establecido aún un presupuesto mensual
    });

    it("Debería establecer y obtener el presupuesto mensual correctamente", () => {
        const presupuesto = new Presupuesto(ingresosMock);
        const amount = 1500;

        // Establecer presupuesto mensual
        presupuesto.setTotalBudget(amount);

        // Verificar si el presupuesto mensual se actualizó correctamente
        expect(presupuesto.getPresupuestoMensualRestante()).toBe(amount);
        expect(sessionStorage.setItem).toHaveBeenCalledWith('totalMonthlyBudget', amount);
    });

    it("No debería permitir establecer un presupuesto mensual mayor al total global", () => {
        const presupuesto = new Presupuesto(ingresosMock);

        // Intentar establecer un presupuesto mayor al total global
        presupuesto.setTotalBudget(3000); // Mayor que el total global

        // Verificar que el presupuesto no cambió
        expect(presupuesto.getPresupuestoMensualRestante()).toBe(0); // No debe actualizarse
        expect(global.alert).toHaveBeenCalledWith("El presupuesto mensual no puede exceder el total de ingresos ($2500)");
    });

    it("Debería retornar una lista vacía si no hay categorías", () => {
        const presupuesto = new Presupuesto(ingresosMock);

        const categories = presupuesto.getCategories();

        // Verificar que la lista de categorías es vacía
        expect(categories).toEqual([]);
    });

    it("Debería agregar una categoría y actualizar el presupuesto mensual correctamente", () => {
        const presupuesto = new Presupuesto(ingresosMock);
        const categoria = { name: 'Alimentos', amount: 1000 };

        // Establecer presupuesto mensual antes de agregar la categoría
        presupuesto.setTotalBudget(2000);

        // Agregar categoría
        presupuesto.addCategory(categoria);

        // Verificar si la categoría fue agregada
        expect(presupuesto.getCategories()).toContain(categoria);

        // Verificar si el presupuesto mensual restante se actualizó correctamente
        expect(presupuesto.getPresupuestoMensualRestante()).toBe(1000); // 2000 - 1000 = 1000

        // Verificar que se guardaron las categorías en sessionStorage
        expect(sessionStorage.setItem).toHaveBeenCalledWith('budgets', JSON.stringify([categoria]));
    });

    it.skip("No debería permitir agregar una categoría si el monto excede el presupuesto mensual", () => {
        const presupuesto = new Presupuesto(ingresosMock);
        const categoria = { name: 'Alimentos', amount: 3000 };

        // Establecer presupuesto mensual antes de agregar la categoría
        presupuesto.setTotalBudget(2000);

        // Intentar agregar una categoría con un monto mayor al presupuesto mensual
        presupuesto.addCategory(categoria);

        // Verificar que no se ha agregado la categoría
        expect(presupuesto.getCategories()).not.toContain(categoria);

        // Verificar que se muestra una alerta
        expect(global.alert).toHaveBeenCalledWith("No hay suficiente presupuesto mensual disponible , restante: $2000");
    });
});
