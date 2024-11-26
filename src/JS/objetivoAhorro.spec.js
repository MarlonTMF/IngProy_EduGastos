/**
 * @jest-environment jsdom
 */
import ObjetivoAhorro from './objetivoAhorro.js';

describe("ObjetivoAhorro (Parte 1)", () => {
    let objetivoAhorro;

    beforeEach(() => {
        global.sessionStorage = {
            getItem: jest.fn().mockReturnValue(null),
            setItem: jest.fn(),
            clear: jest.fn(),
        };
        objetivoAhorro = new ObjetivoAhorro();
    });

    const crearObjetivo = (monto, descripcion, fechaLimite) => {
        return objetivoAhorro.guardarObjetivo(monto, descripcion, fechaLimite);
    };

    it("Debería inicializar con un arreglo vacío si no hay datos en sessionStorage", () => {
        expect(objetivoAhorro.objetivosGuardados).toEqual([]);
    });

    it.skip("Debería guardar y obtener objetivos correctamente", () => {
        const objetivo = crearObjetivo('1000', 'Vacaciones', '2024-12-31');
        expect(objetivo).toEqual({
            monto: '1000.00',
            descripcion: 'Vacaciones',
            fechaLimite: '2024-12-31',
        });

        expect(global.sessionStorage.setItem).toHaveBeenCalledWith(
            'objetivosAhorro',
            JSON.stringify([objetivo])
        );

        expect(objetivoAhorro.obtenerObjetivosDeStorage()).toEqual([objetivo]);
    });

    it.skip("Debería permitir editar el objetivo de ahorro correctamente", () => {
        crearObjetivo('1000', 'Vacaciones', '2024-12-31');
        const actualizado = objetivoAhorro.editarObjetivo(0, '1500', 'Coche', '2025-01-01');
        expect(actualizado).toEqual({
            monto: '1500.00',
            descripcion: 'Coche',
            fechaLimite: '2025-01-01',
        });
        expect(objetivoAhorro.obtenerDetallesObjetivos()).toEqual([actualizado]);
    });

    it.skip("Debería renderizar correctamente los objetivos guardados", () => {
        const objetivo1 = crearObjetivo('1000', 'Vacaciones', '2024-12-31');
        const objetivo2 = crearObjetivo('2000', 'Coche', '2025-01-01');
        const objetivos = objetivoAhorro.obtenerDetallesObjetivos();

        expect(objetivos).toEqual([objetivo1, objetivo2]);
        expect(objetivos.length).toBe(2);
    });

    it("Debería editar correctamente el primer objetivo", () => {
        const objetivoOriginal = { monto: '1000', descripcion: 'Vacaciones', fechaLimite: '2024-12-31' };
        const objetivoEditado = { monto: '1500', descripcion: 'Coche', fechaLimite: '2025-06-30' };

        crearObjetivo(objetivoOriginal.monto, objetivoOriginal.descripcion, objetivoOriginal.fechaLimite);
        const resultado = objetivoAhorro.editarObjetivo(0, objetivoEditado.monto, objetivoEditado.descripcion, objetivoEditado.fechaLimite);

        expect(resultado).toEqual({
            monto: '1500.00',
            descripcion: 'Coche',
            fechaLimite: '2025-06-30',
        });
    });

    it("Debería manejar errores al guardar objetivos con campos inválidos", () => {
        expect(() => crearObjetivo('', 'Vacaciones', '2024-12-31')).toThrow(
            objetivoAhorro.ERROR_CAMPOS
        );
        expect(() => crearObjetivo('1000', '', '2024-12-31')).toThrow(
            objetivoAhorro.ERROR_CAMPOS
        );
        expect(() => crearObjetivo('1000', 'Vacaciones', '')).toThrow(
            objetivoAhorro.ERROR_CAMPOS
        );
    });

    it.skip("Debería manejar errores al editar un objetivo inexistente", () => {
        expect(() => objetivoAhorro.editarObjetivo(0, '1500', 'Coche', '2025-01-01')).toThrow(
            objetivoAhorro.ERROR_EDITAR
        );
    });
});
