import inquirer from "inquirer";
import db from "./database.js";
import {
  Dimensiones,
  Muebles,
  ReferenciaMueble,
} from "./mueble.js";
import { ReferenciaProveedoresClientes } from "./proveedor.js";
import { Stock} from "./stock.js";


// Crear instancias de las clases Muebles, Proveedores y Clientes
const muebles = new Muebles([]);

// Crear instancia de la clase Stock
const stock = new Stock([]);

// Función para iniciar la aplicación y mostrar el menú principal
async function iniciarAplicacion() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { accion } = await inquirer.prompt([
      {
        type: "list",
        name: "accion",
        message: "¿Qué acción deseas realizar?",
        choices: [
          "Gestionar muebles",
          "Gestionar proveedores",
          "Gestionar clientes",
          "Gestionar Stock",
          "Salir",
        ],
      },
    ]);

    switch (accion) {
      case "Gestionar muebles":
        await gestionarMuebles();
        break;
      case "Gestionar proveedores":
        await gestionarProveedores();
        break;
      case "Gestionar clientes":
        await gestionarClientes();
        break;
      case "Gestionar Stock":
        await gestionarStock();
        break;
      case "Salir":
        console.log("¡Hasta luego!");
        return;
    }
  }
}

/////////////////////////// Función para gestionar los muebles //////////////////////////////////////////

async function gestionarMuebles() {
  const { accionMueble } = await inquirer.prompt([
    {
      type: "list",
      name: "accionMueble",
      message: "¿Qué acción deseas realizar con los muebles?",
      choices: [
        "Agregar nuevo mueble",
        "Eliminar mueble",
        "Buscar mueble",
        "Volver",
      ],
    },
  ]);

  switch (accionMueble) {
    case "Agregar nuevo mueble":
      await agregarNuevoMueble();
      break;
    case "Eliminar mueble":
      await eliminarMueble();
      break;
    case "Buscar mueble":
      await buscarMueble();
      break;
    case "Volver":
      return;
  }
}

// Función para agregar un nuevo mueble
async function agregarNuevoMueble() {
  const nuevoMuebleData = await inquirer.prompt([
    {
      type: "input",
      name: "nombre",
      message: "Nombre del mueble:",
    },
    {
      type: "input",
      name: "descripcion",
      message: "Descripción del mueble:",
    },
    {
      type: "input",
      name: "material",
      message: "Material del mueble:",
    },
    {
      type: "input",
      name: "ancho",
      message: "Ancho del mueble (cm):",
    },
    {
      type: "input",
      name: "alto",
      message: "Alto del mueble (cm):",
    },
    {
      type: "input",
      name: "fondo",
      message: "Fondo del mueble (cm):",
    },
    {
      type: "input",
      name: "precio",
      message: "Precio del mueble:",
    },
  ]);

  // Crear instancia de Dimensiones
  const dimensiones = new Dimensiones(
    parseFloat(nuevoMuebleData.ancho),
    parseFloat(nuevoMuebleData.alto),
    parseFloat(nuevoMuebleData.fondo),
  );

  const ID_unico =  Date.now(); // Utilizamos la marca de tiempo como ID único temporal
  // Crear nuevo mueble con las dimensiones
  const nuevoMueble: ReferenciaMueble = {
    IDUnico: ID_unico,
    Nombre: nuevoMuebleData.nombre,
    Descripción: nuevoMuebleData.descripcion,
    Material: nuevoMuebleData.material,
    Dimensiones: dimensiones, // Asignar la instancia de Dimensiones
    Precio: parseFloat(nuevoMuebleData.precio),
  };

  // Añadir en el stock cantidad
  const stock_nuevo_mueble = await inquirer.prompt([
    {
      type: "input",
      name: "cantidad",
      message: "Cantidad de mueble:",
    } 
    ]
  );

  stock.agregarMueble(ID_unico, nuevoMuebleData.nombre, stock_nuevo_mueble.cantidad);

  db.get('muebles').push(nuevoMueble).write();
  console.log("¡Mueble agregado con éxito!");
}

