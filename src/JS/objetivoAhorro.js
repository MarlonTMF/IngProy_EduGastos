class ObjetivoAhorro {
    constructor() {
        this.objetivosGuardados = this.obtenerObjetivosDeStorage() || [];
    }

    guardarObjetivo(monto, descripcion, fechaLimite) {
        monto = parseFloat(parseFloat(monto).toFixed(2));

        if (!monto || isNaN(monto) || monto <= 0 || !descripcion || !fechaLimite) {
            throw new Error('Por favor, complete todos los campos obligatorios con valores válidos.');
        }

        const nuevoObjetivo = { 
            monto: monto.toString(), 
            descripcion, 
            fechaLimite 
        };
        this.objetivosGuardados.push(nuevoObjetivo);
        sessionStorage.setItem('objetivosAhorro', JSON.stringify(this.objetivosGuardados));
        return nuevoObjetivo;
    }

    obtenerObjetivosDeStorage() {
        const objetivosStorage = sessionStorage.getItem('objetivosAhorro');
        return objetivosStorage ? JSON.parse(objetivosStorage) : [];
    } 

    obtenerDetallesObjetivos() {
        return this.objetivosGuardados;
    }
    
    editarObjetivo(index, monto, descripcion, fechaLimite) {
        if (this.objetivosGuardados.length === 0) {
            throw new Error('No hay un objetivo establecido para editar.');
        }
    
        monto = parseFloat(parseFloat(monto).toFixed(2));
        if (!monto || isNaN(monto) || monto <= 0 || !descripcion || !fechaLimite) {
            throw new Error('Por favor, complete todos los campos con valores válidos para editar.');
        }
    
        const objetivo = this.objetivosGuardados[index];
        objetivo.monto = monto.toString();
        objetivo.descripcion = descripcion;
        objetivo.fechaLimite = fechaLimite;
    
        sessionStorage.setItem('objetivosAhorro', JSON.stringify(this.objetivosGuardados));
        return objetivo;
    }
    
    
}

export default ObjetivoAhorro;
