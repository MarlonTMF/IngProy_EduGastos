describe("Informe de Gastos", () => {
    it.skip("muestra un mensaje cuando no hay gastos registrados", () => {
    
        localStorage.setItem("gastos", JSON.stringify([])); 
    
        cy.visit("/src/Plantillas/InformeGastos.html");
        cy.get("#generar-informe-button").click();
    
        cy.get("#error-div")
          .should("be.visible")
          .and("contain", "No hay gastos registrados para mostrar.");
      });
    });