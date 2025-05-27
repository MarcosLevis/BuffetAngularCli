import { Compra } from "../models/Compra";
import { Rol } from "../models/Rol";
import { Sugerencia } from "../models/Sugerencia";
import { Turno } from "../models/Turno";

export class UsuarioDTO {//el cambio es la falta de password
  public id: number;
  public dni: string;
  public nombre: string;
  public apellido: string;
  public email: string;
  public rol?: Rol;
  public sugerencias: Sugerencia[];
  public turnos: Turno[];
  public compras: Compra[];
  public imagen: string;
  public tipoMime: string;

  constructor(obj?: any) {
    this.id = obj && obj.id || '';//me parece que va a haber que borrar esto para poder crear a los responsables de turno
    this.dni = obj && obj.dni || '';
    this.nombre = obj && obj.nombre || '';
    this.apellido = obj && obj.apellido || '';
    this.email = obj && obj.email || '';
    this.rol = obj && obj.rol || null;
    this.sugerencias = obj && obj.sugerencias || [];
    this.turnos = obj && obj.turnos || [];
    this.compras = obj && obj.compras || [];
    this.imagen = obj && obj.imagen || '';
    this.tipoMime = obj && obj.tipoMime || '';
  }
}










