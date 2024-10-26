import { Presupuesto } from './PresupuestoM.js';

describe("Presupuesto", () => {
    beforeEach(() => {
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

        // Limpiar el "almacenamiento" de sessionStorage antes de cada prueba
        sessionStorage.clear();
    });

    it("Debería establecer y obtener el presupuesto total correctamente", () => {
        const presupuesto = new Presupuesto();
        const amount = 1500;

        // Establecer el presupuesto
        presupuesto.setTotalBudget(amount);

        // Obtener el presupuesto
        const totalBudget = presupuesto.getTotalBudget();

        // Verificar que el presupuesto sea el esperado
        expect(totalBudget).toBe(amount);
    });

    it("Debería retornar 0 si no hay presupuesto establecido", () => {
        const presupuesto = new Presupuesto();

        // Obtener el presupuesto sin haberlo establecido
        const totalBudget = presupuesto.getTotalBudget();

        // Verificar que el presupuesto sea 0
        expect(totalBudget).toBe(0);
    });

    it("addCategory debería agregar una nueva categoría a la lista", () => {
        const presupuesto = new Presupuesto();
        presupuesto.addCategory('Comida');

        const categories = presupuesto.getCategories();

        // Verificar que la categoría 'Comida' esté presente
        expect(categories).toContain('Comida');
    });

    it("addCategory no debería agregar una categoría duplicada", () => {
        const presupuesto = new Presupuesto();
        presupuesto.addCategory('Comida');
        presupuesto.addCategory('Comida'); // Intentar agregar la misma categoría nuevamente

        const categories = presupuesto.getCategories();

        // Verificar que solo haya una instancia de 'Comida'
        expect(categories.length).toBe(1);
    });

    it("getCategories debería retornar una lista vacía si no hay categorías", () => {
        const presupuesto = new Presupuesto();

        const categories = presupuesto.getCategories();

        // Verificar que la lista esté vacía
        expect(categories).toEqual([]);
    });
});
