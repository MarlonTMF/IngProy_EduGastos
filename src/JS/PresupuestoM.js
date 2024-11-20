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

    setTotalBudget(amount) {
        console.log("Intentando establecer presupuesto mensual:", amount);
        if (amount > this.presupuestoTotalG) {
            alert(`El presupuesto mensual no puede exceder el total de ingresos ($${this.presupuestoTotalG})`);
            return;
        }
        this.presupuestoMensual = amount;
        sessionStorage.setItem('totalMonthlyBudget', amount);
        console.log("Presupuesto mensual actualizado:", this.presupuestoMensual); // Verifica la actualización
    }

    addCategory(category) {
        // Validar la categoría antes de agregarla
        if (category.name && !this.budgets.find(cat => cat.name === category.name)) {
            if(category.amount > this.presupuestoMensual){
                alert(`No hay sficiente presupuesto mensual disponible , restante: $${this.presupuestoMensual}`);
                return;
            }
            category.gastado = 0;
            this.budgets.push(category); 
            this.presupuestoMensual -= category.amount;
            sessionStorage.setItem('budgets', JSON.stringify(this.budgets));
            sessionStorage.setItem('totalMonthlyBudget',this.presupuestoMensual);
        }
    }

    getCategories() {
        return this.budgets;
    }
    getGastoCategoria() {
        
        return this.budgets.gastado;
    }

    getPresupuestoTotalGlobal(){
        return this.presupuestoTotalG;
    }
    getPresupuestoMensualRestante() {
        return this.presupuestoMensual;
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
