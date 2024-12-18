import Ingresos from './ingresos.js';
import { Presupuesto } from './PresupuestoM.js';

document.addEventListener('DOMContentLoaded', () => {
    const totalBudgetDisplay = document.getElementById('totalBudgetDisplay');
    const totalBudgetInput = document.getElementById('totalBudgetInput');
    const editBudgetButton = document.getElementById('editBudgetButton');
    const saveBudgetButton = document.getElementById('saveBudgetButton');
    const addCategoryButton = document.getElementById('addCategoryButton'); // Asegúrate de que el ID sea correcto
    const categoryNameInput = document.getElementById('categoryNameInput');
    const categoryAmountInput = document.getElementById('categoryAmountInput');
    const categoryListDisplay = document.getElementById('categoryListDisplay');

    // Crear una instancia de la clase Presupuesto
    const ingresos = new Ingresos(); // Instancia de ingresos
    const presupuesto = new Presupuesto(ingresos);


    function renderTotalBudget() {
        const currentBudget = presupuesto.getTotalBudget();
        totalBudgetDisplay.textContent = `$${currentBudget}`;
        totalBudgetInput.value = currentBudget;
    }

    function renderCategories() {
        categoryListDisplay.innerHTML = ''; // Limpiar la lista
        const categories = presupuesto.getCategories();
        // const gastoActual = 
        categories.forEach(category => {
            const li = document.createElement('li');
            li.textContent = `${category.name}: Monto Limite $${category.amount} | Monto Actual $${category.gastado}`; // Muestra el nombre y el monto
            categoryListDisplay.appendChild(li);
        });
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
        if (!isNaN(newBudget) && newBudget >= 0) {
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

    // Agregar un event listener para el botón de agregar categoría
    addCategoryButton.addEventListener('click', () => {
        document.getElementById('addCategoryContainer').style.display = 'block'; // Muestra el contenedor para agregar categoría
    });

    // Agregar una nueva categoría
    const saveCategoryButton = document.getElementById('saveCategoryButton');
    saveCategoryButton.addEventListener('click', () => {
        const categoryName = categoryNameInput.value;
        const categoryAmount = parseFloat(categoryAmountInput.value);

        if (categoryName && !isNaN(categoryAmount) && categoryAmount > 0) {
            if (categoryAmount > presupuesto.getPresupuestoMensualRestante()) {
                alert(`No hay suficiente presupuesto mensual disponible. Restante: $${presupuesto.getPresupuestoMensualRestante()}`);
                return;
            }
            presupuesto.addCategory({ name: categoryName, amount: categoryAmount });
            renderCategories();
            renderTotalBudget(); // Actualiza el presupuesto mensual restante
            categoryNameInput.value = '';
            categoryAmountInput.value = '';
            document.getElementById('addCategoryContainer').style.display = 'none';
        } else {
            alert('Por favor, ingrese un nombre válido y un monto.');
        }
    });

    // Renderizar el presupuesto inicial y las categorías
    renderTotalBudget();
    renderCategories(); // Renderizar las categorías iniciales si existen
});