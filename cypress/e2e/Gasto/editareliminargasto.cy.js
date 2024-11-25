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
describe("Edición de un gasto", () => {
  beforeEach(() => {
    cy.visit("/src/Plantillas/RegistrarGasto.html");
    cy.get("#fecha").type("2024-11-01");
    cy.get("#monto").type("100");
    cy.get("#descripcion").type("Cine");
    cy.get("#registrar-gasto-button").click();
  });
  
  it("Debe cargar los datos del gasto en el formulario al presionar Editar", () => {
     
    cy.get("#gastos-div .gasto-item").contains("Editar").click();
  
    cy.get("#fecha").should("have.value", "2024-11-01");
    cy.get("#monto").should("have.value", "100");
    cy.get("#descripcion").should("have.value", "Cine");
  });
  it("Debe permitir modificar un gasto existente", () => {
    cy.get("#gastos-div .gasto-item").contains("Editar").click();
    
    cy.get("#fecha").clear().type("2024-11-05");
    cy.get("#monto").clear().type("150");
    cy.get("#descripcion").clear().type("Teatro");
    
    cy.get("#registrar-gasto-button").click();
    
    cy.get("#gastos-div").should("contain", "2024-11-05")
                             .and("contain", "150")
                             .and("contain", "Teatro");
  });
  it("no debería editar un gasto si falta fecha o monto", () => {
    cy.get("#fecha").type("2024-11-01");
    cy.get("#monto").type("100");
    cy.get("#descripcion").type("Cine");
    cy.get("#registrar-gasto-button").click();
    
    cy.get("#gastos-div").should("contain", "Cine");
    
    cy.get(".editar-gasto").first().click(); 
    cy.get("#fecha").clear(); 
    cy.get("#monto").clear().type("150"); 
    cy.get("#descripcion").clear().type("Teatro"); 
    cy.get("#registrar-gasto-button").click(); 
    
    cy.get("#gastos-div").should("contain", "Cine");
    cy.get("#gastos-div").should("not.contain", "Teatro");
    
    cy.get(".editar-gasto").first().click(); 
    cy.get("#fecha").type("2024-11-05"); 
    cy.get("#monto").clear().type("150"); 
    cy.get("#descripcion").clear().type("Teatro"); 
    cy.get("#registrar-gasto-button").click(); 
    cy.get("#gastos-div").should("contain", "Teatro");
  });

});
describe("Botón Eliminar", () => {
  beforeEach(() => {
    cy.visit("/src/Plantillas/RegistrarGasto.html");
  });
  
  it("debería mostrar el botón Eliminar junto al botón Editar", () => {
    cy.get("#fecha").type("2024-11-01");
    cy.get("#monto").type("100");
    cy.get("#descripcion").type("Cine");
    cy.get("#registrar-gasto-button").click();
    cy.get("#gastos-div").within(() => {
      cy.contains("Eliminar").should("exist");
    });
  });
});
  
  
  