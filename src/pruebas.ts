/**
 * @class Collectable
 * @description Implementación de una clase genérica que implementa una interfaz genérica
 */
interface Collectable<T> {
  addItem(newItem: T): void;
  getItem(index: number): T;
  removeItem(index: number): T;
  getNumberOfItems(): number;
}
  
/**
 * @class SearchableCollection
 * @description Clase que implementa la interfaz Collectable y la interfaz Searchable
 */
interface Searchable<T> {
  search(name: string ): T[] | undefined;
}

/**
 * @class SearchableCollection
 * @description Clase que implementa la interfaz Searchable
 * @extends SearchableCollection
 * @implements Searchable
 */
export abstract class SearchableCollection<T> implements Searchable<T>, Collectable<T> {
  constructor(protected items: T[]) {
  } // Array de items

  addItem(newItem: T): void { // Añadir un item
    this.items.push(newItem);
  }

  getItem(index: number): T { // Obtener un item
    return this.items[index]; // Devuelve el item en la posición index
  }

  removeItem(): T { // Eliminar un item
    return this.items.pop() as T; // Devuelve el último item del array, eliminándolo y usando el tipo T
  }

  getNumberOfItems(): number { // Obtener el número de items
    return this.items.length; // Devuelve el número de items en el array
  }

  abstract search(name: string): T[] | undefined; // Buscar un item
}

/**
 * @class NumericSearchableCollection
 * @description Clase que implementa la interfaz Searchable
 * @extends SearchableCollection
 * @implements Searchable
 * @param numberToSearch
 * @returns number[] | undefined
 */
export class NumericSearchableCollection extends SearchableCollection<number> {
  search(numberToSearch: string) { // Buscar un número
    return this.items.filter((item) => item === parseInt(numberToSearch));
  }
}

/**
 * @class StringSearchableCollection
 * @description Clase que implementa la interfaz Searchable
 * @extends SearchableCollection
 * @implements Searchable
 * @param substringToSearch
 * @returns string[] | undefined
 */
export class StringSearchableCollection extends SearchableCollection<string> {
  search(substringToSearch: string): string[] | undefined { // Buscar un substring
    return this.items.filter(item => item.includes(substringToSearch));
  }
}
