describe("Informe de Gastos", () => {
    it("muestra un mensaje cuando no hay gastos registrados", () => {
    
        localStorage.setItem("gastos", JSON.stringify([])); 
    
        cy.visit("http://localhost:1234/src/Plantillas/InformeGastos.html");
        cy.get("#generar-informe-button").click();
    
        cy.get("#error-div")
          .should("be.visible")
          .and("contain", "No hay gastos registrados para mostrar.");
      });

      it("muestra todos los gastos registrados en el informe", () => {
    
        cy.visit("/src/Plantillas/RegistroDeGastos.html");
        cy.get("#fecha").type("2024-10-14");
        cy.get("#monto").type(55);
        cy.get("#descripcion").type("Fotocopias varias");
        cy.get("#registrar-gasto-button").click();
    
        cy.get("#fecha").type("2023-12-24");
        cy.get("#monto").type(155);
        cy.get("#descripcion").type("Ropa");
        cy.get("#registrar-gasto-button").click();
    
        cy.visit("/src/Plantillas/InformeGastos.html");
        cy.get("#generar-informe-button").click();
    
        cy.get("#informe-tbody")
          .should("contain", "2024-10-14")
          .and("contain", "55")
          .and("contain", "Fotocopias varias");
    
        cy.get("#informe-tbody")
          .should("contain", "2023-12-24")
          .and("contain", "155")
          .and("contain", "Ropa");
      });
    
    });