/*
Como : Estudiante universitario
 
Quiero : ver historial de deudas

Para : poder contabilizar las deudas que tengo hasta la fecha

Criterios de confirmación:
-visualizar deudas, su procedencia, cantidad e interes 
-visualizar cronograma de pagos de las deudas respectivas
-se puede ver la suma total de deudas al final
*/

describe("ver historial de deudas", () => {
    it('visualizar deudas, su procedencia, cantidad e interes anual porcentual', () => {
        // Introduce un gasto válido
        cy.visit("http://localhost:1234/src/Plantillas/historialdeudas.html"); // Ruta del HTML donde se registran los gastos
        cy.get("#procedencia").type("Banco");
        cy.get("#cantidad").type(1000);
        cy.get("#interes").type(10);
        cy.get("#cronograma").type("semanal");
        
        // When -- Act
        cy.get("#registrar-deuda-button").click();
    
        // Then -- Assert
        // Ahora visita el historial donde se muestran los gastos registrados
        cy.visit("http://localhost:1234/src/Plantillas/historialdeudas.html"); // Ruta del historial de gastos
        cy.get("#historial-deudas-div")
          .should("contain", "Banco")
          .and("contain", "1000")
          .and("contain", "10")
          .and("contain", "semanal");
          
      });

      it('visualizar cronograma de pagos de las deudas respectivas', () => {
        // Introduce un gasto válido
        cy.visit("http://localhost:1234/src/Plantillas/historialdeudas.html"); // Ruta del HTML donde se registran los gastos
        cy.get("#procedencia").type("Banco");
        cy.get("#cantidad").type(1000);
        cy.get("#interes").type(10);
        cy.get("#cronograma").type("anualmente");
    
        // When -- Act
        cy.get("#registrar-deuda-button").click();
    
        // Then -- Assert
        // Ahora visita el historial donde se muestran los gastos registrados
        cy.visit("http://localhost:1234/src/Plantillas/historialdeudas.html"); // Ruta del historial de gastos
        cy.get("#historial-deudas-div")
          .should("contain", "Banco")
          .and("contain", "1000")
          .and("contain", "10")
          .and("contain", "anualmente");
      });

      it('se puede ver la suma total de deudas al final', () => {
        // Introduce un gasto válido
        cy.visit("http://localhost:1234/src/Plantillas/historialdeudas.html"); // Ruta del HTML donde se registran los gastos
        cy.get("#procedencia").type("Banco");
        cy.get("#cantidad").type(1000);
        cy.get("#interes").type(10);
        cy.get("#cronograma").type("anualmente");
        
        cy.get("#registrar-deuda-button").click();
        cy.get("#procedencia").type("Familiar");
        cy.get("#cantidad").type(2000);
        cy.get("#interes").type(10);
        cy.get("#cronograma").type("mensual");
        // When -- Act
        cy.get("#registrar-deuda-button").click();
    
        // Then -- Assert
        // Ahora visita el historial donde se muestran los gastos registrados
        cy.visit("http://localhost:1234/src/Plantillas/historialdeudas.html"); // Ruta del historial de gastos
        cy.get("#total-deudas")
          .should("contain", "3000");
      });
});