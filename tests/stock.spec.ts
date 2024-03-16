
  // Ejemplo de uso:
  const MuebleStocks = [
    { Nombre: 'Mesa', StockInicial: 10 },
    { Nombre: 'Silla', StockInicial: 20 }
  ];
  const stock = new Stock(MuebleStocks);
  
  // Registrar una venta
  stock.registrarVenta('Cliente1', 'Mesa', 1, 100);
  
  // Registrar una compra
  stock.registrarCompra('Proveedor1', 'Silla', 2, 50);
  
  // Obtener el stock disponible de un MuebleStock
  console.log(stock.obtenerStockMueble('Mesa'));
  
  // Obtener un informe de ventas por MuebleStock y período de tiempo
  const informeVentas = stock.obtenerInformeVentasMueble('Mesa', new Date('2024-01-01'), new Date());
  console.log(informeVentas);
  
  // Obtener un informe de gastos por proveedor y período de tiempo
  const informeGastos = stock.obtenerInformeGastosProveedor('Proveedor1', new Date('2024-01-01'), new Date());
  console.log(informeGastos);
  