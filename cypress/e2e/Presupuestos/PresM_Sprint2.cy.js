describe('Validación de Presupuestos', () => {
    beforeEach(() => {
        // Configura sessionStorage con ingresos y presupuesto inicial
        cy.visit('http://localhost:1234/src/Plantillas/presupuestoMensual.html'); // Cambia por tu URL

        // Limpia sessionStorage antes de cada prueba
        sessionStorage.clear();

        // Establecer ingresos en sessionStorage manualmente
        const ingresos = [
            { monto: 2000 },
            { monto: 1500 },
        ];
        sessionStorage.setItem("ingresos", JSON.stringify(ingresos));


    });
  
    it('Permite visualizar las categorías con sus montos asignados y gastados', () => {
      // Configura presupuesto inicial
      cy.get('#editBudgetButton').click();
      cy.get('#totalBudgetInput').type('1000');
      cy.get('#saveBudgetButton').click();
  
      // Agrega una categoría
      cy.get('#addCategoryButton').click();
      cy.get('#categoryNameInput').type('Comida');
      cy.get('#categoryAmountInput').type('300');
      cy.get('#saveCategoryButton').click();
  
      // Verifica que la categoría se muestre con los montos correctos
      cy.get('#categoryListDisplay li')
        .should('contain', 'Comida')
        .and('contain', 'Monto Limite $300');
    });
  
    it('Muestra error al establecer un presupuesto mensual mayor al total de ingresos', () => {
      // Configura ingresos
      cy.window().then((win) => {
        win.sessionStorage.setItem(
          'ingresos',
          JSON.stringify([{ monto: 500 }]) // Ingresos totales de $500
        );
      });
  
      // Intenta configurar un presupuesto mensual mayor a los ingresos
      cy.get('#editBudgetButton').click();
      cy.get('#totalBudgetInput').type('600'); // $600 es mayor a $500
      cy.get('#saveBudgetButton').click();
  
      // Verifica que se muestre un error
      cy.on('window:alert', (txt) => {
        expect(txt).to.contains(
          'El presupuesto mensual no puede exceder el total de ingresos ($500)'
        );
      });
    });
  
    it.skip('Muestra error si la categoría supera el presupuesto mensual restante', () => {
      // Configura presupuesto inicial
      cy.get('#editBudgetButton').click();
      cy.get('#totalBudgetInput').type('500');
      cy.get('#saveBudgetButton').click();
  
      // Intenta agregar una categoría con un monto mayor al presupuesto disponible
      cy.get('#addCategoryButton').click();
      cy.get('#categoryNameInput').type('Entretenimiento');
      cy.get('#categoryAmountInput').type('600'); // Excede el presupuesto disponible
      cy.get('#saveCategoryButton').click();
  
      // Verifica que se muestre un error
      cy.on('window:alert', (txt) => {
        expect(txt).to.contains(
          'No hay suficiente presupuesto mensual disponible. Restante: $500'
        );
      });
    });
  
    it.skip('Permite actualizar el presupuesto y agregar nuevas categorías correctamente', () => {
      // Configura presupuesto inicial
      cy.get('#editBudgetButton').click();
      cy.get('#totalBudgetInput').type('800');
      cy.get('#saveBudgetButton').click();
  
      // Agrega una categoría válida
      cy.get('#addCategoryButton').click();
      cy.get('#categoryNameInput').type('Transporte');
      cy.get('#categoryAmountInput').type('200');
      cy.get('#saveCategoryButton').click();
  
      // Verifica que el presupuesto restante se actualice
      cy.get('#totalBudgetDisplay').should('contain', '600'); // $800 - $200 = $600
  
      // Agrega otra categoría válida
      cy.get('#addCategoryButton').click();
      cy.get('#categoryNameInput').type('Ropa');
      cy.get('#categoryAmountInput').type('150');
      cy.get('#saveCategoryButton').click();
  
      // Verifica que ambas categorías estén en la lista
      cy.get('#categoryListDisplay li').should('have.length', 2);
      cy.get('#categoryListDisplay li').first().should('contain', 'Transporte');
      cy.get('#categoryListDisplay li').last().should('contain', 'Ropa');
    });
  });
  