import { Hora } from "./Hora";

export interface Turno {
    id: number;
    nombre: string;
    horaEntrada: Hora;
    horaSalida: Hora;
  }