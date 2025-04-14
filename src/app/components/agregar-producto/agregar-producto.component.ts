import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductoDTO } from 'src/app/DTO/ProductoDTO';
import { MensajeService } from 'src/app/services/MensajeService';
import { ProductoService } from 'src/app/services/ProductoService';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent {
  productoForm: FormGroup;

  constructor(fb: FormBuilder, public dialogRef: MatDialogRef<AgregarProductoComponent>, private mensajeService: MensajeService, private productoService: ProductoService){
    this.productoForm = fb.group({
      nombre:  new FormControl('', [Validators.required, Validators.minLength(2)]), // Mínimo 2 caracteres
      precio:  new FormControl('', [Validators.required, Validators.min(0)]), // Mayor o igual a cero
    });
  }

  onSubmit() {
    let mensaje;
    if (this.productoForm.valid) {
      //ajustar la creación, DTO y clase común
      const producto = new ProductoDTO(this.productoForm.value)

      this.productoService.createProducto(producto).subscribe({
        next: (data) => {
          mensaje = 'Producto creado con exito';
          console.log(mensaje, data);
          this.dialogRef.close(true)
        },
        error: (err) => {
          console.error(':', err);
          mensaje = 'Ocurrió un error al crear el producto';
        }
      });
    }
    else {
      mensaje = 'Datos inválidos. Por favor, intente nuevamente';
      console.log(mensaje);
    }
    this.mensajeService.mostrarMensaje();
  }

}
