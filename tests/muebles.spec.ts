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
} from "../src/mueble";

// datos de prueba
const mueble1: ReferenciaMueble = {
  IDUnico: 1,
  Nombre: "Armario empotrado",
  Descripción: "Almario emportrado de colores gris, blanco , morado",
  Material: "madera",
  Dimensiones: new Dimensiones(160, 200, 60),
  Precio: 120,
};

const mueble2: ReferenciaMueble = {
  IDUnico: 754845,
  Nombre: " Mesilla de noche",
  Descripción: "Mesilla de cristal de base de madera para el dormitorio",
  Material: "Cristal, madera",
  Dimensiones: new Dimensiones(60, 80, 50),
  Precio: 50,
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
    Nombre: "Sofá pa",
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

  it("getAncho() debería devolver el ancho del mueble", () => {
    expect(dimensiones.getAncho()).to.equal(100);
  });

  it("getAlto() debería devolver el alto del mueble", () => {
    expect(dimensiones.getAlto()).to.equal(150);
  });

  it("getFondo() debería devolver el fondo del mueble", () => {
    expect(dimensiones.getFondo()).to.equal(80);
  });

  it("getDescripcion() debería devolver la descripción de las dimensiones del mueble", () => {
    const descripcionEsperada = "Ancho: 100cm , Alto: 150cm , Fondo: 80cm";
    expect(dimensiones.getDescripcion()).to.equal(descripcionEsperada);
  });
});

describe("Alfabeticamente", () => {
  const alfabeticamente = new Alfabeticamente();

  it("sort() debería ordenar alfabéticamente los muebles por nombre", () => {
    const mueblesOrdenados = alfabeticamente.sort(muebles.ObtenerMuebles());
    const nombresOrdenados = mueblesOrdenados.map((mueble) => mueble.Nombre);
    expect(nombresOrdenados).to.deep.equal(["Sofá cherlon", "Sofá pa"]);
  });
});

describe("PrecioAscendente", () => {
  const precioAscendente = new PrecioAscendente();

  it("sort() debería ordenar los muebles por precio de forma ascendente", () => {
    const mueblesOrdenados = precioAscendente.sort(muebles.ObtenerMuebles());
    const preciosOrdenados = mueblesOrdenados.map((mueble) => mueble.Precio);
    expect(preciosOrdenados).to.deep.equal([300, 350]);
  });
});

describe("PrecioDescendente", () => {
  const precioDescendente = new PrecioDescendente();

  it("sort() debería ordenar los muebles por precio de forma descendente", () => {
    const mueblesOrdenados = precioDescendente.sort(muebles.ObtenerMuebles());
    const preciosOrdenados = mueblesOrdenados.map((mueble) => mueble.Precio);
    expect(preciosOrdenados).to.deep.equal([350, 300]);
  });
});

describe("Muebles", () => {
  it("ObtenerMuebles() debería devolver el array de muebles", () => {
    const resultado = muebles.ObtenerMuebles();
    expect(resultado).to.have.lengthOf(3);
  });

  it("AddMueble() debería agregar un nuevo mueble al array", () => {
    muebles.AddMueble(mueble3);
    const resultado = muebles.ObtenerMuebles();
    expect(resultado).to.have.lengthOf(4);
  });

  it("EliminarMueble() debería eliminar un mueble del array", () => {
    muebles.EliminarMueble(2); // Eliminamos el segundo mueble (Silla)
    const resultado = muebles.ObtenerMuebles();
    expect(resultado).to.have.lengthOf(3);
    expect(resultado.find((mueble) => mueble.Nombre === "Silla")).to.be
      .undefined;
  });

  it("BuscarPorNombre() debería buscar muebles por nombre y ordenarlos según el algoritmo especificado", () => {
    const resultado = muebles.BuscarPorNombre("Mesa", ALGORITHM_TYPE.ALFABETO);
    expect(resultado).to.have.lengthOf(1);
    expect(resultado[0].Nombre).to.equal("Mesa");
  });

  it("BuscarPorTipo() debería buscar muebles por tipo y ordenarlos según el algoritmo especificado", () => {
    const resultado = muebles.BuscarPorTipo(
      "Cama",
      ALGORITHM_TYPE.PRECIO_DESCENDENTE,
    );
    expect(resultado).to.have.lengthOf(1);
    expect(resultado[0].Nombre).to.equal("Cama");
  });

  it("BuscarPorDescripcion() debería buscar muebles por descripción y ordenarlos según el algoritmo especificado", () => {
    const resultado = muebles.BuscarPorDescripcion(
      "escritorio",
      ALGORITHM_TYPE.ALFABETO,
    );
    expect(resultado).to.have.lengthOf(1);
    expect(resultado[0].Nombre).to.equal("Escritorio");
  });

  it("PrintMuebles() debería devolver una cadena con la información de los muebles", () => {
    const mueblesInfo = muebles.PrintMuebles(muebles.ObtenerMuebles());
    expect(mueblesInfo).to.be.a("string").and.not.empty;
  });
});
