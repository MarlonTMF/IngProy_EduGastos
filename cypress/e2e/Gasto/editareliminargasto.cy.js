describe("Botón Editar junto a cada gasto", () => {


  beforeEach(() => {
    cy.window().then((win) => {
      const categories = [
        { name: 'Entretenimiento', amount: 100 },
        { name: 'Alimentos', amount: 50 },
      ];
      win.sessionStorage.setItem('budgets', JSON.stringify(categories));
    });
  });

  it("Debe mostrar un botón Editar al registrar un gasto con categoría", () => {
    cy.visit("/src/Plantillas/RegistrarGasto.html");
  
    // Rellenar los campos del formulario
    cy.get("#fecha").type("2024-11-01");
    cy.get("#monto").type(100);
    cy.get("#descripcion").type("Cine");
    
    // Seleccionar una categoría
    cy.get("#categoria").select("Entretenimiento"); // Cambia "Entretenimiento" por una categoría válida
  
    // Hacer clic en el botón de registrar gasto
    cy.get("#registrar-gasto-button").click();
    
    // Espera para que el gasto se registre y se renderice el botón "Editar"
    cy.wait(1000); // Ajusta el tiempo de espera si es necesario
    
    // Verifica que el botón "Editar" esté presente
    cy.get("#gastos-div").within(() => {
      cy.contains("Editar", { timeout: 5000 }).should("exist");
    });


    it("Debe cargar los datos del gasto en el formulario al presionar Editar", () => {
      cy.get("#gastos-div .gasto-item").contains("Editar").click();
  
      cy.get("#fecha").should("have.value", "2024-11-01");
      cy.get("#monto").should("have.value", "100");
      cy.get("#descripcion").should("have.value", "Cine");
      cy.get("#categoria").should("have.value", "Entretenimiento");
    });
  
    it("Debe permitir modificar un gasto existente", () => {
      cy.get("#gastos-div .gasto-item").contains("Editar").click();
  
      cy.get("#fecha").clear().type("2024-11-05");
      cy.get("#monto").clear().type("150");
      cy.get("#descripcion").clear().type("Teatro");
      cy.get("#categoria").select("Alimentos"); // Seleccionamos una nueva categoría
  
      cy.get("#registrar-gasto-button").click();
  
      cy.get("#gastos-div").should("contain", "2024-11-05")
                           .and("contain", "150")
                           .and("contain", "Teatro")
                           .and("contain", "Alimentos"); // Verifica que la categoría también se haya actualizado
    });
  
    it("no debería editar un gasto si falta fecha o monto", () => {
      cy.get("#fecha").type("2024-11-01");
      cy.get("#monto").type("100");
      cy.get("#descripcion").type("Cine");
      cy.get("#categoria").select("Entretenimiento"); // Asegúrate de que la categoría esté seleccionada
      cy.get("#registrar-gasto-button").click();
  
      cy.get("#gastos-div").should("contain", "Cine");
  
      // Editar el gasto sin fecha
      cy.get(".editar-gasto").first().click();
      cy.get("#fecha").clear();
      cy.get("#monto").clear().type("150");
      cy.get("#descripcion").clear().type("Teatro");
      cy.get("#registrar-gasto-button").click();
  
      cy.get("#gastos-div").should("contain", "Cine");
      cy.get("#gastos-div").should("not.contain", "Teatro");
  
      // Volver a editar y ahora completar todos los campos
      cy.get(".editar-gasto").first().click();
      cy.get("#fecha").type("2024-11-05");
      cy.get("#monto").clear().type("150");
      cy.get("#descripcion").clear().type("Teatro");
      cy.get("#categoria").select("Alimentos"); // Seleccionar categoría para este gasto
      cy.get("#registrar-gasto-button").click();
      cy.get("#gastos-div").should("contain", "Teatro");
    });
  
    it("debería mostrar el botón Eliminar junto al botón Editar", () => {
      cy.get("#fecha").type("2024-11-01");
      cy.get("#monto").type("100");
      cy.get("#descripcion").type("Cine");
      cy.get("#categoria").select("Entretenimiento"); // Asegúrate de que la categoría esté seleccionada
      cy.get("#registrar-gasto-button").click();
      cy.get("#gastos-div").within(() => {
        // Verifica que el botón "Eliminar" esté presente
        cy.contains("Eliminar").should("exist");
      });
    it("debería eliminar un gasto al confirmar la acción", () => {
      // Registrar un gasto inicial
      cy.get("#fecha").type("2024-11-01");
      cy.get("#monto").type("100");
      cy.get("#descripcion").type("Cine");
      cy.get("#categoria").select("Entretenimiento"); // Asegúrate de que la categoría esté seleccionada
      cy.get("#registrar-gasto-button").click();
  
      // Verificar que el gasto aparece en la lista
      cy.get("#gastos-div").should("contain", "Cine");
  
      // Intentar eliminar el gasto y confirmar
      cy.get(".eliminar-gasto").first().click();
      cy.on("window:confirm", () => true); // Confirmar la eliminación
  
      // Verificar que el gasto ya no está en la lista
      cy.get("#gastos-div").should("not.contain", "Cine");
    });
  
    it("no debería eliminar un gasto al cancelar la acción", () => {
      // Registrar un gasto inicial
      cy.get("#fecha").type("2024-11-01");
      cy.get("#monto").type("100");
      cy.get("#descripcion").type("Cine");
      cy.get("#categoria").select("Entretenimiento"); // Asegúrate de que la categoría esté seleccionada
      cy.get("#registrar-gasto-button").click();
  
      // Verificar que el gasto aparece en la lista
      cy.get("#gastos-div").should("contain", "Cine");
  
      // Intentar eliminar el gasto y cancelar
      cy.get(".eliminar-gasto").first().click();
      cy.on("window:confirm", () => false); // Cancelar la eliminación
  
      // Verificar que el gasto sigue en la lista
      cy.get("#gastos-div").should("contain", "Cine");
    });
  });

  });
});



// describe("Edición de un gasto", () => {
//   beforeEach(() => {
//     cy.window().then((win) => {
//       const categories = [
//         { name: 'Entretenimiento', amount: 100 },
//         { name: 'Alimentos', amount: 50 },
//       ];
//       win.sessionStorage.setItem('budgets', JSON.stringify(categories));
//     });
//   });
//     cy.visit("/src/Plantillas/RegistrarGasto.html");
//     cy.get("#fecha").type("2024-11-01");
//     cy.get("#monto").type("100");
//     cy.get("#descripcion").type("Cine");
//     cy.get("#categoria").select("Entretenimiento"); // Asegúrate de que la categoría esté seleccionada
//     cy.get("#registrar-gasto-button").click();
// 


