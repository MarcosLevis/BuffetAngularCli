import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/Producto';
import { MensajeService } from 'src/app/services/MensajeService';
import { ProductoService } from 'src/app/services/ProductoService';
import { AgregarProductoComponent } from '../agregar-producto/agregar-producto.component';
import { firstValueFrom } from 'rxjs';
import { EstasSeguroComponent } from '../estas-seguro/estas-seguro.component';
import { AuthService } from 'src/app/services/AuthService';
import { PedidoComponent } from '../pedido/pedido.component';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {
  
  productos: Producto[] = [];
  @ViewChild(PedidoComponent)pedido!: PedidoComponent;
  public pedidoAgregado: boolean;

  constructor(private mensajeService: MensajeService, private productoService: ProductoService, private router: Router, private dialog:MatDialog, public authService: AuthService){
    this.pedidoAgregado = false;
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

  ngAfterViewInit() {
    // esperar a que el componente hijo esté listo
  }

  trackById(index: number, item: Producto): number | null {
    return item.id;
  }

  async eliminarProducto(producto: Producto){
    const confirmacion: boolean = await this.confirmar(producto);
    if(confirmacion){
      let mensaje: string;
      this.productoService.deleteProducto(producto).subscribe({
        next: () => {
          this.removerProducto(producto);
          mensaje = 'Producto eliminado con éxito';
        },
        error: () => {
          mensaje = 'Ocurrió un error al eliminar el producto'
        },
        complete: () => {
          this.mensajeService.mostrarMensaje(mensaje);
        }
      });
    }
  }

  async confirmar(producto: Producto){
    let mensaje =`¿Está seguro/a de que quiere <strong>eliminar</strong> el producto <strong>${producto.nombre}</strong>?</p>`;
    const dialogRef = this.dialog.open(EstasSeguroComponent, {
      width: '450px',
      data:{
        titulo: 'Eliminar producto',
        contenido: mensaje,
      }
    });
    return await firstValueFrom(dialogRef.afterClosed());
  }

  openDialogAgregarProducto(productoEditar: Producto | undefined = undefined){
    const dialogRef = this.dialog.open(AgregarProductoComponent, {
      width: '450px',
      data: { productoEditar: productoEditar }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.nombre){
        if(productoEditar){
          this.actualizarProducto(result);
        }
        else{
          this.agregarOrdenado(result);
        }
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

  private actualizarProducto(producto: Producto){
    const index = this.productos.findIndex(p => p.id == producto.id);
    if (index != -1) {
      this.productos.splice(index, 1, producto);
    }
  }

  private removerProducto(producto: Producto){
    const index = this.productos.findIndex(p => p.id == producto.id);
    if (index != -1) {
      this.productos.splice(index, 1);
    }
  }

  getSlice(texto: string, start: number, end: number): string {
      return texto.slice(start, end);
  }

  agregarAlPedido(producto: Producto){
    //setTimeout(()=>{
      this.pedido.agregarAlPedido(producto);
  }

  sacarDelPedido(producto: Producto){
    //setTimeout(()=>{
      this.pedido.sacarDelPedido(producto);
  }

  public onProductoAgregado(exito: boolean) {
    this.pedidoAgregado = exito;
  }
}
