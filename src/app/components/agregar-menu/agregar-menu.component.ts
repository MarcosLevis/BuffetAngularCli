import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-menu',
  templateUrl: './agregar-menu.component.html',
  styleUrls: ['./agregar-menu.component.css']
})
export class AgregarMenuComponent {

  menuForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AgregarMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
      // Inicializar el formulario con datos predefinidos (si existen)
      this.menuForm = this.fb.group({
        // foto: [null], // Inicializamos con null porque es un archivo
        nombre: [data?.nombre || '', Validators.required],
        entrada: [data?.entrada || '', Validators.required],
        platoPrincipal: [data?.platoPrincipal || '', Validators.required],
        bebida: [data?.bebida || '', Validators.required],
        postre: [data?.postre || '', Validators.required],
        precio: [data?.postre || 0, [Validators.required,Validators.min(1), Validators.max(99999.9999)]],
      });
    }

    onAgregarMenu(): void {
      if (this.menuForm.valid) {
        this.dialogRef.close(this.menuForm.value); // Devolver los valores del formulario
      } else {
        console.log('El formulario no es válido');
      }
    }
  
    onCancelar(): void {
      this.dialogRef.close(null); // Cerrar sin devolver nada
    }


}

