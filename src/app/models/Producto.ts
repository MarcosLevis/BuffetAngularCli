export class Producto {
    //se que no te va a gustar el public pero no pasa nada papa
    public id: number;
    public nombre: string;
    public precio: number;
    public tipoItem: string;

    constructor(obj?: any)
    {
      this.id = obj && obj.id || null;
      this.precio = obj && obj.precio || '';
      this.nombre =obj && obj.nombre || '';
      this.tipoItem = 'tipoProducto'; //???
    }

  }