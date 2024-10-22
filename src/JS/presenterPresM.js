import CategoriaPresupuesto from './CategoriaPresupuesto.js';

// Crear una instancia de la clase CategoriaPresupuesto
const presupuesto = new CategoriaPresupuesto();

// Modal elements
const modal = document.getElementById('categoryModal');
const addCategoryBtn = document.getElementById('addCategoryBtn');
const closeModal = document.getElementsByClassName('close')[0];
const saveCategoryBtn = document.getElementById('saveCategoryBtn');

// Abrir la ventana emergente
addCategoryBtn.onclick = function() {
    modal.style.display = "block";
}

// Cerrar la ventana emergente
closeModal.onclick = function() {
    modal.style.display = "none";
}

// Guardar la nueva categoría de presupuesto
saveCategoryBtn.onclick = function() {
    const categoryName = document.getElementById('categoryName').value;
    const categoryBudget = document.getElementById('categoryBudget').value;

    if (categoryName && categoryBudget) {
        // Crear un nuevo elemento de presupuesto
        const container = document.querySelector('.container');
        const newCategory = document.createElement('div');
        newCategory.classList.add('budget-item');
        newCategory.innerHTML = `
            <div class="budget-category">
                <p>${categoryName}</p>
                <p>Budget: $${categoryBudget} | Spent: $0</p>
            </div>
            <div class="progress-bar">
                <div class="progress" style="width: 0%;"></div>
            </div>
        `;
        container.insertBefore(newCategory, addCategoryBtn);

        // Cerrar el modal
        modal.style.display = "none";
    } else {
        alert('Please fill in all fields');
    }
}

// Cerrar el modal si se hace clic fuera del contenido
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
