/**
 * @brief Dimensiones de un mueble
 * @param ancho : ancho del mueble en cm
 * @param alto : alto del mueble en cm
 * @param fondo : fondo del mueble en cm
 */
export class Dimensiones {
  constructor(
    private ancho: number,
    private alto: number,
    private fondo: number,
  ) {}

  /**
   * @brief Método para obtener el ancho del mueble
   * @returns ancho del mueble
   */
  getAncho(): number {
    return this.ancho;
  }

  /**
   * @brief Método para obtener el alto del mueble
   * @returns alto del mueble
   */
  getAlto(): number {
    return this.alto;
  }

  /**
   * @brief Método para obtener el fondo del mueble
   * @returns fondo del mueble
   */
  getFondo(): number {
    return this.fondo;
  }

  /**
   * @brief Método para obtener la descripción de las dimensiones del mueble
   * @returns string con las dimensiones del mueble
   */
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
  IDUnico: number;
  Nombre: string;
  Descripción: string;
  Material: string;
  Dimensiones: Dimensiones;
  Precio: number;
}

/**
 * @brief Enum para los algoritmos de ordenamiento
 */
export enum ALGORITHM_TYPE {
  ALFABETO,
  PRECIO_ASCENDENTE,
  PRECIO_DESCENDENTE,
}

/**
 * @brief Interfaz para ordenar los muebles
 */
interface OrdenarPor {
  sort(muebles: ReferenciaMueble[]): ReferenciaMueble[];
}

/**
 * @brief Clase para ordenar los muebles alfabéticamente
 */
class Alfabeticamente implements OrdenarPor {
  sort(muebles: ReferenciaMueble[]): ReferenciaMueble[] {
    return muebles.slice().sort((a, b) => a.Nombre.localeCompare(b.Nombre));
  }
}

/**
 * @brief Clase para ordenar los muebles por precio ascendente
 */
class PrecioAscendente implements OrdenarPor {
  sort(muebles: ReferenciaMueble[]): ReferenciaMueble[] {
    return muebles.slice().sort((a, b) => a.Precio - b.Precio);
  }
}

/**
 * @brief Clase para ordenar los muebles por precio descendente
 */
class PrecioDescendente implements OrdenarPor {
  sort(muebles: ReferenciaMueble[]): ReferenciaMueble[] {
    return muebles.slice().sort((a, b) => b.Precio - a.Precio);
  }
}

/**
 * @brief Class Mueble que contiene un array de Referencia Mueble
 * @metodo ObtenerMuebles
 */
export class Muebles {
  constructor(private muebles: ReferenciaMueble[]) {}

  /**
   * @brief Método para obtener los muebles
   */
  ObtenerMuebles(): ReferenciaMueble[] {
    return this.muebles;
  }

  /**
   * @brief Añadir un mueble nuevo
   */
  AddMueble(mueble_nuevo: ReferenciaMueble): void {
    this.muebles.push(mueble_nuevo);
  }

  /**
   * @brief Eliminar un mueble
   */
  EliminarMueble(id_unico: number): void {
    this.muebles = this.muebles.filter((mueble) => mueble.IDUnico !== id_unico);
  }
  /**
   * @brief Método para buscar muebles por nombre exacto y ordenarlos según lo requerido
   * @param nombre : string con el nombre del producto
   * @param ordenamiento : es un enum ALGORITHM_TYPE
   * @return array de RefereciaMueble ordenados con el algoritmo que se requiere
   */
  BuscarPorNombre(
    nombre: string,
    ordenamiento: ALGORITHM_TYPE,
  ): ReferenciaMueble[] {
    const resultado_aux: ReferenciaMueble[] = this.muebles.filter(
      (mueble) => mueble.Nombre.toLowerCase() === nombre.toLowerCase(),
    );
    const strategy: OrdenarPor = this.getOrdenarPor(ordenamiento);
    return strategy.sort(resultado_aux);
  }

  /**
   * @brief Método para buscar muebles por tipo y ordenarlos según el algoritmo especificado
   * @param tipo : string con el tipo del producto
   * @param ordenamiento : es un enum ALGORITHM_TYPE
   * @return array de RefereciaMueble ordenados con el algoritmo que se requiere
   */
  BusquarPorTipo(
    tipo: string,
    ordenamiento: ALGORITHM_TYPE,
  ): ReferenciaMueble[] {
    const resultado_aux: ReferenciaMueble[] = this.muebles.filter((mueble) =>
      mueble.Nombre.toLowerCase().includes(tipo.toLowerCase()),
    );
    const strategy: OrdenarPor = this.getOrdenarPor(ordenamiento);
    return strategy.sort(resultado_aux);
  }

  /**
   * @brief Método para buscar por descripción del mueble
   * @param descripcion : string con el descripcion
   * @param ordenamiento : es un enum ALGORITHM_TYPE
   * @return array de RefereciaMueble ordenados con el algoritmo que se requiere
   */
  BuscarPorDescripcion(
    descripcion: string,
    ordenamiento: ALGORITHM_TYPE,
  ): ReferenciaMueble[] {
    const resultado_aux: ReferenciaMueble[] = this.muebles.filter((mueble) =>
      mueble.Descripción.toLowerCase().includes(descripcion.toLowerCase()),
    );
    const strategy: OrdenarPor = this.getOrdenarPor(ordenamiento);
    return strategy.sort(resultado_aux);
  }

  /**
   * @brief Método que imprime los muebles
   * @param imprimirmuebles : array de ReferenciaMueble
   *
   */
  PrintMuebles(imprimirmuebles: ReferenciaMueble[]): string {
    let resultado: string = "";
    imprimirmuebles.forEach((mueble) => {
      resultado += `ID Único: ${mueble.IDUnico}\n`;
      resultado += `Nombre: ${mueble.Nombre}\n`;
      resultado += `Descripción: ${mueble.Descripción}\n`;
      resultado += `Material: ${mueble.Material}\n`;
      resultado += `Dimensiones: ${mueble.Dimensiones.getDescripcion()}\n`;
      resultado += `Precio: ${mueble.Precio}\n`;
      resultado += "-----------------------------\n";
    });
    return resultado;

    /*
      imprimirmuebles.forEach((mueble) => {
        console.log("ID Único:", mueble.IDUnico);
        console.log("Nombre:", mueble.Nombre);
        console.log("Descripción:", mueble.Descripción);
        console.log("Material:", mueble.Material);
        console.log("Dimensiones:", mueble.Dimensiones.getDescripcion());
        console.log("Precio:", mueble.Precio);
        console.log("-----------------------------");
      });
      */
  }

  /**
   * @brief Método para obtener el algoritmo de ordenamiento
   * @param algorithm : es un enum ALGORITHM_TYPE
   * @return OrdenarPor
   */
  private getOrdenarPor(algorithm: ALGORITHM_TYPE): OrdenarPor {
    switch (algorithm) {
      case ALGORITHM_TYPE.ALFABETO:
        return new Alfabeticamente();
      case ALGORITHM_TYPE.PRECIO_ASCENDENTE:
        return new PrecioAscendente();
      case ALGORITHM_TYPE.PRECIO_DESCENDENTE:
        return new PrecioDescendente();
      default:
        throw new Error("No valid algorithm");
    }
  }
}
