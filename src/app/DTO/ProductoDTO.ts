export class ProductoDTO {//ajustar la cuestión del tipo de item
  public nombre: string;
  public precio: number;

  constructor(obj?: any) {
    this.nombre = obj && obj.nombre || '';
    this.precio = obj && obj.precio || 0;
  }
}










