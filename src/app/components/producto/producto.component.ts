import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/Producto';
import { MensajeService } from 'src/app/services/MensajeService';
import { ProductoService } from 'src/app/services/ProductoService';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {
  
  productos: Producto[] = [];

  constructor(private mensajeService: MensajeService, private productoService: ProductoService, private router: Router){
    productoService.getProductosAlfabeticamente().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: () => {
        this.mensajeService.mostrarMensaje("Ocurrió un error al cargar los productos");
        this.router.navigate(['menu']);
      }
    });
  }

  trackById(index: number, item: Producto): number | null {
    return item.id;
  }


}
