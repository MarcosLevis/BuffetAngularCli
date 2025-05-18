import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TurnoDTO } from 'src/app/DTO/TurnoDTO';
import { MensajeService } from 'src/app/services/MensajeService';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsuarioService } from 'src/app/services/UsuarioService';

@Component({
  selector: 'app-asignar-turno',
  templateUrl: './asignar-turno.component.html',
  styleUrls: ['./asignar-turno.component.css']
})
export class AsignarTurnoComponent {

  asignar: boolean;
  turnosPosibles: TurnoDTO[] = [];
  usuarioId: number;
  turnoForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private mensajeService: MensajeService, 
  private usuarioService: UsuarioService, private dialog: MatDialogRef<AsignarTurnoComponent>, private fb: FormBuilder) {
    this.asignar = data?.asignar ?? true;
    this.turnosPosibles = data.turnos;
    this.usuarioId = data.usuarioId;
    this.turnoForm = this.fb.group({
      turnoId: [this.turnosPosibles[0]?.id || null]
    });
  }

  onSubmit() {
    const turnoId = this.turnoForm.value.turnoId;

    if (!turnoId) {
      this.mensajeService.mostrarMensaje('No se seleccionó un turno');
      return;
    }
  
    if(this.asignar){
      this.asignarTurno(turnoId);
    }
    else{
      this.sacarTurno(turnoId);
    }
  }

  asignarTurno(turnoId: number){
    this.usuarioService.asignTurno(this.usuarioId,turnoId).subscribe({
      next: (usuarioActualizado) => {
        this.mensajeService.mostrarMensaje('Turno asignado exitosamente');
        this.dialog.close(usuarioActualizado);
      },
      error: () => {
        this.mensajeService.mostrarMensaje('Ocurrió un error al asignar el turno');
      }
    });
  }

  sacarTurno(turnoId: number){
    this.usuarioService.removeTurno(this.usuarioId,turnoId).subscribe({
      next: (usuarioActualizado) => {
        this.mensajeService.mostrarMensaje('Turno quitado exitosamente');
        this.dialog.close(usuarioActualizado);
      },
      error: () => {
        this.mensajeService.mostrarMensaje('Ocurrió un error al quitar el turno');
      }
    });
  }
  
}
