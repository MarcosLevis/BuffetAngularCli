import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ImagenService } from 'src/app/services/ImagenService';
import { MensajeService } from 'src/app/services/MensajeService';
import { MenuService } from 'src/app/services/MenuService';
import { Menu } from 'src/app/models/Menu';
import { Dia } from 'src/app/models/Dia';
import { EstasSeguroComponent } from '../estas-seguro/estas-seguro.component';
import { firstValueFrom, map, Observable, of } from 'rxjs';
import { ImagenDTO } from 'src/app/DTO/ImagenDTO';


@Component({
  selector: 'app-agregar-menu',
  templateUrl: './agregar-menu.component.html',
  styleUrls: ['./agregar-menu.component.css']
})
export class AgregarMenuComponent {

  menuForm: FormGroup;
  imagenBase64PrevioEdicion: string | null = null;
  imagenUrlPrevioEdicion: string | null = null;
  imagenBase64: string | null = null;
  imagenSeleccionada: File | null = null;
  imagenError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AgregarMenuComponent>,
    private menuService: MenuService,
    private imagenService: ImagenService,
    private mensajeService: MensajeService,
    @Inject(MAT_DIALOG_DATA) public data: any, private dialog : MatDialog) {
      this.menuForm = this.fb.group({
        nombre: [data.menu?.nombre || '', Validators.required],
        entrada: [data.menu?.entrada || '', Validators.required],
        platoPrincipal: [data.menu?.platoPrincipal || '', Validators.required],
        bebida: [data.menu?.bebida || '', Validators.required],
        postre: [data.menu?.postre || '', Validators.required],
        precio: [data.menu?.precio || 0, [Validators.required,Validators.min(1), Validators.max(99999.9999)]],
        vegetariano: [data?.vegetariano || false, [Validators.required]],
        dia: [data?.dia || data.dias[0], [Validators.required]],
      });
      if(data.editar){
        this.imagenBase64 = data.menu.imagen;//el campo IMAGEN tiene el base 64 --> idea: borrarlo del back, así sólo se usa en el front
        this.imagenBase64PrevioEdicion = data.menu.imagen;
        this.imagenUrlPrevioEdicion = data.menu.imagenUrl;
      }
      else{
        this.seleccionarImagenLocal('assets/agregar.png');
      }
    }

    agregarMenu(): void {
      const mensajeError = `Ocurrió un error al ${this.data.editar ? 'editar' : 'crear'} el menú`;
    
      if (!this.menuForm.valid) {
        this.mensajeService.mostrarMensaje('El formulario no es válido');
        return;
      }
    
      this.armarMenu().subscribe({
        next: (menu) => {
          if (menu === null) {
            this.mensajeService.mostrarMensaje(mensajeError);
            return;
          }
    
          const dia = this.menuForm.get('dia')?.value;
          this.confirmar(menu, dia).then((confirmacion) => {
            if (confirmacion) {
              this.menuService.createMenu(menu, dia).subscribe({
                next: (dia: Dia) => {
                  this.mensajeService.mostrarMensaje(
                    `Se ${this.data.editar ? 'editó' : 'creó'} el menú con éxito`
                  );
                  if(menu.esVegetariano() && dia.menuVegetariano != null){
                    dia.menuVegetariano.imagen = this.imagenBase64;
                  }
                  else{
                    if(dia.menuEstandar != null){
                      dia.menuEstandar.imagen = this.imagenBase64;
                    }
                  }
                  console.log('DIA QUE SE RETORNA',JSON.stringify(dia));
                  this.dialogRef.close(dia);
                },
                error: () => {
                  this.mensajeService.mostrarMensaje(mensajeError);
                }
              });
            }
          });
        },
        error: () => {
          this.mensajeService.mostrarMensaje(mensajeError);
        }
      });
    }

    async confirmar(menu: Menu, dia: Dia): Promise<boolean> {
      let mensaje;
      if(this.data.editar){
        mensaje = `¿Está seguro/a de que quiere editar el <strong>menú ${menu.esVegetariano() ? 'vegetariano' : 'estándar'}</strong> del día <strong>${dia.enumDia}</strong>?</p>`;
      }
      else{
        mensaje = `<p>Ya existe un <strong>menú ${menu.esVegetariano() ? 'vegetariano' : 'estándar'}</strong> en el día <strong>${dia.enumDia}</strong><p>
                      <p>¿Está seguro/a que quiere reemplazarlo?</p>`
      }

      //si ya existe un menu, confirmame que querés reemplazar
      if ((menu.esVegetariano() && dia.menuVegetariano != null) || (!menu.esVegetariano() && dia.menuEstandar != null) ){
        const dialogRef = this.dialog.open(EstasSeguroComponent, {
          width: '450px',
          data:{
            titulo: this.data.editar ? 'Editar Menú'  : 'Reemplazar Menú',
            contenido: mensaje,
          }
        });
        return await firstValueFrom(dialogRef.afterClosed());
      }
      return true;
    }

    armarMenu(): Observable<Menu> {    
      if(this.imagenBase64 != this.imagenBase64PrevioEdicion && this.imagenSeleccionada){
        return this.imagenService.guardarImagen(this.imagenSeleccionada).pipe(
          map(data => this.construirMenu(new ImagenDTO(data.urlImagen).getUrlImagen()))
        );
      }
      else{
        return of(this.construirMenu(this.imagenUrlPrevioEdicion));
      }
    }

    private construirMenu(url: string | null): Menu{
      return new Menu({
        id: null,
        nombre: this.menuForm.get('nombre')?.value,
        entrada: this.menuForm.get('entrada')?.value,
        platoPrincipal: this.menuForm.get('platoPrincipal')?.value,
        bebida: this.menuForm.get('bebida')?.value,
        postre: this.menuForm.get('postre')?.value,
        precio: this.menuForm.get('precio')?.value,
        tipoMenu: (this.menuForm.get('vegetariano')?.value) ? 'menuvegetariano' : 'menuestandar',
        imagen: null,
        imagenUrl: url
      });
    }
 /*    armarMenu(): Observable<Menu> {
      if (!this.imagenSeleccionada) {
        return of(null as unknown as Menu);
      }
    
      return this.imagenService.guardarImagen(this.imagenSeleccionada).pipe(
        map(data => new Menu({
          id: null,
          nombre: this.menuForm.get('nombre')?.value,
          entrada: this.menuForm.get('entrada')?.value,
          platoPrincipal: this.menuForm.get('platoPrincipal')?.value,
          bebida: this.menuForm.get('bebida')?.value,
          postre: this.menuForm.get('postre')?.value,
          precio: this.menuForm.get('precio')?.value,
          tipoMenu: (this.menuForm.get('vegetariano')?.value) ? 'menuvegetariano' : 'menuestandar',
          imagen: null,
          imagenUrl: new ImagenDTO(data.urlImagen).getUrlImagen()
        }))
      );
    }*/   

    seleccionarImagenLocalVIEJO(path: string){
      this.imagenService.seleccionarImagenLocal(path).subscribe({
        next: (data) => {
          this.imagenBase64 = data;
        },
        error: (err) => {
          this.imagenError = 'Error al seleccionar la imagen local';
        }
      });
    }

    seleccionarImagenVIEJO(event: Event){
      this.imagenService.seleccionarImagen(event).subscribe({
        next: (data) => {
          this.imagenBase64 = data;
        },
        error: () => {
          this.imagenError = 'Error al seleccionar la imagen';
        }
      });
    }
    
// Convierte un File a base64
private fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = err => reject(err);
    reader.readAsDataURL(file);
  });
}

// Seleccionar imagen desde archivo local (path)
async seleccionarImagenLocal(path: string): Promise<void> {
  try {
    const file = await firstValueFrom(this.imagenService.seleccionarImagenLocalNUEVO(path));
    this.imagenSeleccionada = file;
    this.imagenBase64 = await this.fileToBase64(file);
  } catch (err) {
    this.imagenError = 'Error al seleccionar la imagen local';
  }
}

// Seleccionar imagen desde input (event)
async seleccionarImagen(event: Event): Promise<void> {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    try {
      const file = input.files[0];
      this.imagenSeleccionada = file;
      this.imagenBase64 = await this.fileToBase64(file);
    } catch {
      this.imagenError = 'Error al convertir la imagen a base64';
    }
  }
}

}

