/**
 * @brief Interfaz para la referencia de un proveedor o cliente
 * @param IdUnico : número único para identificar el proveedor o cliente
 * @param Nombre : nombre del proveedor o cliente
 * @param Contacto : información de contacto del proveedor o cliente
 * @param Direccion : dirección del proveedor o cliente
 */
export interface ReferenciaProveedoresClientes {
  IdUnico: number;
  Nombre: string;
  Contacto: string;
  Direccion: string;
}

/**
 * @brief Interfaz para los métodos de búsqueda de un proveedor o cliente
 */
export interface Metodos {
  BuscarNombre(nombre: string): ReferenciaProveedoresClientes[];
  BuscarContacto(contacto: string): ReferenciaProveedoresClientes[];
  BuscarDireccion(direccion: string): ReferenciaProveedoresClientes[];
}

/**
 * @brief Clase para los proveedores
 * @param proveedores : array de ReferenciaProveedoresClientes
 * @metodo AddProveedor
 * @metodo RemoveProveedor
 * @metodo BuscarNombre
 * @metodo BuscarContacto
 * @metodo BuscarDireccion
 */
export class Proveedores implements Metodos {
  constructor(private proveedores: ReferenciaProveedoresClientes[]) {}

  /**
   * @brief Método para obtener todos los proveedores
   * @return Array de ReferenciaProveedoresClientes
   */
  ObtenerProveedores(): ReferenciaProveedoresClientes[] {
    return this.proveedores;
  }
  /**
   * @brief Método para añadir un proveedor
   * @param proveedor : ReferenciaProveedoresClientes
   */
  AddProveedor(proveedor: ReferenciaProveedoresClientes): void {
    this.proveedores.push(proveedor);
  }

  /**
   * @brief Método para eliminar un proveedor
   * @param idUnico : número único para identificar el proveedor
   */
  RemoveProveedor(idUnico: number): void {
    this.proveedores = this.proveedores.filter(
      (proveedor) => proveedor.IdUnico !== idUnico,
    );
  }

  /**
   * @brief Método para buscar un proveedor por nombre
   * @param nombre : string con el nombre del proveedor
   * @return array de ReferenciaProveedoresClientes
   */
  BuscarNombre(nombre: string): ReferenciaProveedoresClientes[] {
    return this.proveedores.filter(
      (proveedor) => proveedor.Nombre.toLowerCase() === nombre.toLowerCase(),
    );
  }

  /**
   * @brief Método para buscar un proveedor por contacto
   * @param contacto : string con la información de contacto del proveedor
   * @return array de ReferenciaProveedoresClientes
   */
  BuscarContacto(contacto: string): ReferenciaProveedoresClientes[] {
    return this.proveedores.filter(
      (proveedor) =>
        proveedor.Contacto.toLowerCase() === contacto.toLowerCase(),
    );
  }

  /**
   * @brief Método para buscar un proveedor por dirección
   * @param direccion : string con la dirección del proveedor
   * @return array de ReferenciaProveedoresClientes
   */
  BuscarDireccion(direccion: string): ReferenciaProveedoresClientes[] {
    return this.proveedores.filter(
      (proveedor) =>
        proveedor.Direccion.toLowerCase() === direccion.toLowerCase(),
    );
  }
}
