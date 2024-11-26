/**
 * @jest-environment jsdom
 */
import ObjetivoAhorro from './objetivoAhorro.js';

describe("ObjetivoAhorro (Parte 1)", () => {
    let objetivoAhorro;

    beforeEach(() => {
        global.sessionStorage = {
            getItem: jest.fn(),
            setItem: jest.fn(),
            clear: jest.fn()
        };
        objetivoAhorro = new ObjetivoAhorro(); // Inicializa la instancia aquí
    });
    
    });
    const crearObjetivo = (monto, descripcion, fechaLimite) => {
        return objetivoAhorro.guardarObjetivo(monto, descripcion, fechaLimite);
    };

    it("Debería inicializar con un arreglo vacío si no hay datos en sessionStorage", () => {
        expect(objetivoAhorro.objetivosGuardados).toEqual([]);
    });

    it("Debería guardar y obtener objetivos correctamente", () => {
        const objetivo = crearObjetivo('1000', 'Vacaciones', '2024-12-31');
        expect(objetivo).toEqual({
            monto: '1000',
            descripcion: 'Vacaciones',
            fechaLimite: '2024-12-31'
        });
        expect(objetivoAhorro.obtenerObjetivosDeStorage()).toEqual([objetivo]);
    });

    it("Debería permitir editar el objetivo de ahorro correctamente", () => {
        const original = crearObjetivo('1000', 'Vacaciones', '2024-12-31');
        const actualizado = objetivoAhorro.editarObjetivo(0, '1500', 'Coche', '2025-01-01');
        expect(actualizado).toEqual({
            monto: '1500',
            descripcion: 'Coche',
            fechaLimite: '2025-01-01'
        });
        expect(objetivoAhorro.obtenerDetallesObjetivos()).toEqual([actualizado]);
    });

    it("Debería renderizar los objetivos guardados correctamente", () => {
        const objetivo1 = crearObjetivo('1000', 'Vacaciones', '2024-12-31');
        const objetivo2 = crearObjetivo('2000', 'Coche', '2025-01-01');
        const objetivos = objetivoAhorro.obtenerDetallesObjetivos();

        expect(objetivos).toEqual([objetivo1, objetivo2]);
        expect(objetivos.length).toBe(2);
    });
    it("Debería editar correctamente el primer objetivo cuando hay objetivos guardados", () => {
        const objetivoOriginal = { monto: '1000', descripcion: 'Ahorro para vacaciones', fechaLimite: '2024-12-31' };
        const objetivoEditado = { monto: '1500', descripcion: 'Ahorro para coche', fechaLimite: '2025-06-30' };
  
        objetivoAhorro.guardarObjetivo(objetivoOriginal.monto, objetivoOriginal.descripcion, objetivoOriginal.fechaLimite);
        
        const resultado = objetivoAhorro.editarObjetivo(0, objetivoEditado.monto, objetivoEditado.descripcion, objetivoEditado.fechaLimite);

        expect(resultado).toEqual(objetivoEditado);
    });

    it("Debería renderizar los objetivos guuardados correctamente", () => {
        const objetivo1 = { monto: '1000', descripcion: 'Ahorro para vacaciones', fechaLimite: '2024-12-31' };
        const objetivo2 = { monto: '2000', descripcion: 'Ahorro para coche', fechaLimite: '2025-01-31' };

        objetivoAhorro.guardarObjetivo(objetivo1.monto, objetivo1.descripcion, objetivo1.fechaLimite);
        objetivoAhorro.guardarObjetivo(objetivo2.monto, objetivo2.descripcion, objetivo2.fechaLimite);

        const objetivos = objetivoAhorro.obtenerDetallesObjetivos();
        expect(objetivos.length).toBe(2);
        expect(objetivos[0]).toEqual(objetivo1);
        expect(objetivos[1]).toEqual(objetivo2);
    });
