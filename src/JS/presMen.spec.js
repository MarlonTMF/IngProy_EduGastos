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
        // Registrar la nueva categoría en la lógica de negocio
        presupuesto.registrarCategoria(categoryName, categoryBudget);

        // Obtener las categorías actualizadas y mostrarlas en la interfaz
        const categorias = presupuesto.obtenerCategorias();
        const container = document.querySelector('.container');

        // Limpiar el contenedor de la interfaz para volver a cargar todo
        container.innerHTML = categorias.map(categoria => `
            <div class="budget-item">
                <div class="budget-category">
                    <p>${categoria.nombre}</p>
                    <p>Budget: $${categoria.presupuesto.toFixed(2)} | Spent: $${categoria.gastado.toFixed(2)}</p>
                </div>
                <div class="progress-bar">
                    <div class="progress" style="width: ${categoria.gastado / categoria.presupuesto * 100}%;"></div>
                </div>
            </div>
        `).join('') + `<button id="addCategoryBtn">Add New Category</button>`;

        // Reasignar el evento al botón "Add New Category" después de recargar el HTML
        document.getElementById('addCategoryBtn').onclick = addCategoryBtn.onclick;

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
