import { Gastos, validarCampos } from "./RegistroGasto.js";
import { Presupuesto } from "./PresupuestoM.js";

// Mock de sessionStorage
const mockSessionStorage = (() => {
  let store = {};

  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {}; // Limpiar todo el almacenamiento
    },
    removeItem: (key) => {
      delete store[key];
    },
  };
})();

Object.defineProperty(global, "sessionStorage", {
  value: mockSessionStorage,
});

describe("Gastos", () => {
  
  let presupuesto;
  let gastos;

  beforeEach(() => {
    global.alert = jest.fn();  // Mock de alert

    const ingresosMock = {
      obtenerIngresos: () => 5000, 
      obtenerTotalIngresos: () => 5000,
    };

    presupuesto = new Presupuesto(ingresosMock); 
    gastos = new Gastos(presupuesto); 
    sessionStorage.clear(); 

    // Inicializar categorías
    presupuesto.addCategory({ name: "Alimentos", amount: 1000 });
    presupuesto.addCategory({ name: "Transporte", amount: 500 });
  });

  it.skip("debe registrar un gasto correctamente cuando todos los campos son válidos", () => {
    const registroGasto = {
      fecha: "2024-10-12",
      monto: 50,
      descripcion: "compra de libros",
      categoria: "Alimentos",
    };

    gastos.registrarGasto(registroGasto);
    
    // Verificar que el gasto se ha registrado correctamente
    const gastosRegistrados = gastos.obtenerGastos();
    expect(gastosRegistrados.length).toBe(1);
    expect(gastosRegistrados[0]).toEqual(registroGasto);
  });

  it.skip("no debe permitir registrar un gasto si excede el presupuesto de la categoría", () => {
    const registroGastoExcedido = {
      fecha: "2024-10-12",
      monto: 1500, // Excede el presupuesto de 1000 para Alimentos
      descripcion: "compra de libros",
      categoria: "Alimentos",
    };

    gastos.registrarGasto(registroGastoExcedido);
    
    // Esperamos que se muestre una alerta de error
    expect(global.alert).toHaveBeenCalledWith("El gasto excede el presupuesto disponible para la categoría: Alimentos");
  });

  it.skip("debería eliminar un gasto y actualizar correctamente el presupuesto de la categoría", () => {
    const gastoEliminado = {
      fecha: "2024-10-12",
      monto: 500,
      descripcion: "compra de libros",
      categoria: "Transporte",
    };

    gastos.registrarGasto(gastoEliminado);

    // Comprobar que el gasto fue registrado
    expect(gastos.obtenerGastos().length).toBe(1);
    
    // Eliminar el gasto
    gastos.eliminarGasto(0);

    // Verificar que el gasto ha sido eliminado
    expect(gastos.obtenerGastos().length).toBe(0);
    expect(global.alert).not.toHaveBeenCalled();
  });

  it.skip("debe actualizar correctamente el monto gastado en la categoría después de eliminar un gasto", () => {
    const gastoEliminado = {
      fecha: "2024-10-12",
      monto: 500,
      descripcion: "compra de libros",
      categoria: "Transporte",
    };

    gastos.registrarGasto(gastoEliminado);

    // Comprobar el monto gastado antes de eliminar
    const categoriasAntesDeEliminar = presupuesto.getCategories();
    expect(categoriasAntesDeEliminar[1].gastado).toBe(500); // "Transporte"

    // Eliminar el gasto
    gastos.eliminarGasto(0);

    // Comprobar el monto gastado después de eliminar
    const categoriasDespuesDeEliminar = presupuesto.getCategories();
    expect(categoriasDespuesDeEliminar[1].gastado).toBe(0);
  });

  it("no debe registrar un gasto si la categoría no existe", () => {
    const registroGastoConCategoriaInvalida = {
      fecha: "2024-10-12",
      monto: 50,
      descripcion: "compra de libros",
      categoria: "Ocio", // Categoría no existente
    };

    gastos.registrarGasto(registroGastoConCategoriaInvalida);
    
    // Se espera que se muestre una alerta de error
    expect(global.alert).toHaveBeenCalledWith("La categoría seleccionada no es válida.");
  });

  it("no debe registrar un gasto si falta el monto", () => {
    const gastoSinMonto = {
      fecha: "2024-10-12",
      descripcion: "compra de libros",
      categoria: "Alimentos",
    };

    gastos.registrarGasto(gastoSinMonto);
    
    // Esperamos que no se registre el gasto, ya que falta el monto
    expect(gastos.obtenerGastos().length).toBe(0);
  });

  it("debe cargar correctamente los gastos desde sessionStorage", () => {
    const gastosPrevios = [
      { fecha: "2024-10-12", monto: 200, descripcion: "compra de libros", categoria: "Alimentos" },
      { fecha: "2024-10-13", monto: 100, descripcion: "paseo", categoria: "Transporte" },
    ];

    sessionStorage.setItem('gastos', JSON.stringify(gastosPrevios));
    const gastosCargados = new Gastos(presupuesto);

    // Verificar que los gastos se cargaron correctamente
    expect(gastosCargados.obtenerGastos()).toEqual(gastosPrevios);
  });

  it("debería validar correctamente los campos al registrar un gasto", () => {
    // Prueba de fecha vacía
    const erroresFecha = validarCampos("", 100); 
    expect(erroresFecha).toEqual(["El campo de fecha es obligatorio."]);

    // Prueba de monto vacío
    const erroresMonto = validarCampos("2024-10-23", ""); 
    expect(erroresMonto).toEqual(["El campo de monto es obligatorio."]);

    // Prueba sin errores
    const sinErrores = validarCampos("2024-10-23", 100);
    expect(sinErrores).toEqual([]);
  });
  
});
