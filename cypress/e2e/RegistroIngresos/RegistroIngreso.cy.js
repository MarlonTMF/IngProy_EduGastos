describe("Registro de ingreso", () => {
    it("muestra un ingreso registrado", () => {
      cy.visit("http://localhost:1234/src/Plantillas/RegistroDeIngresos.html"); 
      
      cy.get("#fecha-ingreso").type("2024-10-19");
      cy.get("#monto-ingreso").type(100);
      cy.get("#descripcion-ingreso").type("mesada semanal");
      
      cy.get("#registrar-ingreso-button").click();
  
      cy.get("#ingresos-div")
        .should("contain", "2024-10-19")
        .and("contain", "100")
        .and("contain", "mesada semanal");
    });
  });
  