// Función para eliminar un mueble
async function eliminarMueble() {
  const mueblesList = db.get('muebles').value();

  if (mueblesList.length === 0) {
    console.log("No hay muebles para eliminar.");
    return;
  }

  const choices = mueblesList.map(mueble => ({
    name: `${mueble.Nombre} - ${mueble.Descripción}`,
    value: mueble.IDUnico
  }));

  const { muebleAEliminar } = await inquirer.prompt([
    {
      type: "list",
      name: "muebleAEliminar",
      message: "Selecciona el mueble que deseas eliminar:",
      choices: choices,
    },
  ]);

  db.get('muebles').remove({ IDUnico: muebleAEliminar }).write();
  console.log("¡Mueble eliminado con éxito!");
}

// Función para buscar un mueble
async function buscarMueble() {
  const { tipoBusqueda, criterioBusqueda} =
    await inquirer.prompt([
      {
        type: "list",
        name: "tipoBusqueda",
        message: "¿Cómo deseas buscar el mueble?",
        choices: ["Por nombre", "Por tipo", "Por descripción"],
      },
      {
        type: "input",
        name: "criterioBusqueda",
        message: "Introduce el criterio de búsqueda:",
      },
      {
        type: "list",
        name: "ordenamiento",
        message: "¿Cómo deseas ordenar los resultados?",
        choices: [
          "Alfabéticamente",
          "Por precio ascendente",
          "Por precio descendente",
        ],
      },
    ]);

  let resultados;
  switch (tipoBusqueda) {
    case "Por nombre":
      resultados = db
        .get("muebles")
        .filter((mueble) => mueble.Nombre.includes(criterioBusqueda))
        .sortBy("Nombre")
        .value();
      break;
    
    case "Por descripción":
      resultados = db
        .get("muebles")
        .filter((mueble) => mueble.Descripción.includes(criterioBusqueda))
        .sortBy("Precio")
        .value();
      break;
  }

  if (resultados !== undefined && resultados.length > 0) {
    console.log("Resultados de la búsqueda:");
    console.log(muebles.PrintMuebles(resultados));
  } else {
    console.log("No se encontraron resultados.");
  }
}




/////////////////////////// Función para gestionar los proveedores //////////////////////////////////////////
async function gestionarProveedores() {
  const { accionProveedor } = await inquirer.prompt([
    {
      type: "list",
      name: "accionProveedor",
      message: "¿Qué acción deseas realizar con los proveedores?",
      choices: [
        "Agregar nuevo proveedor",
        "Eliminar proveedor",
        "Buscar proveedor",
        "Volver",
      ],
    },
  ]);

  switch (accionProveedor) {
    case "Agregar nuevo proveedor":
      await agregarNuevoProveedor();
      break;
    case "Eliminar proveedor":
      await eliminarProveedor();
      break;
    case "Buscar proveedor":
      await buscarProveedor();
      break;
    case "Volver":
      return;
  }
}

// Función para agregar un nuevo proveedor
async function agregarNuevoProveedor() {
  const nuevoProveedorData = await inquirer.prompt([
    {
      type: "input",
      name: "nombre",
      message: "Nombre del proveedor:",
    },
    {
      type: "input",
      name: "contacto",
      message: "Información de contacto del proveedor:",
    },
    {
      type: "input",
      name: "direccion",
      message: "Dirección del proveedor:",
    },
  ]);

  const nuevoProveedor: ReferenciaProveedoresClientes = {
    IdUnico: Date.now(), // Utilizamos la marca de tiempo como ID único temporal
    Nombre: nuevoProveedorData.nombre,
    Contacto: nuevoProveedorData.contacto,
    Direccion: nuevoProveedorData.direccion,
  };

  db.get('proveedores').push(nuevoProveedor).write();
  console.log("¡Proveedor agregado con éxito!");
}

// Función para eliminar un proveedor
async function eliminarProveedor() {
  const proveedoresList = db.get('proveedores').value();

  if (proveedoresList.length === 0) {
    console.log("No hay proveedores para eliminar.");
    return;
  }

  const choices = proveedoresList.map(proveedor => ({
    name: `${proveedor.Nombre} - ${proveedor.Contacto}`,
    value: proveedor.IdUnico
  }));

  const { proveedorAEliminar } = await inquirer.prompt([
    {
      type: "list",
      name: "proveedorAEliminar",
      message: "Selecciona el proveedor que deseas eliminar:",
      choices: choices,
    },
  ]);

  db.get('proveedores').remove({ IdUnico: proveedorAEliminar }).write();
  console.log("¡Proveedor eliminado con éxito!");
}

