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

  it("muestra todos los ingresos registrados", () => {
    cy.visit("http://localhost:1234/src/Plantillas/RegistroDeIngresos.html");

    cy.get("#fecha-ingreso").type("2024-10-19");
    cy.get("#monto-ingreso").type(100);
    cy.get("#descripcion-ingreso").type("mesada semanal");
    cy.get("#registrar-ingreso-button").click();

    cy.get("#fecha-ingreso").clear();
    cy.get("#monto-ingreso").clear();
    cy.get("#descripcion-ingreso").clear();

    cy.get("#fecha-ingreso").type("2024-10-22");
    cy.get("#monto-ingreso").type(1000);
    cy.get("#descripcion-ingreso").type("salario mensual");
    cy.get("#registrar-ingreso-button").click();

    cy.get("#ingresos-div")
      .should("contain", "2024-10-19")
      .and("contain", "100")
      .and("contain", "mesada semanal");

    cy.get("#ingresos-div")
      .should("contain", "2024-10-22")
      .and("contain", "1000")
      .and("contain", "salario mensual");
  });
});
