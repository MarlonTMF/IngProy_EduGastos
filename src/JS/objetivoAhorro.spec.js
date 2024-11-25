/**
 * @jest-environment jsdom
 */
import ObjetivoAhorro from './objetivoAhorro.js';

describe("ObjetivoAhorro (Parte 1)", () => {
    let objetivoAhorro;

    beforeEach(() => {
        sessionStorage.clear();
        objetivoAhorro = new ObjetivoAhorro();
    });

    it("Debería inicializar con un arreglo vacío si no hay datos en sessionStorage", () => {
        expect(objetivoAhorro.objetivosGuardados).toEqual([]);
    });

    it("Debería guardar y obtener objetivos correctamente", () => {
        const objetivo = { monto: '1000', descripcion: 'Vacaciones', fechaLimite: '2024-12-31' };
        const guardado = objetivoAhorro.guardarObjetivo(objetivo.monto, objetivo.descripcion, objetivo.fechaLimite);

        expect(guardado).toEqual(objetivo);
        expect(objetivoAhorro.obtenerObjetivosDeStorage()).toEqual([objetivo]);
    });
});
