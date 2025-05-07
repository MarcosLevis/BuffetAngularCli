import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/Producto';
import { MensajeService } from 'src/app/services/MensajeService';
import { ProductoService } from 'src/app/services/ProductoService';
import { AgregarProductoComponent } from '../agregar-producto/agregar-producto.component';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {
  
  productos: Producto[] = [];

  constructor(private mensajeService: MensajeService, private productoService: ProductoService, private router: Router, private dialog:MatDialog){
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

  openDialogAgregarProducto(){
    const dialogRef = this.dialog.open(AgregarProductoComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.nombre){
        this.agregarOrdenado(result);
      }
    });
  }

  private agregarOrdenado(producto: Producto){
    const index = this.productos.findIndex(p => p.nombre > producto.nombre);
    if (index === -1) {
      this.productos.push(producto);//si no se encuentra una posición (es mayor que todos), agregar al final
    } else {
      this.productos.splice(index, 0, producto);
    }
  }

}
