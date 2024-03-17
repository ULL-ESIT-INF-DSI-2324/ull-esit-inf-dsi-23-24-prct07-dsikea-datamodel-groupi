/**
 *  Clase Stock que contiene un array de MuebleStock
 * @metodo registrarVenta
 * @metodo registrarCompra
 * @metodo obtenerInformeVentasMueble
 * @metodo obtenerInformeGastosProveedor
 * @metodo obtenerStockMueble
 * @metodo agregarTransaccion
 * @metodo obtenerStockMueble
 * @param MuebleStocks : array de MuebleStock
 */
export interface MuebleStock {
  IDUnico: number;
  Nombre: string;
  StockInicial: number;
}
/**
 * @brief Interfaz para las transacciones
 * @param tipo : string con el tipo de transacción
 * @param fecha : fecha de la transacción
 * @param MuebleStock : string con el nombre del mueble
 * @param cantidad : número con la cantidad de muebles
 * @param importe : número con el importe de la transacción
 * @param cliente : string con el nombre del cliente
 * @param proveedor : string con el nombre del proveedor
 */
export interface Transaccion {
  tipo: string;
  fecha: Date;
  MuebleStock: string;
  cantidad: number;
  importe: number;
  cliente?: string;
  proveedor?: string;
}
/**
 * @brief Clase Stock que contiene un array de MuebleStock
 * @param MuebleStocks : array de MuebleStock
 */
export class Stock {
  MuebleStocks: MuebleStock[];
  transacciones: Transaccion[];

  constructor(MuebleStocks: MuebleStock[]) {
    this.MuebleStocks = MuebleStocks;
    this.transacciones = [];
  }

  /**
   * @brief Método para agregar un mueble al stock
   * @param nombre : Nombre del mueble
   * @param cantidad : Cantidad de muebles a agregar
   * @returns void
   */
  agregarMueble(id_unico: number, nombre: string, cantidad: number): void {
    this.MuebleStocks.push({
      IDUnico: id_unico,
      Nombre: nombre,
      StockInicial: cantidad,
    });
  }

  /**
   * @brief Método para eliminar un mueble del stock
   * @param nombre : Nombre del mueble a eliminar
   * @returns void
   */
  eliminarMueble(nombre: string): void {
    this.MuebleStocks = this.MuebleStocks.filter((m) => m.Nombre !== nombre);
  }

  /**
   * @brief Método para agregar una transacción
   * @param transaccion : Transaccion
   * @return void
   */
  agregarTransaccion(transaccion: Transaccion) {
    this.transacciones.push(transaccion);
  }
  /**
   * @brief Método para obtener el stock de un mueble
   * @param nombreMuebleStock
   * @returns
   */
  obtenerStockMueble(nombreMuebleStock: string): number {
    const MuebleStock = this.MuebleStocks.find(
      (m) => m.Nombre === nombreMuebleStock,
    );
    if (MuebleStock) {
      const ventas = this.transacciones.filter(
        (t) => t.tipo === "venta" && t.MuebleStock === nombreMuebleStock,
      ).length;
      const compras = this.transacciones.filter(
        (t) => t.tipo === "compra" && t.MuebleStock === nombreMuebleStock,
      ).length;
      return MuebleStock.StockInicial - ventas + compras;
    }
    return 0;
  }
  /**
   * @brief Método para registrar una venta
   * @param nombreCliente
   * @param MuebleStock
   * @param cantidad
   * @param importe
   */
  registrarVenta(
    nombreCliente: string,
    MuebleStock: string,
    cantidad: number,
    importe: number,
  ) {
    const fecha = new Date();

    this.agregarTransaccion({
      tipo: "venta",
      fecha,
      MuebleStock,
      cantidad,
      importe,
      cliente: nombreCliente,
    });
  }
  /**
   * @brief Método para registrar una compra
   * @param nombreProveedor
   * @param MuebleStock
   * @param cantidad
   * @param importe
   */
  registrarCompra(
    nombreProveedor: string,
    MuebleStock: string,
    cantidad: number,
    importe: number,
  ) {
    const fecha = new Date();

    this.agregarTransaccion({
      tipo: "compra",
      fecha,
      MuebleStock,
      cantidad,
      importe,
      proveedor: nombreProveedor,
    });
  }
  /**
   * @brief Método para obtener el informe de ventas de un mueble
   * @param nombreMuebleStock
   * @param fechaInicio
   * @param fechaFin
   * @returns
   */
  obtenerInformeVentasMueble(
    nombreMuebleStock: string,
    fechaInicio: Date,
    fechaFin: Date,
  ): Transaccion[] {
    const ventas = this.transacciones.filter(
      (t) =>
        t.tipo === "venta" &&
        t.MuebleStock === nombreMuebleStock &&
        t.fecha >= fechaInicio &&
        t.fecha <= fechaFin,
    );
    return ventas;
  }
  /**
   * @brief Método para obtener el informe de gastos de un proveedor
   * @param nombreProveedor
   * @param fechaInicio
   * @param fechaFin
   * @returns
   */
  obtenerInformeGastosProveedor(
    nombreProveedor: string,
    fechaInicio: Date,
    fechaFin: Date,
  ): Transaccion[] {
    const compras = this.transacciones.filter(
      (t) =>
        t.tipo === "compra" &&
        t.proveedor === nombreProveedor &&
        t.fecha >= fechaInicio &&
        t.fecha <= fechaFin,
    );
    return compras;
  }
}