// Función para buscar un proveedor
async function buscarProveedor() {
  const { criterioBusqueda, tipoBusqueda } = await inquirer.prompt([
    {
      type: "input",
      name: "criterioBusqueda",
      message:
        "Introduce el criterio de búsqueda (nombre, contacto, dirección):",
    },
    {
      type: "list",
      name: "tipoBusqueda",
      message: "¿Cómo deseas buscar al proveedor?",
      choices: ["Por nombre", "Por contacto", "Por dirección"],
    },
  ]);

  let resultados;
  switch (tipoBusqueda) {
    case "Por nombre":
      resultados = db.get('proveedores').filter({ Nombre: criterioBusqueda }).value();
      break;
    case "Por contacto":
      resultados = db.get('proveedores').filter({ Contacto: criterioBusqueda }).value();
      break;
    case "Por dirección":
      resultados = db.get('proveedores').filter({ Direccion: criterioBusqueda }).value();
      break;
  }

  console.log("Resultados de la búsqueda:");
  console.log(resultados);
}

/////////////////////////// Función para gestionar los clientes //////////////////////////////////////////
async function gestionarClientes() {
  const { accionCliente } = await inquirer.prompt([
    {
      type: "list",
      name: "accionCliente",
      message: "¿Qué acción deseas realizar con los clientes?",
      choices: [
        "Agregar nuevo cliente",
        "Eliminar cliente",
        "Buscar cliente",
        "Volver",
      ],
    },
  ]);

  switch (accionCliente) {
    case "Agregar nuevo cliente":
      await agregarNuevoCliente();
      break;
    case "Eliminar cliente":
      await eliminarCliente();
      break;
    case "Buscar cliente":
      await buscarCliente();
      break;
    case "Volver":
      return;
  }
}

// Función para agregar un nuevo cliente
async function agregarNuevoCliente() {
  const nuevoClienteData = await inquirer.prompt([
    {
      type: "input",
      name: "nombre",
      message: "Nombre del cliente:",
    },
    {
      type: "input",
      name: "contacto",
      message: "Información de contacto del cliente:",
    },
    {
      type: "input",
      name: "direccion",
      message: "Dirección del cliente:",
    },
  ]);

  const nuevoCliente: ReferenciaProveedoresClientes = {
    IdUnico: Date.now(), // Utilizamos la marca de tiempo como ID único temporal
    Nombre: nuevoClienteData.nombre,
    Contacto: nuevoClienteData.contacto,
    Direccion: nuevoClienteData.direccion,
  };

  db.get('clientes').push(nuevoCliente).write();
  console.log("¡Cliente agregado con éxito!");
}
async function eliminarCliente() {
  const clientesList = db.get('clientes').value();

  if (clientesList.length === 0) {
    console.log("No hay clientes para eliminar.");
    return;
  }

  const choices = clientesList.map(cliente => ({
    name: `${cliente.Nombre} - ${cliente.Contacto}`,
    value: cliente.IdUnico
  }));

  const { clienteAEliminar } = await inquirer.prompt([
    {
      type: "list",
      name: "clienteAEliminar",
      message: "Selecciona el cliente que deseas eliminar:",
      choices: choices,
    },
  ]);

  db.get('clientes').remove({ IdUnico: clienteAEliminar }).write();
  console.log("¡Cliente eliminado con éxito!");
}

// Función para buscar un cliente
async function buscarCliente() {
  const { criterioBusqueda, tipoBusqueda } = await inquirer.prompt([
    {
      type: "input",
      name: "criterioBusqueda",
      message:
        "Introduce el criterio de búsqueda (nombre, contacto, dirección):",
    },
    {
      type: "list",
      name: "tipoBusqueda",
      message: "¿Cómo deseas buscar al cliente?",
      choices: ["Por nombre", "Por contacto", "Por dirección"],
    },
  ]);

  let resultados;
  switch (tipoBusqueda) {
    case "Por nombre":
      resultados = db.get('clientes').filter({ Nombre: criterioBusqueda }).value();
      break;
    case "Por contacto":
      resultados = db.get('clientes').filter({ Contacto: criterioBusqueda }).value();
      break;
    case "Por dirección":
      resultados = db.get('clientes').filter({ Direccion: criterioBusqueda }).value();
      break;
  }

  console.log("Resultados de la búsqueda:");
  console.log(resultados);
}



