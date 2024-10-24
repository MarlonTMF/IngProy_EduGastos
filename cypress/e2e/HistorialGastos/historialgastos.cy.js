/*
Como : Estudiante
 
Quiero : ver historial de gastos

Para : informarme de los gastos que he registrado

Criterios de confirmación:
-cuando el estudiante haga click en el gastos, se accedera a todos los gastos realizados el último mes
- cuando se muestren los gastos, se mostrar junto con la información adicional del gasto(Fecha, tipo)
- si hay un valor que no se pueda mostrar, se mostrará que este archivo no se puede mostrar
*/

describe("ver historial de gastos", () => {
    it('Debe mostrar los gastos cuando el estudiante hace clic en "Registrar Gasto"', () => {
        // Introduce un gasto válido
        cy.visit("/"); // Ruta del HTML donde se registran los gastos
        cy.get("#fecha").type("2024-10-14");
        cy.get("#monto").type(55);
        cy.get("#descripcion").type("Fotocopias varias");
    
        // When -- Act
        cy.get("#registrar-gasto-button").click();
    
        // Then -- Assert
        // Ahora visita el historial donde se muestran los gastos registrados
        cy.visit("/src/Plantillas/historialgastos.html"); // Ruta del historial de gastos
        cy.get("#historial-gastos-div")
          .should("contain", "2024-10-14")
          .and("contain", "55")
          .and("contain", "Fotocopias varias");
      });

      it('muestra advertencia cuando no se pueden mostrar los campos"', () => {
        // Introduce un gasto válido
        cy.visit("/"); // Ruta del HTML donde se registran los gastos
        cy.get("#fecha").type("2024-10-14");
        cy.get("#monto").clear();
        cy.get("#descripcion").type("Fotocopias varias");
    
        // When -- Act
        cy.get("#registrar-gasto-button").click();
    
        // Then -- Assert
        cy.contains('Debe llenar todos los campos.').should('be.visible');
    });
  });
  