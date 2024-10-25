
/*

    PRESUPUESTO MENSUAL

    -Ingresar y mostrar presupuesto del mes.
    -Permitir el  ingreso de una nueva categoria
    -Establecer un monto especifico para la categoria
    -Mostrar varias categorias y sus respectivos presupuestos
    
*/

describe("Presupuesto Mensual", () => {
    it("Permitir ingresar y editar el presupuesto del mes", () => {
        cy.visit("http://localhost:1234/src/Plantillas/presupuestoMensual.html");

        // Hacer clic en el botón 'Editar Presupuesto'
        cy.get('#editBudgetButton').click();

        // Verificar que el input y el botón de guardar estén visibles
        cy.get('#totalBudgetInput').should('be.visible');
        cy.get('#saveBudgetButton').should('be.visible');

        // Editar el presupuesto y guardarlo
        cy.get('#totalBudgetInput').clear({ force: true }).type('1500', { force: true });
        cy.get('#saveBudgetButton').click();

        // Verificar que el valor se haya actualizado correctamente
        cy.get('#totalBudgetDisplay').should('contain', '$1500');
    });
});
