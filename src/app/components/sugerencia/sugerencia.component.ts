import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Sugerencia } from 'src/app/models/Sugerencia';
import { MensajeService } from 'src/app/services/MensajeService';
import { SugerenciaService } from 'src/app/services/SugerenciaService';

@Component({
  selector: 'app-sugerencia',
  templateUrl: './sugerencia.component.html',
  styleUrls: ['./sugerencia.component.css']
})
export class SugerenciaComponent {

  displayedColumns: string[] = ['fecha', 'usuarioNombre', 'categoria', 'texto'];
  sugerencias: Sugerencia[] = [];

  constructor(router: Router, mensajeService: MensajeService, sugerenciaService: SugerenciaService){
    sugerenciaService.getSugerenciasOrdenadasFecha(true).subscribe({
      next: (data) => {
        this.sugerencias = data; 
      },
      error: (err) => { 
        mensajeService.mostrarMensaje("Error al obtener sugerencias");
        router.navigate(['home']);
      }
    });
  }



}
