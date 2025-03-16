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
  expandedElement: Sugerencia | null = null;
  fechaMaxima: String;

  constructor(private router: Router, private mensajeService: MensajeService, private sugerenciaService: SugerenciaService){
    this.getSugerencias(true);
    this.fechaMaxima = this.calcularFechaMaxima();
  }

  getSugerencias(descendente: boolean){
    this.sugerenciaService.getSugerenciasOrdenadasFecha(descendente).subscribe({
      next: (data) => {
        this.sugerencias = data;
      },
      error: (err) => { 
        this.error();
      }
    });
  }

  getSugerenciasFecha(event: Event){
    const input = event.target as HTMLInputElement;  // Casting a HTMLInputElement
    const fecha = input.value  // Acceder a la propiedad value del input
    this.sugerenciaService.getSugerenciasDeUnaFecha(fecha).subscribe({
      next: (data) => {
        this.sugerencias = data;
      },
      error: (err) => { 
        this.error();
      }
    });
  }

  private error(){
    this.mensajeService.mostrarMensaje("Error al obtener sugerencias");
        this.router.navigate(['sugerencia']);
  }

  toggleExpand(sugerencia: Sugerencia) {
    this.expandedElement = this.expandedElement === sugerencia ? null : sugerencia;
  }

  trackById(index: number, item: Sugerencia): number | null {
    return item.id;
  }

  getTextSlice(sugerencia: Sugerencia, start: number, end: number): string {
    return sugerencia.texto.slice(start, end);
  }
  
  private calcularFechaMaxima(): string {
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = (hoy.getMonth() + 1).toString().padStart(2, '0');
    const dia = hoy.getDate().toString().padStart(2, '0');
    return `${año}-${mes}-${dia}`;
  }
}
