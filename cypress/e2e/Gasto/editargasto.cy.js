describe("Botón Editar junto a cada gasto", () => {
    it("Debe mostrar un botón Editar al registrar un gasto", () => {
      cy.visit("/src/Plantillas/RegistrarGasto.html");
      cy.get("#fecha").type("2024-11-01");
      cy.get("#monto").type(100);
      cy.get("#descripcion").type("Cine");
      cy.get("#registrar-gasto-button").click();
  
      cy.get("#gastos-div").within(() => {
        cy.contains("Editar").should("exist");
      });
    });
  });
  