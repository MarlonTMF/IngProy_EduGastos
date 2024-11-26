import { Presupuesto } from './PresupuestoM.js';

describe.skip("Presupuesto", () => {
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
        presupuesto.addCategory({ name: 'Comida', amount: 300 }); // Cambiar a objeto

        const categories = presupuesto.getCategories();

        // Verificar que la categoría 'Comida' esté presente
        expect(categories).toEqual([{ name: 'Comida', amount: 300 }]); // Cambiar para verificar el objeto completo
    });

    it("addCategory no debería agregar una categoría duplicada", () => {
        const presupuesto = new Presupuesto();
        presupuesto.addCategory({ name: 'Comida', amount: 300 });
        presupuesto.addCategory({ name: 'Comida', amount: 300 }); // Intentar agregar la misma categoría nuevamente

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

    it("addCategory debería agregar varias categorías con sus montos respectivos", () => {
        const presupuesto = new Presupuesto();

        // Agregar varias categorías
        presupuesto.addCategory({ name: 'Comida', amount: 300 });
        presupuesto.addCategory({ name: 'Transporte', amount: 150 });
        presupuesto.addCategory({ name: 'Entretenimiento', amount: 100 });

        const categories = presupuesto.getCategories();

        // Verificar que todas las categorías estén presentes
        expect(categories).toEqual([
            { name: 'Comida', amount: 300 },
            { name: 'Transporte', amount: 150 },
            { name: 'Entretenimiento', amount: 100 },
        ]);
    });
    
});
