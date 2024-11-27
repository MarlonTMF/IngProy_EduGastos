describe("Gestión de Objetivo de Ahorro", () => {
    beforeEach(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
      });

      cy.visit("http://localhost:1234/src/Plantillas/objetivoAhorro.html");
    });
  
    it("Debería mostrar un error si se intentan guardar campos vacíos", () => {
      cy.get("#guardarObjetivo").click();
      cy.on("window:alert", (text) => {
        expect(text).to.equal("Por favor, complete todos los campos obligatorios con valores válidos.");
      });
    });
  
    it("Debería guardar correctamente un objetivo de ahorro", () => {
      cy.get("#totalBudgetInput").type("1000");
      cy.get("#descripcion").type("Ahorro para vacaciones");
      cy.get("#fechaLimite").type("2024-12-31");
      cy.get("#guardarObjetivo").click();
  
      cy.get("#objetivosContainer")
        .should("contain", "Monto: $1000")
        .and("contain", "Descripción: Ahorro para vacaciones")
        .and("contain", "Fecha límite: 2024-12-31");
    });
  
    it("Debería editar correctamente un objetivo de ahorro existente", () => {

      cy.get("#totalBudgetInput").type("1000");
      cy.get("#descripcion").type("Ahorro para vacaciones");
      cy.get("#fechaLimite").type("2024-12-31");
      cy.get("#guardarObjetivo").click();

      cy.get(".editar").first().click();
  
      cy.get("#totalBudgetInput").clear().type("1500");
      cy.get("#descripcion").clear().type("Ahorro para coche");
      cy.get("#fechaLimite").clear().type("2025-06-30");
      cy.get("#editarObjetivo").click();
  
      cy.get("#objetivosContainer")
        .should("contain", "Monto: $1500")
        .and("contain", "Descripción: Ahorro para coche")
        .and("contain", "Fecha límite: 2025-06-30");
    });
    it("Debería mostrar correctamente los objetivos guardados en sessionStorage", () => {
        cy.get("#totalBudgetInput").type("500");
        cy.get("#descripcion").type("Ahorro para celular");
        cy.get("#fechaLimite").type("2025-01-01");
        cy.get("#guardarObjetivo").click();
    
        cy.get("#totalBudgetInput").type("2000");
        cy.get("#descripcion").type("Ahorro para laptop");
        cy.get("#fechaLimite").type("2025-06-30");
        cy.get("#guardarObjetivo").click();
    
        cy.get("#objetivosContainer")
            .should("contain", "Monto: $500")
            .and("contain", "Descripción: Ahorro para celular")
            .and("contain", "Fecha límite: 2025-01-01");
    
        cy.get("#objetivosContainer")
            .should("contain", "Monto: $2000")
            .and("contain", "Descripción: Ahorro para laptop")
            .and("contain", "Fecha límite: 2025-06-30");
    });
    it("Debería manejar correctamente el intento de editar un objetivo inexistente", () => {
        cy.get(".editar").should("not.exist");
    
        cy.get("#editarObjetivo").click({ force: true }); // Simular un clic forzado para comprobar errores
        cy.on("window:alert", (text) => {
          expect(text).to.equal("No hay un objetivo establecido para editar.");
        });
      });    
  
});