import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductoDTO } from 'src/app/DTO/ProductoDTO';
import { Producto } from 'src/app/models/Producto';
import { MensajeService } from 'src/app/services/MensajeService';
import { ProductoService } from 'src/app/services/ProductoService';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent {
  productoForm: FormGroup;
  private productoEditar: Producto | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) data: {productoEditar: Producto | undefined}, fb: FormBuilder, public dialogRef: MatDialogRef<AgregarProductoComponent>,
     private mensajeService: MensajeService, private productoService: ProductoService){
      this.productoEditar = data.productoEditar;
      this.productoForm = fb.group({
      nombre:  new FormControl((this.productoEditar) ? this.productoEditar.nombre : '', [Validators.required, Validators.minLength(2)]), // Mínimo 2 caracteres
      precio:  new FormControl((this.productoEditar) ? this.productoEditar.precio : '', [Validators.required, Validators.min(0)]), // Mayor o igual a cero
    });
  }

  onSubmit() {
    let mensaje: string;
    let producto: Producto | undefined;
  
    if (this.productoForm.valid) {
      if(this.productoEditar){
        this.productoEditar.nombre = this.productoForm.value.nombre;
        this.productoEditar.precio = this.productoForm.value.precio;
        this.productoService.editProducto(this.productoEditar).subscribe({
          next: (data) => {
            mensaje = 'Producto editado con éxito';
            producto = data;
          },
          error: () => {
            mensaje = 'Ocurrió un error al editar el producto';
            producto = undefined;
          },
          complete: () => {
            this.mensajeService.mostrarMensaje(mensaje);
            this.dialogRef.close(producto);
          }
        });
      }
      else{
        let productoDTO = new ProductoDTO(this.productoForm.value);
    
        this.productoService.createProducto(productoDTO).subscribe({
          next: (data) => {
            mensaje = 'Producto creado con éxito';
            producto = data;
          },
          error: () => {
            mensaje = 'Ocurrió un error al crear el producto';
            producto = undefined;
          },
          complete: () => {
            this.mensajeService.mostrarMensaje(mensaje);
            this.dialogRef.close(producto);
          }
        });
      }
    }
    else {
      mensaje = 'Datos inválidos. Por favor, intente nuevamente';
      this.mensajeService.mostrarMensaje(mensaje);
    }
  }
  
  

}
