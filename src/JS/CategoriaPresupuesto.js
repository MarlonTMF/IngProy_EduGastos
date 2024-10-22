class CategoriaPresupuesto {
    constructor() {
    this.categorias = [];
    }

    // Método para registrar una nueva categoría de presupuesto
    registrarCategoria(nombre, presupuesto) {
    const nuevaCategoria = {
        nombre: nombre,
        presupuesto: parseFloat(presupuesto),
        gastado: 0
    };
    this.categorias.push(nuevaCategoria);
    }

    // Método para obtener todas las categorías
    obtenerCategorias() {
    return this.categorias;
    }
}

export default CategoriaPresupuesto;
