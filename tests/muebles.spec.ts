import "mocha";
import { expect } from "chai";

import {
  Dimensiones,
  ReferenciaMueble,
  Muebles,
  ALGORITHM_TYPE,
  Alfabeticamente,
  PrecioAscendente,
  PrecioDescendente,
} from "../src/mueble.js";

// datos de prueba
const mueble1: ReferenciaMueble = {
  IDUnico: 1,
  Nombre: "Armario empotrado",
  Descripción: "Almario emportrado de colores gris, blanco , morado",
  Material: "madera",
  Dimensiones: new Dimensiones(160, 200, 60),
  Precio: 120,
};

const mueble3: ReferenciaMueble = {
  IDUnico: 487382,
  Nombre: "Sofá cherlon",
  Descripción: "Sofá cherlon grande en forma de L, con asientos desplegable",
  Material: "Tela poliestileno",
  Dimensiones: new Dimensiones(200, 110, 300),
  Precio: 300,
};

const mueblesInciales: ReferenciaMueble[] = [
  {
    IDUnico: 6547654,
    Nombre: "Sofá cherlon",
    Descripción:
      "Sofá cherlon para salones de estar pequeño diseño elegante en forma de manta de croche",
    Material: "lana",
    Dimensiones: new Dimensiones(30, 40, 100),
    Precio: 300,
  },
  {
    IDUnico: 4237498274,
    Nombre: "Sofá patron",
    Descripción:
      "Sofá cherlon para salones de estar pequeño diseño elegante en forma de manta de croche",
    Material: "tela poliestireno",
    Dimensiones: new Dimensiones(30, 40, 100),
    Precio: 350,
  },
];

const muebles: Muebles = new Muebles(mueblesInciales);

describe("Dimensiones", () => {
  const dimensiones = new Dimensiones(100, 150, 80);

  it("Test 1 - getAncho() return 100 ", () => {
    expect(dimensiones.getAncho()).to.equal(100);
  });

  it("Test 2 - getAlto() return 150", () => {
    expect(dimensiones.getAlto()).to.equal(150);
  });

  it("Test 3 - getFondo() return 80", () => {
    expect(dimensiones.getFondo()).to.equal(80);
  });

  it("Test 4 - getDescripcion() return Ancho: 100cm , Alto: 150cm , Fondo: 80cm", () => {
    const descripcionEsperada = "Ancho: 100cm , Alto: 150cm , Fondo: 80cm ";
    expect(dimensiones.getDescripcion()).to.equal(descripcionEsperada);
  });
});

describe("Alfabeticamente", () => {
  const alfabeticamente = new Alfabeticamente();

  it("Test 5 - sort() return [Sofá cherlon, Sofá patron]", () => {
    const mueblesOrdenados = alfabeticamente.sort(muebles.ObtenerMuebles());
    const nombresOrdenados = mueblesOrdenados.map((mueble) => mueble.Nombre);
    expect(nombresOrdenados).to.deep.equal(["Sofá cherlon", "Sofá patron"]);
  });

  it("Test 6 - sort() return [Sofá patron, Sofá cherlon]", () => {
    muebles.AddMueble(mueble1);
    const mueblesOrdenados = alfabeticamente.sort(muebles.ObtenerMuebles());
    const nombresOrdenados = mueblesOrdenados.map((mueble) => mueble.Nombre);
    expect(nombresOrdenados).to.deep.equal([
      "Armario empotrado",
      "Sofá cherlon",
      "Sofá patron",
    ]);
  });
});

describe("PrecioAscendente", () => {
  const precioAscendente = new PrecioAscendente();

  it("Test 7 - sort() return [120,300, 350]", () => {
    const mueblesOrdenados = precioAscendente.sort(muebles.ObtenerMuebles());
    const preciosOrdenados = mueblesOrdenados.map((mueble) => mueble.Precio);
    expect(preciosOrdenados).to.deep.equal([120, 300, 350]);
  });
});

describe("PrecioDescendente", () => {
  const precioDescendente = new PrecioDescendente();

  it("Test 8 - sort() return [350, 300,120] ", () => {
    const mueblesOrdenados = precioDescendente.sort(muebles.ObtenerMuebles());
    const preciosOrdenados = mueblesOrdenados.map((mueble) => mueble.Precio);
    expect(preciosOrdenados).to.deep.equal([350, 300, 120]);
  });
});

describe("Muebles", () => {
  it("Test 9 - ObtenerMuebles() return 3", () => {
    const resultado = muebles.ObtenerMuebles();
    expect(resultado).to.have.lengthOf(3);
  });

  it("Test 10 - AddMueble() return 4", () => {
    muebles.AddMueble(mueble3);
    const resultado = muebles.ObtenerMuebles();
    expect(resultado).to.have.lengthOf(4);
  });

  it("Test 11 - EliminarMueble() return no existe silla", () => {
    muebles.EliminarMueble(2); // Eliminamos el segundo mueble (Silla)
    const resultado = muebles.ObtenerMuebles();
    expect(resultado).to.have.lengthOf(4);
    expect(resultado.find((mueble) => mueble.Nombre === "Silla")).to.be
      .undefined;
  });

  it("Test 12 - BuscarPorNombre() return ", () => {
    const resultado = muebles.BuscarPorNombre(
      "Sofá cherlon",
      ALGORITHM_TYPE.ALFABETO,
    );
    expect(resultado).to.have.lengthOf(2);
    expect(resultado[0].Nombre).to.be.equal("Sofá cherlon");
  });

  it("Test 13 - BuscarPorTipo() return no hay mueble que sea Cama ", () => {
    const resultado = muebles.BuscarPorTipo(
      "Cama",
      ALGORITHM_TYPE.PRECIO_DESCENDENTE,
    );
    expect(resultado).to.have.lengthOf(0);
  });

  it("Test 14 - BuscarPorDescripcion() return no existe escritorio", () => {
    const resultado = muebles.BuscarPorDescripcion(
      "Sofá cherlon para salones de estar pequeño diseño elegante en forma de manta de croche",
      ALGORITHM_TYPE.ALFABETO,
    );
    expect(resultado).to.have.lengthOf(2);
    expect(resultado[0].Nombre).to.be.equal("Sofá cherlon");
  });

  it("PrintMuebles() debería devolver una cadena con la información de los muebles", () => {
    const mueblesInfo = muebles.PrintMuebles(muebles.ObtenerMuebles());
    const final_esperado =
      "ID Único: 6547654\nNombre: Sofá cherlon\nDescripción: Sofá cherlon para salones de estar pequeño diseño elegante en forma de manta de croche\nMaterial: lana\nDimensiones: Ancho: 30cm , Alto: 40cm , Fondo: 100cm \nPrecio: 300\n-----------------------------\nID Único: 4237498274\nNombre: Sofá patron\nDescripción: Sofá cherlon para salones de estar pequeño diseño elegante en forma de manta de croche\nMaterial: tela poliestireno\nDimensiones: Ancho: 30cm , Alto: 40cm , Fondo: 100cm \nPrecio: 350\n-----------------------------\nID Único: 487382\nNombre: Sofá cherlon\nDescripción: Sofá cherlon grande en forma de L, con asientos desplegable\nMaterial: Tela poliestileno\nDimensiones: Ancho: 200cm , Alto: 110cm , Fondo: 300cm \nPrecio: 300\n-----------------------------\n";
    expect(mueblesInfo).to.be.equal(final_esperado);
  });
});
