import "mocha";
import { expect } from "chai";
import { ReferenciaProveedoresClientes } from "../src/proveedor.js";
import { Clientes } from "../src/cliente.js";

// Datos de prueba
const cliente: ReferenciaProveedoresClientes[] = [
  {
    IdUnico: 1,
    Nombre: "Cliente1",
    Contacto: "Contacto1",
    Direccion: "Direccion1",
  },
  {
    IdUnico: 2,
    Nombre: "Cliente2",
    Contacto: "Contacto2",
    Direccion: "Direccion2",
  },
  {
    IdUnico: 3,
    Nombre: "Cliente3",
    Contacto: "Contacto3",
    Direccion: "Direccion3",
  },
];

describe("Test para la clase Clientes", () => {
  it("Se debe crear un cliente con los datos correctos", () => {
    const cliente1 = new Clientes(cliente);
    expect(cliente1).to.exist;
  });
  it("Se debe poder obtener los clientes", () => {
    const cliente1 = new Clientes(cliente);
    expect(cliente1.ObtenerClientes()).to.eql(cliente);
  });
  it("Se debe poder añadir un cliente", () => {
    const cliente1 = new Clientes(cliente);
    const clienteNuevo = {
      IdUnico: 4,
      Nombre: "Cliente4",
      Contacto: "Contacto4",
      Direccion: "Direccion4",
    };
    cliente1.AddCliente(clienteNuevo);
    // Comparamos solo las propiedades del nuevo cliente
    expect(cliente1.ObtenerClientes()).to.deep.include(clienteNuevo);
  });
});
