import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync.js";

/**
 * @brief Clase para la base de datos
 * @param DB_FILE : string con el nombre del archivo de la base de datos
 * @param adapter : FileSync<DatabaseSchema> con el adaptador para la base de datos
 * @param db : lowdb con la instancia de la base de datos
 * @param DatabaseSchema : interfaz para la estructura de la base de datos
 * @param ReferenciaProveedoresClientes : interfaz para la referencia de un proveedor o cliente
 * @param ReferenciaMueble : interfaz para la referencia de un mueble
 */

import { ReferenciaProveedoresClientes } from "./proveedor.js";
import { ReferenciaMueble } from "./mueble.js";

// Define el nombre del archivo de la base de datos
const DB_FILE = "database.json";

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

// Inicializa la base de datos con una estructura inicial si el archivo no existe
db.defaults<DatabaseSchema>({
  muebles: [],
  proveedores: [],
  clientes: [],
}).write();

// Exporta la instancia de la base de datos para usarla en otros módulos
export default db;
