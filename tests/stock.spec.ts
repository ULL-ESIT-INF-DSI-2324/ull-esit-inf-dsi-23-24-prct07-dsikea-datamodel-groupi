import "mocha";
import { expect } from "chai";

import { Stock, MuebleStock } from "../src/stock.js";

describe("Stock", () => {
  const MuebleStocks: MuebleStock[] = [
    { IDUnico: 6364, Nombre: "Mesa", StockInicial: 10 },
    { IDUnico: 42347, Nombre: "Silla", StockInicial: 20 },
  ];
  const stock = new Stock(MuebleStocks);

  it("Test  1 - agregarMueble() return tamaño del contenido:1 Mesa 5 ", () => {
    const stock = new Stock([]);
    const nombreMueble = "Mesa";
    const cantidadMuebles = 5;
    stock.agregarMueble(1, nombreMueble, cantidadMuebles);
    expect(stock.MuebleStocks.length).to.equal(1);
    const muebleAgregado = stock.MuebleStocks[0];
    expect(muebleAgregado.Nombre).to.equal(nombreMueble);
    expect(muebleAgregado.StockInicial).to.equal(cantidadMuebles);
  });

  it("Test  2- eliminarMueble() return tamaño del contenido: 0", () => {
    const mueblesIniciales = [{ IDUnico: 1, Nombre: "Mesa", StockInicial: 10 }];
    const stock = new Stock(mueblesIniciales);
    const nombreMuebleAEliminar = "Mesa";
    stock.eliminarMueble(nombreMuebleAEliminar);
    expect(stock.MuebleStocks.length).to.equal(0);
  });

  it("Test  3 - registrarVenta() return tamaño del contenido: 1, venta,cantidad: 3, importe: 150, nombre cliente : Juan Sebastian Hernandez", () => {
    const stock = new Stock([]);
    const nombreCliente = "Juan Sebastian Hernandez";
    const nombreMueble = "Mesa";
    const cantidad = 3;
    const importe = 150;
    stock.registrarVenta(nombreCliente, nombreMueble, cantidad, importe);
    expect(stock.transacciones.length).to.equal(1);
    const transaccionRegistrada = stock.transacciones[0];
    expect(transaccionRegistrada.tipo).to.equal("venta");
    expect(transaccionRegistrada.MuebleStock).to.equal("Mesa");
    expect(transaccionRegistrada.cantidad).to.equal(3);
    expect(transaccionRegistrada.importe).to.equal(150);
    expect(transaccionRegistrada.cliente).to.equal("Juan Sebastian Hernandez");
  });

  it("Test 4 - obtenerStockMueble() return 10", () => {
    const mueblesIniciales = [{ IDUnico: 1, Nombre: "Mesa", StockInicial: 10 }];
    const stock = new Stock(mueblesIniciales);
    const stockActual = stock.obtenerStockMueble("Mesa");
    expect(stockActual).to.equal(10);
  });

  it("Test 5 - registrarVenta() return ", () => {
    stock.registrarVenta("Cliente1", "Mesa", 1, 100);
    expect(stock.transacciones.length).to.equal(1);
    expect(stock.transacciones[0].tipo).to.equal("venta");
  });

  it("Test 6 - ", () => {
    stock.registrarCompra("Proveedor1", "Silla", 2, 50);
    expect(stock.transacciones.length).to.equal(2);
    expect(stock.transacciones[1].tipo).to.equal("compra");
  });

  it("Test 7 - ", () => {
    const stockMesa = stock.obtenerStockMueble("Mesa");
    const stockSilla = stock.obtenerStockMueble("Silla");
    expect(stockMesa).to.equal(9);
    expect(stockSilla).to.equal(21);
  });

  it("Test 8 - ", () => {
    const informeVentas = stock.obtenerInformeVentasMueble(
      "Mesa",
      new Date("2024-01-01"),
      new Date(),
    );
    expect(informeVentas.length).to.equal(1);
    expect(informeVentas[0].tipo).to.equal("venta");
  });

  it("Test 9 -", () => {
    const informeGastos = stock.obtenerInformeGastosProveedor(
      "Proveedor1",
      new Date("2024-01-01"),
      new Date(),
    );
    expect(informeGastos.length).to.equal(1);
    expect(informeGastos[0].tipo).to.equal("compra");
  });
});
