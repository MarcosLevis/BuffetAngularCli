import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TurnoDTO } from 'src/app/DTO/TurnoDTO';
import { UsuarioDTO } from 'src/app/DTO/UsuarioDTO';
import { MensajeService } from 'src/app/services/MensajeService';
import { TurnoService } from 'src/app/services/TurnoService';
import { UsuarioService } from 'src/app/services/UsuarioService';
import { EstasSeguroComponent } from '../estas-seguro/estas-seguro.component';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { RegistrarseComponent } from '../registrarse/registrarse.component';
import { AgregarTurnoComponent } from '../agregar-turno/agregar-turno.component';
import { AsignarTurnoComponent } from '../asignar-turno/asignar-turno.component';

@Component({
  selector: 'app-responsable',
  templateUrl: './responsable.component.html',
  styleUrls: ['./responsable.component.css']
})
export class ResponsableComponent {

  turnos: TurnoDTO[] = [];
  responsables: UsuarioDTO[] = [];

  constructor(private turnoService: TurnoService, private usuarioService: UsuarioService, private mensajeService: MensajeService, private router: Router, private dialog: MatDialog){
    turnoService.getTurnosOrdenadosPorHora().subscribe({
      next: (data) => {
        this.turnos = data ?? [];
      },
      error: () => {
        this.mensajeService.mostrarMensaje("Ocurrió un error al cargar los turnos");
        this.router.navigate(['menu']);
      }
    });
    usuarioService.getUsuarios('responsable-turno').subscribe({
      next: (data) => {
        this.responsables = data;
      },
      error: () => {
        this.mensajeService.mostrarMensaje("Ocurrió un error al cargar los responsables");
        this.router.navigate(['menu']);
      }
    });
  }

  async openDialogAgregarTurno(){
    const dialogRef = this.dialog.open(AgregarTurnoComponent, {
      width: '450px'
    });
    const creado = await firstValueFrom(dialogRef.afterClosed());
    let mensaje;
    if(!!creado){
      this.turnos.push(creado);
      mensaje = 'Turno creado con éxito';
    }
    this.mensajeService.mostrarMensaje(mensaje);
  }

  async openDialogEditarTurno(turno: TurnoDTO){
    const dialogRef = this.dialog.open(AgregarTurnoComponent, {
      width: '450px',
      data:{
        turnoEditar: turno
      }
    });
    const editado = await firstValueFrom(dialogRef.afterClosed());
    let mensaje;
    if(!!editado){
      this.reemplazarEditado(editado);
      mensaje = 'Turno editado con éxito';
    }
    this.mensajeService.mostrarMensaje(mensaje);
  }

  private reemplazarEditado(editado: TurnoDTO){
    const index = this.turnos.findIndex(t => t.id = editado.id);
    if(index != -1){
      this.turnos.splice(index,1,editado);
    }
  }

  async openDialogAgregarResponsable(){
    const dialogRef = this.dialog.open(RegistrarseComponent, {
      width: '450px',
      data: {
        rol: 'responsable-turno'
      }
    });
    const creado = await firstValueFrom(dialogRef.afterClosed());
    let mensaje;
    if(!!creado){
      this.responsables.push(creado);
      mensaje = 'Responsable creado con éxito';
    }
    this.mensajeService.mostrarMensaje(mensaje);
  }

  async openDialogAsignarTurno(responsable: UsuarioDTO){
    if(responsable.turnos.length == this.turnos.length){
      this.mensajeService.mostrarMensaje(`${responsable.nombre} ya cuenta con todos los turnos existentes`);
      return;
    }
    const dialogRef = this.dialog.open(AsignarTurnoComponent, {
      width: '450px',
      data:{
        asignar: true,
        usuarioId: responsable.id,
        turnos: this.turnos.filter(t => !responsable.turnos.map(t => t.id).includes(t.id))
      }
    });
    const responsableAtualizado = await firstValueFrom(dialogRef.afterClosed());
    if(!!responsableAtualizado){
      const index = this.responsables.findIndex(r => r.id == responsableAtualizado.id);
      this.responsables[index] = responsableAtualizado;
    }
  }

  async openDialogSacarTurno(responsable: UsuarioDTO){
    if(responsable.turnos.length == 0){
      this.mensajeService.mostrarMensaje(`${responsable.nombre} no cuenta con turnos`);
      return;
    }
    const dialogRef = this.dialog.open(AsignarTurnoComponent, {
      width: '450px',
      data:{
        asignar: false,
        usuarioId: responsable.id,
        turnos: responsable.turnos
      }
    });
    const responsableAtualizado = await firstValueFrom(dialogRef.afterClosed());
    if(!!responsableAtualizado){
      const index = responsable.turnos.findIndex(t => t.id == t.id);
      responsable.turnos.splice(index,1);
    }
  }

  async openDialogEliminarResponsable(responsable: UsuarioDTO){
    let confirmacion = await this.confirmar(responsable.nombre);
    let mensaje: string;
    if(confirmacion){
      this.usuarioService.deleteUsuario(responsable.id).subscribe({
        next: () => {
          this.removerResponsable(responsable);
          mensaje = 'Responsable eliminado con éxito';
        },
        error: () => {
          mensaje = 'Ocurrió un error al eliminar el responsable'
        },
        complete: () => {
          this.mensajeService.mostrarMensaje(mensaje);
        }
      });
    }
  }

  private async confirmar(nombre: string): Promise<boolean>{
    let mensaje = `<p>¿Está seguro/a que quiere <strong>eliminar</strong> al responsable de turno <strong>${nombre}</strong> del día <strong>?<p>`
    const dialogRef = this.dialog.open(EstasSeguroComponent, {
      width: '450px',
      data:{
        titulo: 'Eliminar responsable de turno',
        contenido: mensaje,
      }
    });
    return await firstValueFrom(dialogRef.afterClosed());
  }

  private removerResponsable(responsable: UsuarioDTO){
    const index = this.responsables.findIndex(r=> r.id == responsable.id);
    if(index != -1){
      this.responsables.splice(index,1);
    }
  }

  trackById(index: number, item: UsuarioDTO | TurnoDTO): number | null {
    return item.id;
  }

}
