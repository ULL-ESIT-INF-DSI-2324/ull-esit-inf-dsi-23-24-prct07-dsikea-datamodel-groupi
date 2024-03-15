enum ALGORITHM_TYPE {Alfabeticamente, PrecioAscendente, PrecioDescendente};

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




export interface ReferenciaMueble {
  IDUnico: number,
  Nombre : string,
  Descripción : string,
  Material : string,
  Dimensiones : Dimensiones,
  Precio : number
}


/**
 * This is an example of context class where different algorithms are available
 */
class Solver {
  constructor(private data: number[], private algorithmType: ALGORITHM_TYPE) {
  }

  /**
   * Any type of algorithm that operates over data
   */
  firstAlgorithm() {
    console.log(`First algorithm applied to: ${this.data}`);
  }

  /**
   * Any type of algorithm that operates over data
   */
  secondAlgorithm() {
    console.log(`Second algorithm applied to: ${this.data}`);
  }

  /**
   * Any type of algorithm that operates over data
   */
  thirdAlgorithm() {
    console.log(`Third algorithm applied to: ${this.data}`);
  }

  logic() {
    switch (this.algorithmType) {
      case ALGORITHM_TYPE.P:
        this.firstAlgorithm();
        break;
      case ALGORITHM_TYPE.SECOND:
        this.secondAlgorithm();
        break;
      case ALGORITHM_TYPE.THIRD:
        this.thirdAlgorithm();
        break;
      default:
        throw new Error('No valid algorithm');
    }
  }
}

export class Muebles {
  constructor(private muebles : ReferenciaMueble[], private algorithmType: ALGORITHM_TYPE){}

  BuscarPorNombre (nombre: string) : ReferenciaMueble[] {
    const resultado : ReferenciaMueble[] = this.muebles.filter(item => item.Nombre === nombre);
    resultado.slice().sort()
    return resultado;
  }  

}


export abstract class ReferenciaProveedoresClientes  {
  constructor(private IdUnico: number, private Nombre: string, private Contacto: string, private Direccion: string) {
    // Aquí va el código que se ejecutará cuando se crea una instancia
  }
  IdUnico: number;
  Nombre: string;
  Contacto: string;
  Direccion: string;
}

export class ProveedoresClientes implements ReferenciaProveedoresClientes{
  constructor(private IdUnico: number, private Nombre: string, private Contacto: string, private Direccion: string){}
  
}
/*   addItem(newItem: T): void;
  getItem(index: number): T;
  removeItem(index: number): T;
  getNumberOfItems(): number;
} */

/* 
Buscando por su nombre.
Buscando por su contacto.
Buscando por su dirección. */