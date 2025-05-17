import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TurnoDTO } from 'src/app/DTO/TurnoDTO';
import { MensajeService } from 'src/app/services/MensajeService';
import { TurnoService } from 'src/app/services/TurnoService';

@Component({
  selector: 'app-agregar-turno',
  templateUrl: './agregar-turno.component.html',
  styleUrls: ['./agregar-turno.component.css']
})
export class AgregarTurnoComponent {
  
  turnoForm: FormGroup;
  turnoEditar: TurnoDTO | undefined;

  constructor(fb: FormBuilder, @Inject(MAT_DIALOG_DATA) data: {turnoEditar: TurnoDTO | undefined} | undefined,
    public dialog: MatDialogRef<AgregarTurnoComponent>, private turnoService:TurnoService, private mensajeService: MensajeService){
    this.turnoForm = fb.group({
      nombre: new FormControl((!!data?.turnoEditar ? data.turnoEditar.nombre : ''), [Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
      entrada: new FormControl((!!data?.turnoEditar ? data.turnoEditar.horaEntrada : '8:00'), [Validators.required, Validators.minLength(3), Validators.pattern(/^([01][0-9]|2[0-3]):([0-5][0-9])$/)]), // expresión regular para validar formato HH:mm
      salida: new FormControl((!!data?.turnoEditar ? data.turnoEditar.horaSalida : '12:00'), [Validators.required, Validators.minLength(3), Validators.pattern(/^([01][0-9]|2[0-3]):([0-5][0-9])$/)]), // idem
    });
    this.turnoEditar = data?.turnoEditar;
  }

  onSubmit(){
    if(this.turnoForm.valid){
      let entrada = this.turnoForm.get('entrada')?.value;
      let salida = this.turnoForm.get('salida')?.value;
      if(this.comprobarFechas(entrada,salida)){
        if(!this.turnoEditar){
          this.turnoService.createTurno(new TurnoDTO({
            nombre: this.turnoForm.get('nombre')?.value,
            horaEntrada: entrada,
            horaSalida: salida
          }))
          .subscribe({
            next: (data) =>{
              this.dialog.close(data);
            },
            error: () =>{
              this.mensajeService.mostrarMensaje('Ocurrió un error al crear el turno');
            }
          });
        }
        else{
          this.turnoService.editTurno(new TurnoDTO({
            id: this.turnoEditar?.id,
            nombre: this.turnoForm.get('nombre')?.value,
            horaEntrada: entrada,
            horaSalida: salida
          }))
          .subscribe({
            next: (data) =>{
              this.dialog.close(data);
            },
            error: () =>{
              this.mensajeService.mostrarMensaje('Ocurrió un error al editar el turno');
            }
          });
        }
      }
    }
    else{
      if (this.turnoForm.touched && this.turnoForm.dirty){
        this.mensajeService.mostrarMensaje('Datos inválidos. Por favor, intente nuevamente');
      }
    }
  }

  private comprobarFechas(entrada: any, salida: any): boolean {
    const [entradaH, entradaM] = entrada.split(':').map(Number);
    const [salidaH, salidaM] = salida.split(':').map(Number);
  
    const dateEntrada = new Date();
    dateEntrada.setHours(entradaH, entradaM, 0, 0);
  
    const dateSalida = new Date();
    dateSalida.setHours(salidaH, salidaM, 0, 0);
  
    if (dateEntrada >= dateSalida) {
      this.mensajeService.mostrarMensaje('La hora de entrada debe ser menor a la de salida');
      return false;
    } 
    return true;
  }
  
}
