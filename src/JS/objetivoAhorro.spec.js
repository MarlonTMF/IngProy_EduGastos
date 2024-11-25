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
    
    it("Debería permitir editar el objetivo de ahorro correctamente", () => {
        const objetivoOriginal = { monto: '1000', descripcion: 'Ahorro para vacaciones', fechaLimite: '2024-12-31' };
        objetivoAhorro.guardarObjetivo(objetivoOriginal.monto, objetivoOriginal.descripcion, objetivoOriginal.fechaLimite);
    
        const nuevoObjetivo = { monto: '2000', descripcion: 'Ahorro para coche', fechaLimite: '2025-01-01' };
        const resultado = objetivoAhorro.editarObjetivo(0, nuevoObjetivo.monto, nuevoObjetivo.descripcion, nuevoObjetivo.fechaLimite);
    
        expect(resultado).toEqual(nuevoObjetivo);
    });
    
});
