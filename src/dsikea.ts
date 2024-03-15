// import * as inquirer from 'inquirer';

/**
 * @brief Dimensiones de un mueble
 * @param ancho : ancho del mueble en cm
 * @param alto : alto del mueble en cm
 * @param fondo : fondo del mueble en cm
 */
export class Dimensiones{
  constructor(
    private ancho: number, 
    private alto: number,
    private fondo: number,
  ) {}

  getAncho(): number {
    return this.ancho;
  }

  getAlto(): number {
    return this.alto;
  }

  getFondo(): number {
    return this.fondo;
  }

  getDescripcion(): string {
    return `Ancho: ${this.ancho}cm , Alto: ${this.alto}cm , Fondo: ${this.fondo}cm `;
  }
}

/**
 * @brief Interfaz para la referencia de un mueble
 * @param IDUnico : número único para identificar el mueble
 * @param Nombre : nombre del mueble
 * @param Descripción : descripción del mueble
 * @param Material : material del mueble
 * @param Dimensiones : dimensiones del mueble
 * @param Precio : precio del mueble
 */
export interface ReferenciaMueble {
  IDUnico: number,
  Nombre : string,
  Descripción : string,
  Material : string,
  Dimensiones : Dimensiones,
  Precio : number
}


export enum ALGORITHM_TYPE {
  ALFABETO,
  PRECIO_ASCENDENTE, 
  PRECIO_DESCENDENTE,
}

interface OrdenarPor {
  sort(muebles: ReferenciaMueble[]): ReferenciaMueble[];
}

class Alfabeticamente implements OrdenarPor {
  sort(muebles: ReferenciaMueble[]): ReferenciaMueble[] {
      return muebles.slice().sort((a, b) => a.Nombre.localeCompare(b.Nombre));
  }
}

class PrecioAscendente implements OrdenarPor {
  sort(muebles: ReferenciaMueble[]): ReferenciaMueble[] {
      return muebles.slice().sort((a, b) => a.Precio - b.Precio);
  }
}

class PrecioDescendente implements OrdenarPor {
  sort(muebles: ReferenciaMueble[]): ReferenciaMueble[] {
      return muebles.slice().sort((a, b) => b.Precio - a.Precio);
  }
}

/**
 * Class Mueble que contiene un array de Referencia Mueble
 * @metodo ObtenerMuebles
 */
export class Muebles {
  constructor(private muebles: ReferenciaMueble[]) {}

  /**
   * Método para obtener obtener 
   */
  ObtenerMuebles() : ReferenciaMueble[] {
    return this.muebles;
  } 

  /**
   * Añadir un mueble nuevo
   */
    AyadirMueble(mueble_nuevo : ReferenciaMueble): void {
      this.muebles.push(mueble_nuevo);
    }
  
    /**
     * Eliminar un mueble 
     */
    EliminarMueble(id_unico : number) : void {
      this.muebles = this.muebles.filter((mueble) => mueble.IDUnico !== id_unico);
    }
  /**
   * Método para buscar muebles por nombre exacto y ordenarlos según lo requerido
   * @param nombre : string con el nombre del producto
   * @param ordenamiento : es un enum ALGORITHM_TYPE
   * @return array de RefereciaMueble ordenados con el algoritmo que se requiere
   */
  BuscarPorNombre(nombre: string, ordenamiento: ALGORITHM_TYPE): ReferenciaMueble[] {
    const resultado_aux: ReferenciaMueble[] = this.muebles.filter((mueble) =>
        mueble.Nombre.toLowerCase() === nombre.toLowerCase()
    );
    const strategy : OrdenarPor = this.getOrdenarPor(ordenamiento);
    return strategy.sort(resultado_aux);
  }


  /**
   * Método para buscar muebles por tipo y ordenarlos según el algoritmo especificado
   * @param tipo : string con el tipo del producto
   * @param ordenamiento : es un enum ALGORITHM_TYPE
   * @return array de RefereciaMueble ordenados con el algoritmo que se requiere
   */
  BusquarPorTipo(tipo: string, ordenamiento: ALGORITHM_TYPE): ReferenciaMueble[] {
    const resultado_aux: ReferenciaMueble[] = this.muebles.filter((mueble) => 
        mueble.Nombre.toLowerCase().includes(tipo.toLowerCase())
    );
    const strategy: OrdenarPor = this.getOrdenarPor(ordenamiento);
    return strategy.sort(resultado_aux);
  }

 

