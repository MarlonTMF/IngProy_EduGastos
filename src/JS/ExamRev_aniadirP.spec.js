it.skip( "mostrar el monto total de la venta",()=>{
    //configurar
    let venta = new Venta();
    let producto = new Producto("silla", 10);
    venta.aniadirProducto(producto);

    //ejecucion
    let total = venta.calcularTotal()
    //verificacion
    expect(total).toEqual(10);
})

it.skip( "mostrar el monto total de 2 productos",()=>{
    //configurar
    let venta = new Venta();
    let producto1 = new Producto("silla", 7);
    venta.aniadirProducto(producto1);
    let producto2 = new Producto("mesa", 10);
    venta.aniadirProducto(producto2);

    //ejecucion
    let total = venta.calcularTotal()
    //verificacion
    expect(total).toEqual(17);
})