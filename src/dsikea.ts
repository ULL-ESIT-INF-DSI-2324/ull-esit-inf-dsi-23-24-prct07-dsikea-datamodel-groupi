
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


enum ALGORITHM_TYPE {ALFABETO, PRECIOASCENDETE, PRECIODESCENDENTE};

/**
 * This is an example of context class where different algorithms are available
 */
class Solver extends Muebles {
  constructor(private Muebles: ReferenciaMueble[], private algorithmType: ALGORITHM_TYPE) {
    
  }


  
  Alfabeticamente() : ReferenciaMueble[] {
    return this.Muebles.slice().sort();
  }

 
  PrecioAscendente() : ReferenciaMueble[] {
    return this.Muebles.slice().sort();
  }


  
  PrecioDescendente() {
    return this.Muebles.slice().sort();
  }

  logic() {
    switch (this.algorithmType) {
      case ALGORITHM_TYPE.ALFABETO:
        this.Alfabeticamente();
        break;
      case ALGORITHM_TYPE.PRECIOASCENDETE:
        this.PrecioAscendente();
        break;
      case ALGORITHM_TYPE.PRECIODESCENDENTE:
        this.PrecioDescendente();
        break;
      default:
        throw new Error('No valid algorithm');
    }
  }
}


export class Muebles{
  constructor(private muebles : ReferenciaMueble[]){}

  BuscarPorNombre (nombre: string, algorithm :ALGORITHM_TYPE.ALFABETO) : ReferenciaMueble[] {
    const resultado_aux : ReferenciaMueble[] = this.muebles.filter(item => item.Nombre === nombre);
    const resolver =  new Solver(resultado_aux, algorithm);
    resolver.logic();

    return resolver;
  }  




}


export interface ReferenciaProveedoresClientes  {
  IdUnico: number;
  Nombre: string;
  Contacto: string;
  Direccion: string;
}
export interfc

export class ProveedoresClientes implements ReferenciaProveedoresClientes{
  constructor(public readonly IdUnico: number,public readonly Nombre: string, public readonly Contacto: string, public readonly Direccion: string){}

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