  /**
   * Método para buscar por descripción del mueble
   * @param descripcion : string con el descripcion 
   * @param ordenamiento : es un enum ALGORITHM_TYPE
   * @return array de RefereciaMueble ordenados con el algoritmo que se requiere
   */
  BuscarPorDescripcion(descripcion: string, ordenamiento: ALGORITHM_TYPE): ReferenciaMueble[] {
    const resultado_aux: ReferenciaMueble[] = this.muebles.filter((mueble) => 
      mueble.Descripción.toLowerCase().includes(descripcion.toLowerCase())
    );
    const strategy: OrdenarPor = this.getOrdenarPor(ordenamiento);
    return strategy.sort(resultado_aux);
  }

  PrintMuebles(imprimirmuebles: ReferenciaMueble[]): void {
    imprimirmuebles.forEach((mueble) => {
      console.log("ID Único:", mueble.IDUnico);
      console.log("Nombre:", mueble.Nombre);
      console.log("Descripción:", mueble.Descripción);
      console.log("Material:", mueble.Material);
      console.log("Dimensiones:", mueble.Dimensiones.getDescripcion());
      console.log("Precio:", mueble.Precio);
      console.log("-----------------------------");
    });
  
  }

  private getOrdenarPor(algorithm: ALGORITHM_TYPE): OrdenarPor {
    switch (algorithm) {
      case ALGORITHM_TYPE.ALFABETO:
        return new Alfabeticamente();
      case ALGORITHM_TYPE.PRECIO_ASCENDENTE:
        return new PrecioAscendente();
      case ALGORITHM_TYPE.PRECIO_DESCENDENTE:
        return new PrecioDescendente();
      default:
        throw new Error('No valid algorithm');
    }
  }
}

export interface ReferenciaProveedoresClientes  {
  IdUnico: number;
  Nombre: string;
  Contacto: string;
  Direccion: string;
}
export interface Metodos{
  BuscarNombre(): string;
  BuscarContacto(): string;
  BuscarDireccion(): string;
}

export class Proveedores implements ReferenciaProveedoresClientes, Metodos{
  constructor(public readonly IdUnico: number,public readonly Nombre: string, public readonly Contacto: string, public readonly Direccion: string){}
  BuscarNombre(): string {
      return this.Nombre;
  }
  BuscarContacto(): string {
    return this.Contacto;
  }
  BuscarDireccion(): string {
    return this.Direccion;
  }
}

export class Clientes implements ReferenciaProveedoresClientes, Metodos{
  constructor(public readonly IdUnico: number,public readonly Nombre: string, public readonly Contacto: string, public readonly Direccion: string){}
  BuscarNombre(): string {
      return this.Nombre;
  }
  BuscarContacto(): string {
    return this.Contacto;
  }
  BuscarDireccion(): string {
    return this.Direccion;
  }
}


/* export class Stock {
  private muebles: Muebles;
  private stock: Map<number, number>; // Mapa para mantener el stock de cada mueble (ID único => cantidad)

  constructor(muebles: Muebles) {
    this.muebles = muebles;
    this.stock = new Map();
    this.InicializarStock();
  }

  private InicializarStock() {
      // Inicializar el stock para cada mueble
      this.muebles.forEach((mueble: ReferenciaMueble) => {
          this.stock.set(mueble.IDUnico, 1); // Inicialmente, el stock es 0 para cada mueble
      });
  }

  // Método para actualizar el stock después de una venta
  ActualizarStockVenta(idMueble: number, cantidad: number) {
      const stockActual = this.stock.get(idMueble) || 0;
      if (stockActual >= cantidad) {
          this.stock.set(idMueble, stockActual - cantidad);
      } else {
          console.log('Error: No hay suficiente stock disponible.');
      }
  }

  // Métodos similares para actualizar el stock después de devoluciones, compras, etc.

  // Método para obtener la cantidad disponible de un mueble
  ObtenerStock(idMueble: number): number {
      return this.stock.get(idMueble) || 0;
  }

  // Otros métodos para generar informes sobre el stock
  printStock(): void {
    console.log("Contenido del stock");
    
  }
} */

export class Stock {
  private muebles: Muebles;
  private stock: Map<number, number>; // Mapa para mantener el stock de cada mueble (ID único => cantidad)

