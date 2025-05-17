export class TurnoDTO {
    id: number;
    nombre: string;
    horaEntrada: string;
    horaSalida: string;

    constructor(obj: any)
    {
        this.id = obj.id && obj.id ;
        this.nombre = obj.nombre && obj.nombre ;
        this.horaEntrada = obj.horaEntrada && obj.horaEntrada;
        this.horaSalida = obj.horaSalida && obj.horaSalida;
    }
}