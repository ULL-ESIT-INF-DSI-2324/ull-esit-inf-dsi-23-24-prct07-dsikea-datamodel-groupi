import "mocha";
import { expect } from "chai";
import {
  Proveedores,
  ReferenciaProveedoresClientes,
} from "../src/proveedor.js"; // Asegúrate de que la ruta sea correcta

// Datos de prueba
const proveedoresIniciales: ReferenciaProveedoresClientes[] = [
  {
    IdUnico: 1,
    Nombre: "Juan Frorentin Gonzalez",
    Contacto: "juamforentin23@hotmail.com",
    Direccion: "avd. Plaza de España edfi. 16",
  },
  {
    IdUnico: 2,
    Nombre: "Colgate",
    Contacto: "colgate_official@gmail.com",
    Direccion: "avenida Los Perales. Murcia",
  },
];

// Inicialización de la instancia de Proveedores para las pruebas
const proveedores: Proveedores = new Proveedores([...proveedoresIniciales]);

describe("Proveedores", () => {
  describe("Funcionamiento normal", () => {
    it("Test 1 - ObtenerProvedores() return provedores declarados al principio", () => {
      const resultado = proveedores.ObtenerProveedores();
      expect(resultado).to.deep.equal(proveedoresIniciales);
    });

    it("Test 2 - AddProvedor() return nuevo provedor", () => {
      const nuevoProveedor = {
        IdUnico: 3,
        Nombre: "Proveedor 3",
        Contacto: "contacto3@gmail.com",
        Direccion: "Avenida trinidad nº13",
      };
      proveedores.AddProveedor(nuevoProveedor);
      expect(proveedores.ObtenerProveedores()).to.include(nuevoProveedor);
    });

    it("Test 3 - RemoveProvedor() return si tiene identidicador 1", () => {
      proveedores.RemoveProveedor(1);
      const resultado = proveedores.ObtenerProveedores();
      expect(resultado.some((prov) => prov.IdUnico === 1)).to.be.false;
    });

    it(" Test 4 - BuscarNombre() return Colgate", () => {
      const nombreProveedorABuscar = "Colgate";
      const resultado = proveedores.BuscarNombre(nombreProveedorABuscar);
      expect(resultado.length).to.equal(1);
      expect(resultado[0].Nombre).to.equal(nombreProveedorABuscar);
    });

    it("Test 5 - BuscarContacto() return ", () => {
      const contactoProveedorABuscar = "colgate_official@gmail.com";
      const resultado = proveedores.BuscarContacto(contactoProveedorABuscar);
      expect(resultado.length).to.equal(1);
      expect(resultado[0].Contacto).to.equal(contactoProveedorABuscar);
    });

    it("Test 6 - BuscarDireccion() return Avenida trinidad nº13", () => {
      const direccionProveedorABuscar = "Avenida trinidad nº13";
      const resultado = proveedores.BuscarDireccion(direccionProveedorABuscar);
      expect(resultado.length).to.equal(1);
      expect(resultado[0].Direccion).to.equal(direccionProveedorABuscar);
    });

    const resultado_esperado: ReferenciaProveedoresClientes[] = [
      {
        IdUnico: 2,
        Nombre: "Colgate",
        Contacto: "colgate_official@gmail.com",
        Direccion: "avenida Los Perales. Murcia",
      },
      {
        IdUnico: 3,
        Nombre: "Proveedor 3",
        Contacto: "contacto3@gmail.com",
        Direccion: "Avenida trinidad nº13",
      },
    ];

    it("Test 7 - ObtenerProvedores()  return resultado esperado", () => {
      const resultado = proveedores.ObtenerProveedores();
      expect(resultado).to.deep.equal(resultado_esperado);
    });

    it("Test 8 - AddProveedor() return nuevo provedor", () => {
      const nuevoProveedor = {
        IdUnico: 4,
        Nombre: "Juana Bosco",
        Contacto: "juenabosco12@gmail.com",
        Direccion: "calle la Fragata. Las Chafiras",
      };
      proveedores.AddProveedor(nuevoProveedor);
      expect(proveedores.ObtenerProveedores()).to.include(nuevoProveedor);
    });

    it("Test 9 - RemoveProveedor() return false", () => {
      const idProveedorAEliminar = 4;
      proveedores.RemoveProveedor(idProveedorAEliminar);
      const resultado = proveedores.ObtenerProveedores();
      expect(resultado.some((prov) => prov.IdUnico === idProveedorAEliminar)).to
        .be.false;
    });

    it("Test 10 - BuscarNombre() return Proveedor 3", () => {
      const nombreProveedorABuscar = "Proveedor 3";
      const resultado = proveedores.BuscarNombre(nombreProveedorABuscar);
      expect(resultado.length).to.equal(1);
      expect(resultado[0].Nombre).to.equal(nombreProveedorABuscar);
    });

    it("Test 11 - BuscarContacto() return contacto3@gmail.com ", () => {
      const contactoProveedorABuscar = "contacto3@gmail.com";
      const resultado = proveedores.BuscarContacto(contactoProveedorABuscar);
      expect(resultado.length).to.equal(1);
      expect(resultado[0].Contacto).to.equal(contactoProveedorABuscar);
    });

    // Prueba para buscar un proveedor por dirección correctamente
    it("Test 12 - BuscarDireccion", () => {
      const direccionProveedorABuscar = "calle la Fragata. Las Chafiras";
      const resultado = proveedores.BuscarDireccion(direccionProveedorABuscar);
      expect(resultado.length).to.equal(0);
    });
  });

  describe("Entradas no válidas o inesperadas", () => {
    // Prueba para buscar un proveedor por nombre inexistente
    it("Test 13 - BuscarNombre()  un array vacío al buscar un proveedor por nombre inexistente", () => {
      const nombreProveedorInexistente = "Proveedor inexistente";
      const resultado = proveedores.BuscarNombre(nombreProveedorInexistente);
      expect(resultado).to.be.an("array").that.is.empty;
    });

    // Prueba para buscar un proveedor por contacto inexistente
    it("Debería devolver un array vacío al buscar un proveedor por contacto inexistente", () => {
      const contactoProveedorInexistente = "contacto_inexistente@gmail.com";
      const resultado = proveedores.BuscarContacto(
        contactoProveedorInexistente,
      );
      expect(resultado).to.be.an("array").that.is.empty;
    });

    // Prueba para buscar un proveedor por dirección inexistente
    it("Debería devolver un array vacío al buscar un proveedor por dirección inexistente", () => {
      const direccionProveedorInexistente = "Dirección inexistente";
      const resultado = proveedores.BuscarDireccion(
        direccionProveedorInexistente,
      );
      expect(resultado).to.be.an("array").that.is.empty;
    });
  });
});
