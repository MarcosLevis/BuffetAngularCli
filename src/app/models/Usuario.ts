import { Compra } from "./Compra";
import { Rol } from "./Rol";
import { Sugerencia } from "./Sugerencia";
import { Turno } from "./Turno";

export interface Usuario {
  id: number;
  dni: string;
  nombre: string;
  apellido: string;
  email: string;
  rol?: Rol;
  sugerencias: Sugerencia[];
  turnos: Turno[];
  compras: Compra[];
  imagen: string;
}










