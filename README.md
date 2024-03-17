[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/a4IaLRGZ)

# Práctica 7 - DSIkea

Alumnas:  
Inés Garrote Fontenla alu0101512297@ull.edu.es  
Godgith John alu0101463858@ull.edu.es  
Ángela Zhouling Izquierdo Padrón alu0101480442@ull.edu.es

[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct07-dsikea-datamodel-groupi/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct07-dsikea-datamodel-groupi?branch=main)

[![Tests](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct07-dsikea-datamodel-groupi/actions/workflows/node.js.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct07-dsikea-datamodel-groupi/actions/workflows/node.js.yml)

# Informe
## Práctica 6 - Clases e interfaces genéricas. Principios SOLID
### Introducción
En esta práctica grupal hay que aplicar todo lo aprendido relacionado con typescript y el diseño orientado a objetos. 
Vamos a crear un sistema de información destinado a gestionar una tienda de muebles. En donde el usuario podrá interactuar de manera mas directa, ya que se usará **los módulos `Inquirer.js` y `Lowdb`**

### Objetivos a lograr realizando esta práctica
Aprender más acerca de los módulos de `Inquirer.js` y `Lowdb`, respetar los **Principios SOLID**, seguir la metodología `TDD` o `BDD` que implica confirmar el correcto funcionamiento del código desarrollado y probar en los casos de que el código de un error porque la entrada no sea correcta(_errors should never pass silently_).

Los módulos:

- `Inquirer.js`: Es un módulo de Node.js que hace que sea fácil crear interfaces de línea de comandos interactivas. Ofrece muchos tipos de herramientas para crear preguntas, listas, confirmaciones y más, todo ello con una sintaxis simple y flexible
```ts
@Gith138 ➜ /workspaces/ull-esit-inf-dsi-23-24-prct07-dsikea-datamodel-groupi (main) $ node dist/index.js 
? ¿Qué acción deseas realizar? Gestionar clientes
? ¿Qué acción deseas realizar con los clientes? Agregar nuevo cliente
? Nombre del cliente: Alejandro
? Información de contacto del cliente: 612345454
? Dirección del cliente: si
¡Cliente agregado con éxito!
? ¿Qué acción deseas realizar? Gestionar Stock
? ¿Qué acción deseas realizar con el stock? Consultar informe de ventas por mueble y período
? Nombre del mueble: silla
? Fecha de inicio (YYYY-MM-DD): 2024-03-12
? Fecha de fin (YYYY-MM-DD): 2024-03-12
Informe de ventas:
[]
? ¿Qué acción deseas realizar? Salir
¡Hasta luego!
```
- `Lowdb`: Es una base de datos JSON de código abierto para Node.js que ofrece una API sencilla para guardar datos de manera persistente. 

### Ejercicios y su explicación
### Descripción de los requisitos del sistema
## Muebles

Para los muebles, creamos una inertaface donde incluye cierta información acerca de las características de este
```ts
export interface ReferenciaMueble {
  IDUnico: number;
  Nombre: string;
  Descripción: string;
  Material: string;
  Dimensiones: Dimensiones;
  Precio: number;
}
```
Para la variable `Dimensiones`, creamos una clase dimensiones para guardar la distinta información que este ofrece:
```ts
export class Dimensiones {
  constructor(
    private ancho: number,
    private alto: number,
    private fondo: number,
  ) {}

  /**
   * @brief Método para obtener el ancho del mueble
   * @returns ancho del mueble
   */
  getAncho(): number {
    return this.ancho;
  }

  /**
   * @brief Método para obtener el alto del mueble
   * @returns alto del mueble
   */
  getAlto(): number {
    return this.alto;
  }

  /**
   * @brief Método para obtener el fondo del mueble
   * @returns fondo del mueble
   */
  getFondo(): number {
    return this.fondo;
  }

  /**
   * @brief Método para obtener la descripción de las dimensiones del mueble
   * @returns string con las dimensiones del mueble
   */
  getDescripcion(): string {
    return `Ancho: ${this.ancho}cm , Alto: ${this.alto}cm , Fondo: ${this.fondo}cm `;
  }
}
```
En donde se recoge la informacion del alto, ancho y fondo del mueble.
Definimos un enum en donde la información se podrá mostrar ordenada alfabéticamente y por precio, tanto ascendente como descendente:
```ts
export enum ALGORITHM_TYPE {
  ALFABETO,
  PRECIO_ASCENDENTE,
  PRECIO_DESCENDENTE,
}

/**
 * @brief Interfaz para ordenar los muebles
 */
interface OrdenarPor {
  sort(muebles: ReferenciaMueble[]): ReferenciaMueble[];
}
```
Y una interface donde se implementa el método de ordenación.

Ahora desarrollamos tres clases distintas, para así cmplir los **principios SOLID**, el de Responsabilidad Única, en el que cada clase debe realizar una única tarea:
```ts
class Alfabeticamente implements OrdenarPor {
  sort(muebles: ReferenciaMueble[]): ReferenciaMueble[] {
    return muebles.slice().sort((a, b) => a.Nombre.localeCompare(b.Nombre));
  }
}

/**
 * @brief Clase para ordenar los muebles por precio ascendente
 */
class PrecioAscendente implements OrdenarPor {
  sort(muebles: ReferenciaMueble[]): ReferenciaMueble[] {
    return muebles.slice().sort((a, b) => a.Precio - b.Precio);
  }
}

/**
 * @brief Clase para ordenar los muebles por precio descendente
 */
class PrecioDescendente implements OrdenarPor {
  sort(muebles: ReferenciaMueble[]): ReferenciaMueble[] {
    return muebles.slice().sort((a, b) => b.Precio - a.Precio);
  }
}
```
Ahora implementamos la clase principal dond estarán implementadas los métodos más básicos, como el de obtener el mueble(`ObtenerMuebles()`), añadir un mueble(`AddMueble(mueble_nuevo: ReferenciaMueble)`), eliminar un mueble(`EliminarMueble(id_unico: number)`):
```ts
export class Muebles {
  constructor(private muebles: ReferenciaMueble[]) {}

  /**
   * @brief Método para obtener los muebles
   */
  ObtenerMuebles(): ReferenciaMueble[] {
    return this.muebles;
  }

  /**
   * @brief Añadir un mueble nuevo
   */
  AddMueble(mueble_nuevo: ReferenciaMueble): void {
    this.muebles.push(mueble_nuevo);
  }

  /**
   * @brief Eliminar un mueble
   */
  EliminarMueble(id_unico: number): void {
    this.muebles = this.muebles.filter((mueble) => mueble.IDUnico !== id_unico);
  }
```
Y otros métodos más específicos, como buscar un mueble por su nombre(` BuscarPorNombre(nombre: string,ordenamiento: ALGORITHM_TYPE,)`), por su tipo(`BuscarPorTipo(tipo:string,ordenamiento: ALGORITHM_TYPE,)`) ó por coincidencias en su descripción(`  BuscarPorDescripcion(descripcion: string,ordenamiento: ALGORITHM_TYPE,)`):
```ts
 BuscarPorNombre(
    nombre: string,
    ordenamiento: ALGORITHM_TYPE,
  ): ReferenciaMueble[] {
    const resultado_aux: ReferenciaMueble[] = this.muebles.filter(
      (mueble) => mueble.Nombre.toLowerCase() === nombre.toLowerCase(),
    );
    const strategy: OrdenarPor = this.getOrdenarPor(ordenamiento);
    return strategy.sort(resultado_aux);
  }

  /**
   * @brief Método para buscar muebles por tipo y ordenarlos según el algoritmo especificado
   * @param tipo : string con el tipo del producto
   * @param ordenamiento : es un enum ALGORITHM_TYPE
   * @return array de RefereciaMueble ordenados con el algoritmo que se requiere
   */
  BuscarPorTipo(
    tipo: string,
    ordenamiento: ALGORITHM_TYPE,
  ): ReferenciaMueble[] {
    const resultado_aux: ReferenciaMueble[] = this.muebles.filter((mueble) =>
      mueble.Nombre.toLowerCase().includes(tipo.toLowerCase()),
    );
    const strategy: OrdenarPor = this.getOrdenarPor(ordenamiento);
    return strategy.sort(resultado_aux);
  }

  /**
   * @brief Método para buscar por descripción del mueble
   * @param descripcion : string con el descripcion
   * @param ordenamiento : es un enum ALGORITHM_TYPE
   * @return array de RefereciaMueble ordenados con el algoritmo que se requiere
   */
  BuscarPorDescripcion(
    descripcion: string,
    ordenamiento: ALGORITHM_TYPE,
  ): ReferenciaMueble[] {
    const resultado_aux: ReferenciaMueble[] = this.muebles.filter((mueble) =>
      mueble.Descripción.toLowerCase().includes(descripcion.toLowerCase()),
    );
    const strategy: OrdenarPor = this.getOrdenarPor(ordenamiento);
    return strategy.sort(resultado_aux);
  }
```
Para poder usar alguno de los tres meétodos de ordenación de muebles, hemos aplicado el **Patrón Strategy**(que permite definir una familia de algoritmos, encapsular cada uno de ellos y hacerlos intercambiables):
```ts
  private getOrdenarPor(algorithm: ALGORITHM_TYPE): OrdenarPor {
    switch (algorithm) {
      case ALGORITHM_TYPE.ALFABETO:
        return new Alfabeticamente();
      case ALGORITHM_TYPE.PRECIO_ASCENDENTE:
        return new PrecioAscendente();
      case ALGORITHM_TYPE.PRECIO_DESCENDENTE:
        return new PrecioDescendente();
      default:
        throw new Error("No valid algorithm");
    }
  }
```
La clase `Muebles` al usar el método `getOrdenarPor` para crear instancias de las clases `Alfabeticamente`, `PrecioAscendente` o `PrecioDescendente` según el algoritmo especificado, hace que se cumpla el **Patrón Factory Method** al abstraer la creación de objetos y permitir la creación de objetos de diferentes tipos bajo una interfaz común.

## Proveedores

Para los proveedores(en donde se almacenará información sobre los proveedores que suministrarán los muebles), creamos una interface, donde identificamos ese proveedor:
```ts
export interface ReferenciaProveedoresClientes {
  IdUnico: number;
  Nombre: string;
  Contacto: string;
  Direccion: string;
}
```
También se pide acceder y mostrar la información de estos, através de unos métodos:
```ts
export interface Metodos {
  BuscarNombre(nombre: string): ReferenciaProveedoresClientes[];
  BuscarContacto(contacto: string): ReferenciaProveedoresClientes[];
  BuscarDireccion(direccion: string): ReferenciaProveedoresClientes[];
}
```
Creamos otra interface para poder inicializar los métodos, para así cumplir con los **Principios SOLID**.

Lo implementamos en la clase `Proveedores`(que implementa `Metodos`):
```ts
export class Proveedores implements Metodos {
  constructor(private proveedores: ReferenciaProveedoresClientes[]) {}

  /**
   * @brief Método para obtener todos los proveedores
   * @return Array de ReferenciaProveedoresClientes
   */
  ObtenerProveedores(): ReferenciaProveedoresClientes[] {
    return this.proveedores;
  }
  /**
   * @brief Método para añadir un proveedor
   * @param proveedor : ReferenciaProveedoresClientes
   */
  AddProveedor(proveedor: ReferenciaProveedoresClientes): void {
    this.proveedores.push(proveedor);
  }

  /**
   * @brief Método para eliminar un proveedor
   * @param idUnico : número único para identificar el proveedor
   */
  RemoveProveedor(idUnico: number): void {
    this.proveedores = this.proveedores.filter(
      (proveedor) => proveedor.IdUnico !== idUnico,
    );
  }
```
En esta primera parte de nuestra clase implementamos los métodos básicos, para poder obtener(`ObtenerProveedores()`), añadir(`AddProveedor(proveedor: ReferenciaProveedoresClientes)`) ó eliminar(`RemoveProveedor(idUnico: number)`) los proveedores. A parte de implementar el constructor con un atributo privado llamado `proveedores` que es un array de `ReferenciaProveedoresClientes[]`.

```ts
  BuscarNombre(nombre: string): ReferenciaProveedoresClientes[] {
    return this.proveedores.filter(
      (proveedor) => proveedor.Nombre.toLowerCase() === nombre.toLowerCase(),
    );
  }

  /**
   * @brief Método para buscar un proveedor por contacto
   * @param contacto : string con la información de contacto del proveedor
   * @return array de ReferenciaProveedoresClientes
   */
  BuscarContacto(contacto: string): ReferenciaProveedoresClientes[] {
    return this.proveedores.filter(
      (proveedor) =>
        proveedor.Contacto.toLowerCase() === contacto.toLowerCase(),
    );
  }

  /**
   * @brief Método para buscar un proveedor por dirección
   * @param direccion : string con la dirección del proveedor
   * @return array de ReferenciaProveedoresClientes
   */
  BuscarDireccion(direccion: string): ReferenciaProveedoresClientes[] {
    return this.proveedores.filter(
      (proveedor) =>
        proveedor.Direccion.toLowerCase() === direccion.toLowerCase(),
    );
  }
}
```
Aquí se lleva a cabo los otros métodos, en donde el primero busca al proveedor por su nombre(` BuscarNombre(nombre: string)`), el segundo lo busca a través del contacto(`BuscarContacto(contacto: string)`) dado y el último con la dirección(` BuscarDireccion(direccion: string)`). 
En este código se cumple el principio **Responsabilidad única (SRP)**, ya que la clase solo realiza una tarea. La clase no tiene que manejar nada por si misma; para eso están las interfaces `Metodos` y `ReferenciaProveedoresClientes`, lo que hace que la clase `Proveedores` tenga una única razón para cambiar: los cambios en la gestión de los proveedores.


## Clientes

En los clientes(guarda la  información sobre los diferentes clientes que han comprado muebles), hemos utilizado la interface declarado en el fichero de proveedores `interface ReferenciaProveedoresClientes`. 
La clase `Clientes` va a ser exactamente igual que la clase `Proveedores`, ya que se piden los mismos métodos.

## Clase Stock

En la clase principal `Stock`, permitirá manejar la información del sistema e integrar las tres clases explicadas anteriormente(Mueble, Proveedor y Cliente). 
Antes de nada, creamos una interface para definir el mueble:
```ts
export interface MuebleStock {
    Nombre: string;
    StockInicial: number;
}
```
Después definimos la estructura de la transacción, para saber si es una venta o compra, la fecha, el nombre del mueble, etc:
```ts
export interface Transaccion {
    tipo: string;
    fecha: Date;
    MuebleStock: string;
    cantidad: number;
    importe: number;
    cliente?: string;
    proveedor?: string;
}
```
Este se encargará de 3 cosas:
- _Control Automático de Stock:_
Utilizamos un sistema automatizado para saber cuántos muebles tenemos en stock en todo momento.
 ```ts
    obtenerStockMueble(nombreMuebleStock: string): number {
        const MuebleStock = this.MuebleStocks.find(m => m.Nombre === nombreMuebleStock);
        if (MuebleStock) {
            const ventas = this.transacciones.filter(t => t.tipo === 'venta' && t.MuebleStock === nombreMuebleStock).length;
            const compras = this.transacciones.filter(t => t.tipo === 'compra' && t.MuebleStock === nombreMuebleStock).length;
            return MuebleStock.StockInicial - ventas + compras;
        }
        return 0;
    }
```
- _Registro de Movimientos:_
Se apunta todo lo que entra y sale: qué vendemos, qué devuelven los clientes, qué compramos y qué devolvemos a los proveedores.
```ts
  registrarVenta(nombreCliente: string, MuebleStock: string, cantidad: number, importe: number) {
        const fecha = new Date();
        this.agregarTransaccion({ tipo: 'venta', fecha, MuebleStock, cantidad, importe, cliente: nombreCliente });
    }
    /**
     * @brief Método para registrar una compra
     * @param nombreProveedor 
     * @param MuebleStock 
     * @param cantidad 
     * @param importe 
     */
    registrarCompra(nombreProveedor: string, MuebleStock: string, cantidad: number, importe: number) {
        const fecha = new Date();
        this.agregarTransaccion({ tipo: 'compra', fecha, MuebleStock, cantidad, importe, proveedor: nombreProveedor });
    }
    /**
     * @brief Método para obtener el informe de ventas de un mueble
     * @param nombreMuebleStock 
     * @param fechaInicio 
     * @param fechaFin 
     * @returns 
     */
    obtenerInformeVentasMueble(nombreMuebleStock: string, fechaInicio: Date, fechaFin: Date): Transaccion[] {
        const ventas = this.transacciones.filter(t =>
            t.tipo === 'venta' &&
            t.MuebleStock === nombreMuebleStock &&
            t.fecha >= fechaInicio &&
            t.fecha <= fechaFin
        );
        return ventas;
    }
```
- _Reportes y Datos:_
Podemos sacar informes para ver qué tenemos en stock, qué vendemos más, cuánto gastamos y ganamos, y cómo van las relaciones con nuestros clientes y proveedores.
```ts
    obtenerInformeGastosProveedor(nombreProveedor: string, fechaInicio: Date, fechaFin: Date): Transaccion[] {
        const compras = this.transacciones.filter(t =>
            t.tipo === 'compra' &&
            t.proveedor === nombreProveedor &&
            t.fecha >= fechaInicio &&
            t.fecha <= fechaFin
        );
        return compras;
    }
```

Este cumple con varios Principios SOLID, como:
- **Principio de Responsabilidad Única (SRP)**, en el que cada clase y método tienen una sola responsabilidad. 
- **Principio de Abierto/Cerrado (OCP)**, en donde la clase `Stock` está abierta para la extensión (por ejemplo, agregar nuevos tipos de transacciones), pero cerrada para la modificación directa del comportamiento existente.
- **Principio de Segregación de la Interfaz (ISP)**, en donde las interfaces `Metodos` y `ReferenciaProveedoresClientes` siguen este principio, ya que dividen las operaciones relacionadas con los proveedores y clientes en métodos más pequeños y específicos, permitiendo que las clases implementen solo los métodos que necesitan.
También se usa de manera un poco explícita, los patrones:
- **Patrón de Diseño de Singleton**, ya que parece representar un único punto de acceso para gestionar el stock y las transacciones en toda la aplicación.
- **Patrón de Diseño de Observador**, donde los interesados pueden "observar" el estado del stock y las transacciones para realizar acciones según sea necesario.

## Database
En este fichero, declaramos e implmentamos una base de datos usando `lowdb`.
Primero importamos los módulos y se importa las interfaces. Estas interfaces definen la estructura de los proveedores, clientes y muebles que se almacenarán en la base de datos:
```ts
import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync.js';

import { ReferenciaProveedoresClientes } from './proveedor.js';
import { ReferenciaMueble } from './mueble.js';
```

Se define la estructura de la base de datos mediante la interfaz `DatabaseSchema`, que especifica los campos muebles, proveedores y clientes:
Creación del adaptador y la instancia de la base de datos:

Se crea un adaptador utilizando el archivo JSON como almacenamiento, y luego se instancia lowdb utilizando este adaptador. Esto carga los datos del archivo JSON si existe.
```ts

// Define el nombre del archivo de la base de datos
const DB_FILE = 'database.json';

// Crea un adaptador que utiliza el archivo JSON como almacenamiento
const adapter = new FileSync<DatabaseSchema>(DB_FILE);

// Crea una instancia de Lowdb y carga los datos del archivo JSON
const db = lowdb(adapter);

// Define la estructura de la base de datos
interface DatabaseSchema {
    muebles: ReferenciaMueble[];
    proveedores: ReferenciaProveedoresClientes[];
    clientes: ReferenciaProveedoresClientes[];
}
```

Se establece una estructura inicial para la base de datos utilizando el método defaults. Si el archivo de la base de datos no existe o está vacío, se crea las colecciones muebles, proveedores y clientes con valores iniciales vacíos:
```ts
// Inicializa la base de datos con una estructura inicial si el archivo no existe
db.defaults<DatabaseSchema>({
    muebles: [],
    proveedores: [],
    clientes: []
}).write();
```
Exportación de la instancia de la base de datos:
Se exporta la instancia de la base de datos para que pueda ser utilizada en otros módulos de la aplicación:
```ts
export default db;
```

## Index
Para el archivo principal, pimero implementamos las bibliotecas necesarias para usar el `inquirer`.
Definimos una función `iniciarAplicacion()` que ejecuta un bucle para mostrar el menú principal y manejar las acciones que desa el usuario.
Después proporciona funciones para agregar, eliminar y buscar muebles, proveedores y clientes.
Permite al usuario registrar ventas y compras de muebles, así como consultar el stock disponible y generar informes de ventas y gastos.
Cada función solicita al usuario información relevante usando la biblioteca `inquirer`, realiza las operaciones necesarias en la base de datos y muestra los mensajes de éxito o resultados.
Al final del código, se llama a la función iniciarAplicacion() para comenzar la ejecución de la aplicación.

### Dificultades 

  Esta práctica ha sido dificíl, ya que nos costó mucho entender bien como aplicar el Inquirer y el Lowdb ya que era muy confuso y lioso de usar. Quitando esto realizar la práctica estuvo un poco enrevesada, ya que había cosas en la que no estabamos de acuerdo, porque cada una lo hacía o implementaba de una manera distinta, además de que el Live server a veces fallaba y era complicado intentar trabajar las tres juntas. 
  
### Bibliografía 
- Libro: _Essential TypeScript: From Beginner to Pro_
Patron estrategia
