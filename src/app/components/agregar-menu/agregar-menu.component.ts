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
  base64Image: string | null = null;
  imagenError: string | null = null;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AgregarMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
      // Inicializar el formulario con datos predefinidos (si existen)
      this.menuForm = this.fb.group({
        //foto: [data.menu.foto || null, Validators.required], // Inicializamos con null porque es un archivo
        nombre: [data.menu?.nombre || '', Validators.required],
        entrada: [data.menu?.entrada || '', Validators.required],
        platoPrincipal: [data.menu?.platoPrincipal || '', Validators.required],
        bebida: [data.menu?.bebida || '', Validators.required],
        postre: [data.menu?.postre || '', Validators.required],
        precio: [data.menu?.precio || 0, [Validators.required,Validators.min(1), Validators.max(99999.9999)]],
        vegetariano: [data?.vegetariano || false, [Validators.required]],
        dia: [data?.dia || '', [Validators.required]],
      });
      console.log(data.dias)
    }

    onAgregarMenu(): void {
      const result = {base64: this.base64Image, objeto: this.menuForm.value}
      console.log('Resultado', result)
      if (this.menuForm.valid) {
        this.dialogRef.close(result); // Devolver los valores del formulario
      } else {
        console.log('El formulario no es válido');
      }
    }
    
    onCancelar(): void {
      this.dialogRef.close(null); // Cerrar sin devolver nada
    }


    onFileChange(event: Event): void {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
        this.menuForm.get('foto')?.setValue(file);
      }
    }

    onFileSelected(event: Event): void {
      const file = (event.target as HTMLInputElement).files?.[0];
  
      if (file) {
        if (file.size > 1 * 600 * 600) { // Limitar a 2MB
          this.imagenError = 'El archivo debe ser menor a 2MB.';
          this.base64Image = null;
          return;
        }
  
        const reader = new FileReader();
        reader.onload = () => {
          this.base64Image = reader.result as string;
          this.imagenError = null;
          //console.log('Base64:', this.base64Image); // El base64 se guarda en `base64Image`
        };
        reader.onerror = () => {
          this.imagenError = 'Error al leer el archivo.';
          this.base64Image = null;
        };
  
        reader.readAsDataURL(file); // Convierte a base64
      }
    }


}

