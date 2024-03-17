import "mocha";
import { expect } from 'chai';
import { ReferenciaProveedoresClientes,
    Proveedores,
    Metodos
 } from '../src/proveedor'; // Asegúrate de que la ruta sea correcta

// Datos de prueba
const proveedoresIniciales = [
  {
    IdUnico: 1,
    Nombre: 'Proveedor 1',
    Contacto: 'contacto1@gmail.com',
    Direccion: 'Dirección 1',
  },
  {
    IdUnico: 2,
    Nombre: 'Proveedor 2',
    Contacto: 'contacto2@gmail.com',
    Direccion: 'Dirección 2',
  },
];

// Inicialización de la instancia de Proveedores para las pruebas
let proveedores;

describe('Proveedores', () => {
  beforeEach(() => {
    proveedores = new Proveedores([...proveedoresIniciales]);
  });

  describe('Funcionamiento normal', () => {
    it('Debería obtener todos los proveedores correctamente', () => {
      const resultado = proveedores.ObtenerProveedores();
      expect(resultado).to.deep.equal(proveedoresIniciales);
    });

    it('Debería añadir un proveedor correctamente', () => {
      const nuevoProveedor = {
        IdUnico: 3,
        Nombre: 'Proveedor 3',
        Contacto: 'contacto3@gmail.com',
        Direccion: 'Dirección 3',
      };
      proveedores.AddProveedor(nuevoProveedor);
      expect(proveedores.ObtenerProveedores()).to.include(nuevoProveedor);
    });

    it('Debería eliminar un proveedor correctamente', () => {
      const idProveedorAEliminar = 1;
      proveedores.RemoveProveedor(idProveedorAEliminar);
      const resultado = proveedores.ObtenerProveedores();
      expect(resultado.some((prov) => prov.IdUnico === idProveedorAEliminar)).to.be.false;
    });

    it('Debería buscar un proveedor por nombre correctamente', () => {
      const nombreProveedorABuscar = 'Proveedor 1';
      const resultado = proveedores.BuscarNombre(nombreProveedorABuscar);
      expect(resultado.length).to.equal(1);
      expect(resultado[0].Nombre).to.equal(nombreProveedorABuscar);
    });

    it('Debería buscar un proveedor por contacto correctamente', () => {
      const contactoProveedorABuscar = 'contacto1@gmail.com';
      const resultado = proveedores.BuscarContacto(contactoProveedorABuscar);
      expect(resultado.length).to.equal(1);
      expect(resultado[0].Contacto).to.equal(contactoProveedorABuscar);
    });

    it('Debería buscar un proveedor por dirección correctamente', () => {
      const direccionProveedorABuscar = 'Dirección 1';
      const resultado = proveedores.BuscarDireccion(direccionProveedorABuscar);
      expect(resultado.length).to.equal(1);
      expect(resultado[0].Direccion).to.equal(direccionProveedorABuscar);
    });
  });

  describe('Entradas no válidas o inesperadas', () => {
    it('Debería devolver un array vacío al buscar un proveedor por nombre inexistente', () => {
      const nombreProveedorInexistente = 'Proveedor inexistente';
      const resultado = proveedores.BuscarNombre(nombreProveedorInexistente);
      expect(resultado).to.be.an('array').that.is.empty;
    });

    it('Debería devolver un array vacío al buscar un proveedor por contacto inexistente', () => {
      const contactoProveedorInexistente = 'contacto_inexistente@gmail.com';
      const resultado = proveedores.BuscarContacto(contactoProveedorInexistente);
      expect(resultado).to.be.an('array').that.is.empty;
    });

    it('Debería devolver un array vacío al buscar un proveedor por dirección inexistente', () => {
      const direccionProveedorInexistente = 'Dirección inexistente';
      const resultado = proveedores.BuscarDireccion(direccionProveedorInexistente);
      expect(resultado).to.be.an('array').that.is.empty;
    });
  });
});
