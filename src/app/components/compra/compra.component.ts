import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Compra, Item } from 'src/app/models/Compra';
import { CompraService } from 'src/app/services/CompraService';
import { MensajeService } from 'src/app/services/MensajeService';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent {
  fechaMaxima = new Date();
  compras: Compra[] = [];
  compraForm: FormGroup;
  expandedElement: Compra | null = null;

  constructor(private compraService: CompraService, private router: Router, private mensajeService: MensajeService, private fb: FormBuilder){
    this.compraService.getCompras().subscribe({
      next: (data) =>{
        this.compras = data;
      },
      error: (data) => {
        this.error();
      }
    });

    this.compraForm = fb.group({
      fechaDesde: [new Date().toString(), Validators.required],
      fechaHasta: [new Date().toString(), Validators.required]
    });
  }

  private error(){
    this.mensajeService.mostrarMensaje("Error al obtener sugerencias");
    //this.router.navigate(['sugerencia']);
  }

  trackById(index: number, item: Item | Compra): number | null {
      return item.getId();
    }
  
  getComprasEntreFechas(event: Event): void{
    if(!this.compraForm.get('fechaDesde')?.valid || !this.compraForm.get('fechaHasta')?.valid){
      return;
    }

    this.compraService.getComprasEntreFechas(this.compraForm.get('fechaDesde')?.value,this.compraForm.get('fechaHasta')?.value).subscribe({
      next: (data) =>{
        this.compras = data;
      },
      error: (data) => {
        this.error();
      }
    });
  }

  toggleExpand(compra: Compra) {
      this.expandedElement = this.expandedElement === compra ? null : compra;
    }
  
}
