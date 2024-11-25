describe("Carga inicial de la página", () => {
    beforeEach(() => {
        cy.visit("http://localhost:1234/src/Plantillas/objetivoAhorro.html");
    });

    it("Debería mostrar el botón de guardar objetivo al cargar", () => {
        cy.get("#guardarObjetivo").should("be.visible");
    });

    it("Debería no mostrar ningún objetivo inicialmente", () => {
        cy.get("#detallesObjetivo").should("not.be.visible");
    });
});
