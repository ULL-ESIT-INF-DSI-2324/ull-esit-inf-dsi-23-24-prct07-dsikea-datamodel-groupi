export interface MuebleStock {
    Nombre: string;
    StockInicial: number;
}

export interface Transaccion {
    tipo: string;
    fecha: Date;
    MuebleStock: string;
    cantidad: number;
    importe: number;
    cliente?: string;
    proveedor?: string;
}

export class Stock {
    MuebleStocks: MuebleStock[];
    transacciones: Transaccion[];

    constructor(MuebleStocks: MuebleStock[]) {
        this.MuebleStocks = MuebleStocks;
        this.transacciones = [];
    }

    agregarTransaccion(transaccion: Transaccion) {
        this.transacciones.push(transaccion);
    }

    obtenerStockMueble(nombreMuebleStock: string): number {
        const MuebleStock = this.MuebleStocks.find(m => m.Nombre === nombreMuebleStock);
        if (MuebleStock) {
            const ventas = this.transacciones.filter(t => t.tipo === 'venta' && t.MuebleStock === nombreMuebleStock).length;
            const compras = this.transacciones.filter(t => t.tipo === 'compra' && t.MuebleStock === nombreMuebleStock).length;
            return MuebleStock.StockInicial - ventas + compras;
        }
        return 0;
    }

    registrarVenta(nombreCliente: string, MuebleStock: string, cantidad: number, importe: number) {
        const fecha = new Date();
        this.agregarTransaccion({ tipo: 'venta', fecha, MuebleStock, cantidad, importe, cliente: nombreCliente });
    }

    registrarCompra(nombreProveedor: string, MuebleStock: string, cantidad: number, importe: number) {
        const fecha = new Date();
        this.agregarTransaccion({ tipo: 'compra', fecha, MuebleStock, cantidad, importe, proveedor: nombreProveedor });
    }

    obtenerInformeVentasMueble(nombreMuebleStock: string, fechaInicio: Date, fechaFin: Date): Transaccion[] {
        const ventas = this.transacciones.filter(t =>
            t.tipo === 'venta' &&
            t.MuebleStock === nombreMuebleStock &&
            t.fecha >= fechaInicio &&
            t.fecha <= fechaFin
        );
        return ventas;
    }

    obtenerInformeGastosProveedor(nombreProveedor: string, fechaInicio: Date, fechaFin: Date): Transaccion[] {
        const compras = this.transacciones.filter(t =>
            t.tipo === 'compra' &&
            t.proveedor === nombreProveedor &&
            t.fecha >= fechaInicio &&
            t.fecha <= fechaFin
        );
        return compras;
    }
}
  