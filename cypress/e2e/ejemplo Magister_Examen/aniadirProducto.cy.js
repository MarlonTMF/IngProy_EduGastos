
/**/ 

it("Muestra el monto total",()=>{
    //arrange, configuracion inicial
    cy.visit("/")
    cy.get("producto").type("Pantalon");
    cy.get("precio").type(30);

    // act, ejecutar la funcion
    cy.get("aniadir").click();

    //assert o verificacion
    cy.get("monto-total").should("contain",80);
})

it("Muestra productos aniadidos",()=>{
    //arrange, configuracion inicial
    cy.visit("/")
    cy.get("producto").type("Pantalon");
    cy.get("precio").type(30);

    // act, ejecutar la funcion
    cy.get("aniadir").click();

    cy.get("producto").type("Pantalon");
    cy.get("precio").type(30);

    // act, ejecutar la funcion
    cy.get("aniadir").click();

    //assert o verificacion
    cy.get("producto-lista").should("contain","Pantalon");
    cy.get("producto-lista").should("contain",80);

});

