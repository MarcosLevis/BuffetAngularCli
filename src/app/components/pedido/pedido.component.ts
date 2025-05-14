import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { Producto } from 'src/app/models/Producto';
import { Pedido } from 'src/app/models/Pedido';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent {

  pedidos: Pedido[] = [];
  @Output() agregarExitoso: EventEmitter<boolean> = new EventEmitter();

  constructor(){
    this.pedidos = [];
  }


  getSlice(texto: string, start: number, end: number): string {
    return texto.slice(start, end);
  }

  trackById(index: number, item: Producto): number | null {
    return item.id;
  }

  getTotal() {
    return this.pedidos.reduce((total, pedido) => {
      return total + (pedido.cantidad * pedido.precio);
    }, 0);
  }
  

  public agregarAlPedido(producto: Producto){
    let index = this.pedidos.findIndex(p => p.id == producto.id);
    if (index === -1) {
      const pedido = new Pedido(producto);
      index = this.pedidos.findIndex(p => p.nombre > producto.nombre);
      if(index === -1){
        this.pedidos.push(pedido);
      }
      else{
        this.pedidos.splice(index,0,pedido);
      }
    }
    else {//lo encontré, actualizo cantidades
      this.pedidos[index].cantidad++;
    }
    this.agregarExitoso.emit(true);
  }

  public sacarDelPedido(producto: Producto){
    let index = this.pedidos.findIndex(p => p.id == producto.id);
    if (index != -1) {
      if(this.pedidos[index].cantidad > 1){
        this.pedidos[index].cantidad--;
      }
      else{
        this.pedidos.splice(index,1);
      }
    }
    this.agregarExitoso.emit(false);
  }
}
