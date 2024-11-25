
/**
 * @jest-environment jsdom
 */

describe("Renderización de objetivos guardados", () => {
    beforeEach(() => {
        cy.window().then((win) => {
            win.sessionStorage.clear();
        });
        cy.visit("http://localhost:1234/src/Plantillas/objetivoAhorro.html");
    });

    it("Debería mostrar objetivos guardados", () => {
        cy.get("#totalBudgetInput").type("1000");
        cy.get("#descripcion").type("Vacaciones");
        cy.get("#fechaLimite").type("2024-12-31");
        cy.get("#guardarObjetivo").click();

        cy.get("#objetivosContainer")
            .should("contain", "Monto: $1000")
            .and("contain", "Descripción: Vacaciones")
            .and("contain", "Fecha límite: 2024-12-31");
    });
});
