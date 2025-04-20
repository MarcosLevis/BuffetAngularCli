import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ImagenService } from 'src/app/services/ImagenService';
import { MensajeService } from 'src/app/services/MensajeService';
import { MenuService } from 'src/app/services/MenuService';
import { Menu } from 'src/app/models/Menu';
import { Dia } from 'src/app/models/Dia';
import { EstasSeguroComponent } from '../estas-seguro/estas-seguro.component';
import { firstValueFrom } from 'rxjs';


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
    @Inject(MAT_DIALOG_DATA) public data: any, private dialog : MatDialog) {
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
        dia: ['', [Validators.required]],
      });
      console.log(data.dias);
    }

    async agregarMenu(): Promise<void> {
      if (this.menuForm.valid) {
        const menu = this.armarMenu();
        const dia = this.menuForm.get('dia')?.value;
        const confirmacion = await this.confirmar(menu,dia);
        if(confirmacion){
          this.menuService.createMenu(menu, dia).subscribe({
            next: () => {
              this.mensajeService.mostrarMensaje('Se creó el menú con éxito');
            },
            error: () => {
              this.mensajeService.mostrarMensaje('Ocurrió un error al crear el menú');
            }
          });
        }
      } else {
        this.mensajeService.mostrarMensaje('El formulario no es válido');
      }
      this.dialogRef.close('');
    }

    async confirmar(menu: Menu, dia: Dia): Promise<boolean> {
      if ((menu.esVegetariano() && dia.menuVegetariano != null) || (!menu.esVegetariano() && dia.menuEstandar != null) ){
        const dialogRef = this.dialog.open(EstasSeguroComponent, {
          width: '450px',
          data:{
            titulo: 'Reemplazar Menú',
            contenido: `<p>Ya existe un <strong>menu ${menu.esVegetariano() ? 'vegetariano' : 'estándar'}</strong> en el día <strong>${dia.enumDia}</strong><p>
                      <p>¿Está seguro/a que quiere reemplazarlo?</p>`,
          }
        });
        const result = await firstValueFrom(dialogRef.afterClosed());
        return result === true;
      }
      return true;
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
        tipoItem: 'menu',
        tipoMenu: (this.menuForm.get('vegetariano')?.value) ? 'menuvegetariano' : 'menuestandar',
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
      console.log('SELECCIONASTE:',path);
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

