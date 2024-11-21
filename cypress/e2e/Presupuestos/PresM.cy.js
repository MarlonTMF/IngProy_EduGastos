describe.skip("Presupuesto Mensual", () => {
    beforeEach(() => {
        cy.visit("http://localhost:1234/src/Plantillas/presupuestoMensual.html");
    });

    it("Permitir ingresar y editar el presupuesto del mes", () => {
        // Hacer clic en el botón 'Editar Presupuesto'
        cy.get('#editBudgetButton').click();

        // Verificar que el input y el botón de guardar estén visibles
        cy.get('#totalBudgetInput').should('be.visible');
        cy.get('#saveBudgetButton').should('be.visible');

        // Editar el presupuesto y guardarlo
        cy.get('#totalBudgetInput').clear().type('1500');
        cy.get('#saveBudgetButton').click();

        // Esperar un momento para que el cambio se refleje en la interfaz
        cy.wait(500); // Espera 500 ms

        // Verificar que el valor se haya actualizado correctamente
        cy.get('#totalBudgetDisplay').should('contain', '$1500');
    });

    it("Permitir ingresar una nueva categoría con su monto", () => {
        // Hacer clic en el botón para agregar categoría
        cy.get('#addCategoryButton').click();

        // Verificar que el contenedor para agregar categoría esté visible
        cy.get('#addCategoryContainer').should('be.visible');

        // Agregar una nueva categoría
        cy.get('#categoryNameInput').type('Comida');
        cy.get('#categoryAmountInput').type('300');
        cy.get('#saveCategoryButton').click();

        // Esperar un momento para que la categoría se agregue correctamente
        cy.wait(500); // Espera 500 ms

        // Verificar que la categoría se haya agregado correctamente
        cy.get('#categoryListDisplay').should('contain', 'Comida: $300');
    });
});
