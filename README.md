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

**Los módulos:

`Inquirer.js`: Es un módulo de Node.js que hace que sea fácil crear interfaces de línea de comandos interactivas. Ofrece muchos tipos de herramientas para crear preguntas, listas, confirmaciones y más, todo ello con una sintaxis simple y flexible
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
`Lowdb`**: 


### Ejercicios y su explicación

### Dificultades

  Esta práctica ha sido dificíl, ya que me cuesta mucho entender bien las estructuras de herencias, clases, interfaces, y demás, pero haciendo los ejercicios se va entendiendo mejor las cosas. Igual me pasa con los Principios SOLID, ya que hay veces que es difiíl saber cual se cumple y cualés no, pero para eso están los ejercicios. :)

  
### Bibliografía
- Libro: _Essential TypeScript: From Beginner to Pro_
Patron estrategia
