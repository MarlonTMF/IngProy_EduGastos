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

    it.skip("muestra todos los ingresos registrados", () => {

      cy.visit("http://localhost:1234/src/Plantillas/RegistroDeIngresos.html");
      cy.get("#fecha").type("2024-10-19");
      cy.get("#monto").type(100);
      cy.get("#descripcion").type("mesada semanal");
      cy.get("#registrar-ingreso-button").click();

      cy.get("#fecha").type("2024-11-01");
      cy.get("#monto").type(1500);
      cy.get("#descripcion").type("salario mensual");
      cy.get("#registrar-ingreso-button").click();

      cy.get("#ingresos-div")
        .should("contain", "2024-10-19")
        .and("contain", "100")
        .and("contain", "mesada semanal");
  
      cy.get("#ingresos-div")
        .should("contain", "2024-11-01")
        .and("contain", "1500")
        .and("contain", "salario mensual");
    });

  });
  