import { ReferenciaProveedoresClientes, Metodos } from "./proveedor.js";

/**
 * @brief Clase para los clientes
 * @param clientes : array de ReferenciaProveedoresClientes
 * @metodo AddCliente
 * @metodo RemoveCliente
 * @metodo BuscarNombre
 * @metodo BuscarContacto
 * @metodo BuscarDireccion
 */
export class Clientes implements Metodos {
  constructor(private clientes: ReferenciaProveedoresClientes[]) {}
  /**
   * @brief Método para obtener todos los clientes
   * @return array de ReferenciaProveedoresClientes
   */
  ObtenerClientes(): ReferenciaProveedoresClientes[] {
    return this.clientes;
  }
  /**
   * @brief Método para añadir un cliente
   * @param cliente : ReferenciaProveedoresClientes
   */
  AddCliente(cliente: ReferenciaProveedoresClientes): void {
    this.clientes.push(cliente);
  }

  /**
   * @brief Método para eliminar un cliente
   * @param idUnico : número único para identificar el cliente
   */
  RemoveCliente(idUnico: number): void {
    this.clientes = this.clientes.filter(
      (cliente) => cliente.IdUnico !== idUnico,
    );
  }

  /**
   * @brief Método para buscar un cliente por nombre
   * @param nombre : string con el nombre del cliente
   * @return array de ReferenciaProveedoresClientes
   */
  BuscarNombre(nombre: string): ReferenciaProveedoresClientes[] {
    return this.clientes.filter(
      (cliente) => cliente.Nombre.toLowerCase() === nombre.toLowerCase(),
    );
  }

  /**
   * @brief Método para buscar un cliente por contacto
   * @param contacto : string con la información de contacto del cliente
   * @return array de ReferenciaProveedoresClientes
   */
  BuscarContacto(contacto: string): ReferenciaProveedoresClientes[] {
    return this.clientes.filter(
      (cliente) => cliente.Contacto.toLowerCase() === contacto.toLowerCase(),
    );
  }

  /**
   * @brief Método para buscar un cliente por dirección
   * @param direccion : string con la dirección del cliente
   * @return array de ReferenciaProveedoresClientes
   */
  BuscarDireccion(direccion: string): ReferenciaProveedoresClientes[] {
    return this.clientes.filter(
      (cliente) => cliente.Direccion.toLowerCase() === direccion.toLowerCase(),
    );
  }
}
