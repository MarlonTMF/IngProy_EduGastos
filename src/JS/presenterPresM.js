import { Presupuesto } from './PresupuestoM.js';

document.addEventListener('DOMContentLoaded', () => {
    const totalBudgetDisplay = document.getElementById('totalBudgetDisplay');
    const totalBudgetInput = document.getElementById('totalBudgetInput');
    const editBudgetButton = document.getElementById('editBudgetButton');
    const saveBudgetButton = document.getElementById('saveBudgetButton');

    // Crear una instancia de la clase Presupuesto
    const presupuesto = new Presupuesto();
    

    function renderTotalBudget() {
        const currentBudget = presupuesto.getTotalBudget();
        totalBudgetDisplay.textContent = `$${currentBudget}`;
        totalBudgetInput.value = currentBudget;
    }

    // Muestra el input para editar el presupuesto
    editBudgetButton.addEventListener('click', () => {
        totalBudgetDisplay.style.display = 'none';
        totalBudgetInput.style.display = 'inline';
        editBudgetButton.style.display = 'none';
        saveBudgetButton.style.display = 'inline';
    });

    // Guarda el presupuesto cuando se hace clic en 'Guardar Presupuesto'
    saveBudgetButton.addEventListener('click', () => {
        const newBudget = parseFloat(totalBudgetInput.value);
        if (!isNaN(newBudget) && newBudget > 0) {
            presupuesto.setTotalBudget(newBudget);
            renderTotalBudget();
        } else {
            alert('Por favor ingrese un valor válido para el presupuesto.');
        }
        totalBudgetDisplay.style.display = 'inline';
        totalBudgetInput.style.display = 'none';
        editBudgetButton.style.display = 'inline';
        saveBudgetButton.style.display = 'none';
    });

    // Renderizar el presupuesto inicial
    renderTotalBudget();
});
