describe('Budget App', () => {
    beforeEach(() => {
        cy.visit('http://localhost:1234/src/Plantillas/presupuestoMensual.html'); // Cambia la URL al servidor donde esté corriendo tu app
    });

    it('should allow adding a new budget category', () => {
        // Verificar que el botón de agregar categoría existe
        cy.get('#addCategoryBtn').click();

        // Abrir modal y agregar nueva categoría
        cy.get('#categoryName').type('Gym Membership');
        cy.get('#categoryBudget').type('50');
        cy.get('#saveCategoryBtn').click();

        // Verificar que la categoría ha sido añadida
        cy.contains('.budget-category', 'Gym Membership').should('be.visible');
        cy.contains('.budget-category', 'Budget: $50 | Spent: $0').should('be.visible');
    });

    it('should correctly display progress bar based on spent amount', () => {
        // Simula añadir una categoría con presupuesto y gasto
        cy.get('#addCategoryBtn').click();
        cy.get('#categoryName').type('Food');
        cy.get('#categoryBudget').type('200');
        cy.get('#saveCategoryBtn').click();

        // Actualizar el progreso de la categoría
        // Aquí tendrías que crear un mecanismo en la UI para simular gasto en tiempo real
        cy.get('.budget-item').contains('Food').find('.progress-bar .progress')
            .invoke('width').should('be.greaterThan', 0);
    });
});
