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
      // Presionar el botón Editar
      cy.get("#gastos-div .gasto-item").contains("Editar").click();
  
      // Verificar que los campos del formulario tienen los valores correctos
      cy.get("#fecha").should("have.value", "2024-11-01");
      cy.get("#monto").should("have.value", "100");
      cy.get("#descripcion").should("have.value", "Cine");
    });

  });
  
  