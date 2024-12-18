import Ingresos from "./ingresos";

class Presupuesto {
    constructor(ingresosInstance) {
        this.ingresosInstance = ingresosInstance;
        console.log("Ingresos pasados a Presupuesto:", this.ingresosInstance.obtenerIngresos()); // Verifica los ingresos
        const categoriasGuardadas = sessionStorage.getItem('budgets');
        this.budgets = categoriasGuardadas ? JSON.parse(categoriasGuardadas) : [];
        this.presupuestoTotalG = ingresosInstance.obtenerTotalIngresos();
        console.log("Presupuesto total global:", this.presupuestoTotalG); // Verifica el presupuesto global
        this.presupuestoMensual = this.getTotalBudget();

    }

    getTotalBudget() {
        const totalBudget = parseFloat(sessionStorage.getItem('totalMonthlyBudget')) || 0;
        console.log("Presupuesto mensual desde sessionStorage:", totalBudget); // Verifica el presupuesto mensual
        return totalBudget;
    }

    setTotalBudget(montodeCategoria) {
        console.log("Intentando establecer presupuesto mensual:", montodeCategoria);
        if (montodeCategoria > this.presupuestoTotalG) {
            alert(`El presupuesto mensual no puede exceder el total de ingresos ($${this.presupuestoTotalG})`);
            return;
        }
        this.presupuestoMensual = montodeCategoria;
        sessionStorage.setItem('totalMonthlyBudget', montodeCategoria);
        console.log("Presupuesto mensual actualizado:", this.presupuestoMensual); // Verifica la actualización
    }

    addCategory(category) {
        // Validar la categoría antes de agregarla
        if (category.name && !this.budgets.find(cat => cat.name === category.name)) {
            if(category.montodeCategoria > this.presupuestoMensual){
                alert(`No hay sficiente presupuesto mensual disponible , restante: $${this.presupuestoMensual}`);
                return;
            }
            this.budgets.push(category); // Agregar objeto de categoría
            this.presupuestoMensual -= category.montodeCategoria;
            sessionStorage.setItem('budgets', JSON.stringify(this.budgets));
            sessionStorage.setItem('totalMonthlyBudget',this.presupuestoMensual);
        }
    }

    getCategories() {
        return this.budgets;
    }

    getPresupuestoTotalGlobal(){
        return this.presupuestoTotalG;
    }
    getPresupuestoMensualRestante() {
        return this.presupuestoMensual;
    }

editarCategoria(name, nuevoMonto) {
    const categoria = this.budgets.find(cat => cat.name === name);
    if (!categoria) {
        alert(`La categoría '${name}' no existe.`);
        return;
    }

    const diferencia = nuevoMonto - categoria.montodeCategoria;

    // Verificar si hay suficiente presupuesto mensual disponible para el cambio
    if (this.presupuestoMensual - diferencia < 0) {
        alert(`No hay suficiente presupuesto mensual disponible para actualizar la categoría '${name}'.`);
        return;
    }

    // Actualizar el presupuesto mensual restante
    this.presupuestoMensual -= diferencia;

    // Actualizar el monto de la categoría
    categoria.montodeCategoria = nuevoMonto;

    // Guardar los cambios en sessionStorage
    sessionStorage.setItem('budgets', JSON.stringify(this.budgets));
    sessionStorage.setItem('totalMonthlyBudget', this.presupuestoMensual);

    console.log(`Categoría '${name}' actualizada con éxito. Nuevo monto: $${nuevoMonto}`);
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