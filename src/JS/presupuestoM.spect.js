import { getTotalBudget, setTotalBudget } from './PresupuestoM';

describe('Presupuesto Mensual', () => {
    beforeEach(() => {
        // Limpiar el sessionStorage antes de cada prueba
        sessionStorage.clear();
    });

    test('debe establecer y obtener el presupuesto total correctamente', () => {
        const amount = 1500;

        // Establecer el presupuesto
        setTotalBudget(amount);

        // Obtener el presupuesto
        const totalBudget = getTotalBudget();

        // Verificar que el presupuesto sea el esperado
        expect(totalBudget).toBe(amount);
    });

    test('debe retornar 0 si no hay presupuesto establecido', () => {
        // Obtener el presupuesto sin haberlo establecido
        const totalBudget = getTotalBudget();

        // Verificar que el presupuesto sea 0
        expect(totalBudget).toBe(0);
    });

});