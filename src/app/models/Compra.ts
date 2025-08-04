export class Compra {
  constructor(private id: number, private precio: number, private fecha: string, private items: Item[]){}

  public getId(): number {
    return this.id;
  }

  public getPrecio(): number {
    return this.precio;
  }

  public setPrecio(precio: number): void {
    this.precio = precio;
  }

  public getFecha(): string {
    return this.fecha;
  }

  public setFecha(fecha: string): void {
    this.fecha = fecha;
  }

  public getItems(): Item[] {
    return this.items;
  }

  public addItem(item: Item): void {
    this.items.push(item);
  }

  public removeItem(item: Item): void {
    this.items.find(i => i.getNombre() == item.getNombre() && item.getPrecio())
  }

  public getNombre(): string {
    return this.items.map(i => i.getNombre()).join(", ");
  }
}

export class Item{
  constructor(private id: number, private nombre: string, private precio: number){}
    
  public getId(): number{
    return this.id;
  }
  
  public getNombre(): string{
    return this.nombre;
  }
  
  public setNombre(nombre: string): void {
    this.nombre = nombre;
  }

  public getPrecio(): number{
    return this.precio;
  }
  
  public setPrecio(precio: number): void {
    this.precio = precio;
  }
}