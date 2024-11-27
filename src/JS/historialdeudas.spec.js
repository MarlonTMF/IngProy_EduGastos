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

    it("debe registrar una deuda y opcionalmente su cronograma", () => {
      // Given -- Arrange
      const deudas = new Deudas();
      const deudaRegistrada = {
      procedencia: "Universidad",
      cantidad: 1500,
      interes: 1,
      cronograma: "anualmente"
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

  it("debe sumar la deuda total", () => {
    // Given -- Arrange
    const deudas = new Deudas();
    const deudaRegistrada = {
    procedencia: "Universidad",
    cantidad: 1500,
    interes: 1,
    cronograma: "anualmente"
    };

    const deudaRegistrada2 = {
      procedencia: "Empresa",
      cantidad: 2500,
      interes: 2,
      cronograma: "semanalmente"
      };

    // When -- Act
    deudas.registrarDeuda(deudaRegistrada);
    deudas.registrarDeuda(deudaRegistrada2);

    // Then -- Assert
    expect(deudas.calcularTotal()).toEqual(4000); 
});
});