// Función para manejar las opciones relacionadas con el stock
async function gestionarStock() {
  const { accionStock } = await inquirer.prompt([
    {
      type: "list",
      name: "accionStock",
      message: "¿Qué acción deseas realizar con el stock?",
      choices: [
        "Registrar venta",
        "Registrar compra",
        "Consultar stock de un mueble",
        "Consultar informe de ventas por mueble y período",
        "Consultar informe de gastos por proveedor y período",
        "Volver",
      ],
    },
  ]);

  switch (accionStock) {
    case "Registrar venta":
      await registrarVenta();
      break;
    case "Registrar compra":
      await registrarCompra();
      break;
    case "Consultar stock de un mueble":
      await consultarStockMueble();
      break;
    case "Consultar informe de ventas por mueble y período":
      await consultarInformeVentas();
      break;
    case "Consultar informe de gastos por proveedor y período":
      await consultarInformeGastos();
      break;
    case "Volver":
      return;
  }
}

// Función para registrar una venta
async function registrarVenta() {
  const { nombreCliente, mueble, cantidad, importe } = await inquirer.prompt([
    {
      type: "input",
      name: "nombreCliente",
      message: "Nombre del cliente:",
    },
    {
      type: "input",
      name: "mueble",
      message: "Nombre del mueble:",
    },
    {
      type: "input",
      name: "cantidad",
      message: "Cantidad vendida:",
    },
    {
      type: "input",
      name: "importe",
      message: "Importe total:",
    },
  ]);

  stock.registrarVenta(nombreCliente, mueble, parseInt(cantidad), parseInt(importe));
  console.log("¡Venta registrada con éxito!");
}

// Función para registrar una compra
async function registrarCompra() {
  const { nombreProveedor, mueble, cantidad, importe } = await inquirer.prompt([
    {
      type: "input",
      name: "nombreProveedor",
      message: "Nombre del proveedor:",
    },
    {
      type: "input",
      name: "mueble",
      message: "Nombre del mueble:",
    },
    {
      type: "input",
      name: "cantidad",
      message: "Cantidad comprada:",
    },
    {
      type: "input",
      name: "importe",
      message: "Importe total:",
    },
  ]);

  stock.registrarCompra(nombreProveedor, mueble, parseInt(cantidad), parseInt(importe));
  console.log("¡Compra registrada con éxito!");
}

// Función para consultar el stock de un mueble
async function consultarStockMueble() {
  const { nombreMueble } = await inquirer.prompt([
    {
      type: "input",
      name: "nombreMueble",
      message: "Nombre del mueble:",
    },
  ]);

  const stockDisponible = stock.obtenerStockMueble(nombreMueble);
  console.log(`Stock disponible de ${nombreMueble}: ${stockDisponible}`);
}

// Función para consultar el informe de ventas por mueble y período
async function consultarInformeVentas() {
  const { nombreMueble, fechaInicio, fechaFin } = await inquirer.prompt([
    {
      type: "input",
      name: "nombreMueble",
      message: "Nombre del mueble:",
    },
    {
      type: "input",
      name: "fechaInicio",
      message: "Fecha de inicio (YYYY-MM-DD):",
    },
    {
      type: "input",
      name: "fechaFin",
      message: "Fecha de fin (YYYY-MM-DD):",
    },
  ]);

  const informeVentas = stock.obtenerInformeVentasMueble(nombreMueble, new Date(fechaInicio), new Date(fechaFin));
  console.log("Informe de ventas:");
  console.log(informeVentas);
}

// Función para consultar el informe de gastos por proveedor y período
async function consultarInformeGastos() {
  const { nombreProveedor, fechaInicio, fechaFin } = await inquirer.prompt([
    {
      type: "input",
      name: "nombreProveedor",
      message: "Nombre del proveedor:",
    },
    {
      type: "input",
      name: "fechaInicio",
      message: "Fecha de inicio (YYYY-MM-DD):",
    },
    {
      type: "input",
      name: "fechaFin",
      message: "Fecha de fin (YYYY-MM-DD):",
    },
  ]);

  const informeGastos = stock.obtenerInformeGastosProveedor(nombreProveedor, new Date(fechaInicio), new Date(fechaFin));
  console.log("Informe de gastos:");
  console.log(informeGastos);
}
// Iniciar la aplicación
iniciarAplicacion();

