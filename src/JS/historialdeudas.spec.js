import Deudas  from "../Deudas";

beforeEach(() => {
    // Mock de sessionStorage
    global.sessionStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
    };
  
    // Simulación de un estado inicial vacío de sessionStorage
    sessionStorage.getItem.mockReturnValue(null);
  });

describe("Historial de deudas", () => {
    it("debe registrar una deuda correctamente", () => {
        // Given -- Arrange
        const deudas = new Deudas();
        const deudaRegistrada = {
        procedencia: "Universidad",
        cantidad: 1500,
        interes: 1,
        };

        // When -- Act
        deudas.registrarDeuda(deudaRegistrada);

        // Then -- Assert
        const deudasRegistradas = deudas.getDeudas();
        expect(deudasRegistradas).toEqual([deudaRegistrada]);
        expect(sessionStorage.setItem).toHaveBeenCalledWith(
        "deudas",
        JSON.stringify([deudaRegistrada])
        );  
    });
});