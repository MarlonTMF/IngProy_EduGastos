/*
Como: Estudiante
Quiero: Poder agregar un gasto
Para: Automatizar la gestión de gastos que ocurren de manera regular cada mes o año

Criterios de confirmación:
- Cuando registro un gasto que contiene fecha, monto, descripcion el mismo deberia verse en la seccion de gastos
- Si registro un gasto que no tiene monto deberia mostrar el mensaje: "No es posible registrar un gasto sin monto"
*/


describe("Registro de gasto", () => {
  it("Se debe mostrar el monto del gasto ingresado", () => {
    cy.visit("/src/Plantillas/RegistrarGasto.html");
    cy.get("#fecha", { timeout: 10000 }).should("exist").type("2024-10-20");
    cy.get("#monto").type(45);
    cy.get("#descripcion").type("Comida");

    cy.get("#registrar-gasto-button").click();

    cy.get("#gastos-div")
      .should("contain", "2024-10-20")
      .and("contain", "45")
      .and("contain", "Comida");
  });

  it("Debe permitir registrar un gasto sin descripción", () => {
    cy.visit("/src/Plantillas/RegistrarGasto.html");
    cy.get("#fecha").type("2024-10-14");
    cy.get("#monto").type(100);

    cy.get("#registrar-gasto-button").click();

    cy.get("#gastos-div")
      .should("contain", "2024-10-14")
      .and("contain", "100")
      .and("contain", "Sin descripción"); 
  });
});

