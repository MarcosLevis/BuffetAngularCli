import { Producto } from "./Producto";

export class Pedido {
    public id: number;
    public nombre: string;
    public precio: number;
    public tipoItem: string;
    public cantidad: number;

    constructor(producto: Producto)
    {
      this.id = producto && producto.id ;
      this.precio = producto && producto.precio;
      this.nombre = producto && producto.nombre ;
      this.tipoItem = producto && producto.tipoItem || 'producto';
      this.cantidad = 1;
    }

  }