  constructor(muebles: Muebles) {
    this.muebles = muebles;
    this.stock = new Map();
    this.InicializarStock();
  }

  private InicializarStock() {
    // Inicializar el stock para cada mueble
    this.muebles.ObtenerMuebles().forEach((mueble: ReferenciaMueble) => {
        this.stock.set(mueble.IDUnico, 1); // Inicialmente, el stock es 0 para cada mueble
    });
}

  // Método para actualizar el stock después de una venta
  ActualizarStockVenta(idMueble: number, cantidad: number) {
    const stockActual = this.stock.get(idMueble) || 0;
    if (stockActual >= cantidad) {
      this.stock.set(idMueble, stockActual - cantidad);
    } else {
      console.log('Error: No hay suficiente stock disponible.');
    }
  }

  // Método para obtener la cantidad disponible de un mueble
  ObtenerStock(idMueble: number): number {
    return this.stock.get(idMueble) || 0;
  }

  // Método para imprimir el estado actual del stock
  ImprimirStock() {
    console.log("Estado actual del stock:");
    this.stock.forEach((cantidad, idMueble) => {
      const mueble = this.muebles.ObtenerMuebles().find((m) => m.IDUnico === idMueble);
      if (mueble) {
        console.log(`ID: ${idMueble}, Nombre: ${mueble.Nombre}, Stock: ${cantidad}`);
      }
    });
  }
}


const proveedorEjemplo = new Proveedores(1, "Proveedor Ejemplo", "info@proveedor.com", "Calle Ejemplo 123");

// Crear una instancia de Clientes
const clienteEjemplo = new Clientes(1, "Cliente Ejemplo", "cliente@example.com", "Calle Cliente 456");

// Llamar a los métodos y mostrar los resultados
console.log("Nombre del proveedor:", proveedorEjemplo.BuscarNombre());
console.log("Contacto del proveedor:", proveedorEjemplo.BuscarContacto());
console.log("Dirección del proveedor:", proveedorEjemplo.BuscarDireccion());

console.log("Nombre del cliente:", clienteEjemplo.BuscarNombre());
console.log("Contacto del cliente:", clienteEjemplo.BuscarContacto());
console.log("Dirección del cliente:", clienteEjemplo.BuscarDireccion());


// Crear muebles
const muebles: ReferenciaMueble[] = [
    { IDUnico: 1, Nombre: "Silla de madera", Descripción: "Silla de madera resistente", Material: "Madera", Dimensiones: new Dimensiones(50, 60, 40), Precio: 50 },
    { IDUnico: 2, Nombre: "Mesa de centro", Descripción: "Mesa de centro moderna", Material: "Madera y vidrio", Dimensiones: new Dimensiones(100, 50, 80), Precio: 120 },
    // Añade más muebles aquí...
];

// Instancia la clase Muebles con los muebles creados
const almacenMuebles = new Muebles(muebles);

const silla_plegable: ReferenciaMueble = {
  IDUnico: 3, // Elige un ID único apropiado para el nuevo mueble
  Nombre: "Silla plegable",
  Descripción: "Silla plegable para exteriores",
  Material: "Metal",
  Dimensiones: new Dimensiones(40, 80, 40),
  Precio: 30,
};

almacenMuebles.AyadirMueble(silla_plegable); // Añade la silla plegable al almacén de muebles

// Ejemplo de uso de los métodos para buscar y ordenar muebles
const mueblesOrdenadosPorNombre = almacenMuebles.BuscarPorNombre("Silla plegable", ALGORITHM_TYPE.ALFABETO);
console.log("Muebles ordenados por nombre:", almacenMuebles.PrintMuebles(mueblesOrdenadosPorNombre));

almacenMuebles.EliminarMueble(2); // Elimina la mesa de centro del almacén de muebles
const mueblesOrdenadosPorPrecioAsc = almacenMuebles.BusquarPorTipo("Mesa", ALGORITHM_TYPE.PRECIO_ASCENDENTE);
console.log("Muebles de tipo 'Mesa' ordenados por precio ascendente:", mueblesOrdenadosPorPrecioAsc);


const almacen = new Stock(almacenMuebles);
almacen.ActualizarStockVenta(1, 3);
almacen.ActualizarStockVenta(3,6);

almacen.ImprimirStock();

