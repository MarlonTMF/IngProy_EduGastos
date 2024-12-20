class ObjetivoAhorro {
    constructor() {
        this.objetivosGuardados = this.obtenerObjetivosDeStorage() || [];
        this.ERROR_CAMPOS = 'Por favor, complete todos los campos obligatorios con valores válidos.';
        this.ERROR_EDITAR = 'No hay un objetivo establecido para editar.';
    }

    guardarObjetivo(monto, descripcion, fechaLimite) {
        const montoNumerico = parseFloat(parseFloat(monto).toFixed(2)); // Asegura dos decimales
        if (!montoNumerico || isNaN(montoNumerico) || montoNumerico <= 0 || !descripcion || !fechaLimite) {
            throw new Error(this.ERROR_CAMPOS);
        }
    
        const nuevoObjetivo = {
            monto: montoNumerico.toFixed(2), // Asegura que siempre tenga dos decimales como string
            descripcion,
            fechaLimite
        };
    
        this.objetivosGuardados.push(nuevoObjetivo);
        sessionStorage.setItem('objetivosAhorro', JSON.stringify(this.objetivosGuardados));
        return nuevoObjetivo;
    }
    
    editarObjetivo(index, monto, descripcion, fechaLimite) {
        if (this.objetivosGuardados.length === 0) {
            throw new Error(this.ERROR_EDITAR);
        }
    
        const montoNumerico = parseFloat(parseFloat(monto).toFixed(2)); // Asegura dos decimales
        if (!montoNumerico || isNaN(montoNumerico) || montoNumerico <= 0 || !descripcion || !fechaLimite) {
            throw new Error(this.ERROR_CAMPOS);
        }
    
        const objetivo = this.objetivosGuardados[index];
        objetivo.monto = montoNumerico.toFixed(2); // Asegura que siempre tenga dos decimales como string
        objetivo.descripcion = descripcion;
        objetivo.fechaLimite = fechaLimite;
    
        sessionStorage.setItem('objetivosAhorro', JSON.stringify(this.objetivosGuardados));
        return objetivo;
    }
    
    obtenerObjetivosDeStorage() {
        const objetivosStorage = sessionStorage.getItem('objetivosAhorro');
        return objetivosStorage ? JSON.parse(objetivosStorage) : [];
    }

    obtenerDetallesObjetivos() {
        return this.objetivosGuardados;
    }


}


export default ObjetivoAhorro;

document.addEventListener('DOMContentLoaded', () => {
    const totalBudgetInput = document.getElementById('totalBudgetInput');
    const descripcionInput = document.getElementById('descripcion');
    const fechaLimiteInput = document.getElementById('fechaLimite');
    const saveBudgetButton = document.getElementById('guardarObjetivo');
    const editBudgetButton = document.getElementById('editarObjetivo');
    const detailsSection = document.getElementById('detallesObjetivo');
    const objetivosContainer = document.getElementById('objetivosContainer');

    const objetivoAhorro = new ObjetivoAhorro();

    function renderObjetivosAhorro() {
        const objetivos = objetivoAhorro.obtenerDetallesObjetivos();
        objetivosContainer.innerHTML = ''; 
    
        if (objetivos.length > 0) {
            objetivos.forEach((objetivo, index) => {
                const objetivoDiv = document.createElement('div');
                objetivoDiv.classList.add('objetivo-item');
                objetivoDiv.innerHTML = `
                    <p><strong>Monto:</strong> $${parseFloat(objetivo.monto).toFixed(2)}</p> <!-- Asegura el formato -->
                    <p><strong>Descripción:</strong> ${objetivo.descripcion}</p>
                    <p><strong>Fecha límite:</strong> ${objetivo.fechaLimite}</p>
                    <button class="editar" data-index="${index}">Editar</button>
                    <hr>
                `;
                objetivosContainer.appendChild(objetivoDiv);
            });
            detailsSection.style.display = 'block';
        } else {
            detailsSection.style.display = 'none';
        }
    } 
    

    saveBudgetButton.addEventListener('click', () => {
        const monto = totalBudgetInput.value;
        const descripcion = descripcionInput.value;
        const fechaLimite = fechaLimiteInput.value;

        try {
            objetivoAhorro.guardarObjetivo(monto, descripcion, fechaLimite);
            renderObjetivosAhorro();

            totalBudgetInput.value = '';
            descripcionInput.value = '';
            fechaLimiteInput.value = '';
        } catch (error) {
            alert(error.message);
        }
    });

    objetivosContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('editar')) {
            const index = event.target.getAttribute('data-index');
            const objetivo = objetivoAhorro.obtenerDetallesObjetivos()[index];

            totalBudgetInput.value = objetivo.monto;
            descripcionInput.value = objetivo.descripcion;
            fechaLimiteInput.value = objetivo.fechaLimite;

            saveBudgetButton.style.display = 'none';
            editBudgetButton.style.display = 'inline-block';

            editBudgetButton.onclick = () => {
                const monto = totalBudgetInput.value;
                const descripcion = descripcionInput.value;
                const fechaLimite = fechaLimiteInput.value;

                try {
                    objetivoAhorro.editarObjetivo(index, monto, descripcion, fechaLimite);
                    renderObjetivosAhorro();

                    totalBudgetInput.value = '';
                    descripcionInput.value = '';
                    fechaLimiteInput.value = '';
                    saveBudgetButton.style.display = 'inline-block';
                    editBudgetButton.style.display = 'none';
                } catch (error) {
                    alert(error.message);
                }
            };
        }
    });

    renderObjetivosAhorro();
});
