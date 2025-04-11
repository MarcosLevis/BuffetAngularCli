import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ImagenService } from 'src/app/services/ImagenService';
import { MensajeService } from 'src/app/services/MensajeService';
import { MenuService } from 'src/app/services/MenuService';
import { Menu } from 'src/app/models/Menu';


@Component({
  selector: 'app-agregar-menu',
  templateUrl: './agregar-menu.component.html',
  styleUrls: ['./agregar-menu.component.css']
})
export class AgregarMenuComponent {

  menuForm: FormGroup;
  imagenBase64: string | null = null;
  imagenError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AgregarMenuComponent>,
    private menuService: MenuService,
    private imagenService: ImagenService,
    private mensajeService: MensajeService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
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

    agregarMenu(): void {
      const result = {base64: this.imagenBase64, objeto: this.menuForm.value};
      let mensaje;
      console.log('Resultado', result)
      if (this.menuForm.valid) {
        const menu = this.armarMenu();
        const dia = this.menuForm.get('dia') || this.data.dias[0];
        this.menuService.createMenu(menu,dia);
        mensaje = 'Se creó el menú con éxito';
        this.dialogRef.close(result); // Devolver los valores del formulario
      } else {
        mensaje = 'El formulario no es válido';
      }
      this.mensajeService.mostrarMensaje(mensaje);
    }

    armarMenu(): Menu {
      return new Menu({
        id: null,
        nombre: this.menuForm.get('nombre')?.value,
        entrada: this.menuForm.get('entrada')?.value,
        platoPrincipal: this.menuForm.get('platoPrincipal')?.value,
        bebida: this.menuForm.get('bebida')?.value,
        postre: this.menuForm.get('postre')?.value,
        precio: this.menuForm.get('precio')?.value,
        tipoItem: this.menuForm.get('tipoItem')?.value,
        tipoMenu: this.menuForm.get('tipoMenu')?.value,
        base64: this.imagenBase64
      });
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
          this.imagenBase64 = null;
          return;
        }
  
        const reader = new FileReader();
        reader.onload = () => {
          this.imagenBase64 = reader.result as string;
          this.imagenError = null;
          //console.log('Base64:', this.base64Image); // El base64 se guarda en `base64Image`
        };
        reader.onerror = () => {
          this.imagenError = 'Error al leer el archivo.';
          this.imagenBase64 = null;
        };
  
        reader.readAsDataURL(file); // Convierte a base64
      }
    }

    seleccionarImagenLocal(path: string){
      this.imagenService.seleccionarImagenLocal(path).subscribe({
        next: (data) => {
          this.imagenBase64 = data;

        },
        error: (err) => {
          this.imagenError = 'Error al seleccionar la imagen local';
        }
      });
    }

    seleccionarImagen(event: Event){
      this.imagenService.seleccionarImagen(event).subscribe({
        next: (data) => {
          this.imagenBase64 = data;
        },

        error: (err) => {
          this.imagenError = 'Error al seleccionar la imagen';
        }
      });
    }
    
}

