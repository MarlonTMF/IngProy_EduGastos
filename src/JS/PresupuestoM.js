class Presupuesto {
    constructor() {
        // Cargar categorías desde sessionStorage al instanciar la clase
        const categoriasGuardadas = sessionStorage.getItem('budgets');
        this.budgets = categoriasGuardadas ? JSON.parse(categoriasGuardadas) : [];
    }

    getTotalBudget() {
        // Obtener el presupuesto total desde sessionStorage, o devolver 0 si no está definido
        return parseFloat(sessionStorage.getItem('totalMonthlyBudget')) || 0;
    }

    setTotalBudget(amount) {
        // Establecer el presupuesto total y guardarlo en sessionStorage
        sessionStorage.setItem('totalMonthlyBudget', amount);
    }

    addCategory(category) {
        // Validar la categoría antes de agregarla
        if (category.name && !this.budgets.find(cat => cat.name === category.name)) {
            this.budgets.push(category); // Agregar objeto de categoría
            sessionStorage.setItem('budgets', JSON.stringify(this.budgets));
        }
    }

    getCategories() {
        return this.budgets;
    }
}

// Función de validación para categorías
function validarCategoria(name) {
    const errores = [];
    if (!name) {
        errores.push("El nombre de la categoría es obligatorio.");
    }
    return errores;
}

export { Presupuesto, validarCategoria };
