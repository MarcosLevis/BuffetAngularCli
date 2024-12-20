import { Compra } from "./Compra";
import { Rol } from "./Rol";
import { Sugerencia } from "./Sugerencia";
import { Turno } from "./Turno";

export class Usuario {
  public id: number;
  public dni: string;
  public nombre: string;
  public apellido: string;
  public email: string;
  public password: string;
  public rol?: Rol;
  public sugerencias: Sugerencia[];
  public turnos: Turno[];
  public compras: Compra[];
  public imagen: string;

  constructor(obj?: any) {
    this.id = obj && obj.id || '';
    this.dni = obj && obj.dni || '';
    this.nombre = obj && obj.nombre || '';
    this.apellido = obj && obj.apellido || '';
    this.email = obj && obj.email || '';
    this.password = obj && obj.password || '';
    this.rol = obj && obj.rol || null;
    this.sugerencias = obj && obj.sugerencias || [];
    this.turnos = obj && obj.turnos || [];
    this.compras = obj && obj.compras || [];
    this.imagen = obj && obj.imagen || '';
}
}










