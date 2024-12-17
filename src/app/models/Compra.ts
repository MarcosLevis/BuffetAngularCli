export interface Compra {
    id: number;
    precio: number;
    fecha: string;
    item: Item[];
  }
  

  export interface Item{
    nombre: string;
    precio: number;
  }