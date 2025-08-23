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
      this.menuForm = this.fb.group({
        nombre: [data.menu?.nombre || '', Validators.required],
        entrada: [data.menu?.entrada || ''],
        platoPrincipal: [data.menu?.platoPrincipal || ''],
        bebida: [data.menu?.bebida || ''],
        postre: [data.menu?.postre || ''],
        precio: [data.menu?.precio || 0, [Validators.required,Validators.min(1), Validators.max(99999.9999)]],
        vegetariano: [data?.vegetariano || false, [Validators.required]],
        dia: [data?.dia || data.dias[0], [Validators.required]],
      });
      if(data.menu?.imagen){
        this.imagenBase64 = data.menu?.imagen;
      }
      else{
        this.seleccionarImagenLocal('assets/agregar.png');
      }
    }

    async agregarMenu(): Promise<void> {
      if (this.menuForm.valid) {
        const menu = this.armarMenu();
        const dia = this.menuForm.get('dia')?.value;
        const confirmacion = await this.confirmar(menu,dia);
        if(confirmacion){
          this.menuService.createMenu(menu, dia).subscribe({
            next: (result) => {
              this.mensajeService.mostrarMensaje(`Se ${this.data.editar ? 'editó' : 'creó'} el menú con éxito`);
              return result;
            },
            error: () => {
              this.mensajeService.mostrarMensaje(`Ocurrió un error al ${this.data.editar ? 'editar' : 'crear'} el menú`);
            }
          });
        }
      } else {
        this.mensajeService.mostrarMensaje('El formulario no es válido');
      }
      this.dialogRef.close(false);
    }

    async confirmar(menu: Menu, dia: Dia): Promise<boolean> {
      let mensaje;
      if(this.data.editar){
        mensaje = `¿Está seguro/a de que quiere editar el menú ${menu.esVegetariano() ? 'vegetariano' : ''} del día '${dia.enumDia}'</p>`;
      }
      else{
        mensaje = `<p>Ya existe un menú ${menu.esVegetariano() ? 'vegetariano' : ''} en el día '${dia.enumDia}'<p>
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

    armarMenu(): Menu {
      return new Menu({
        id: null,
        nombre: this.menuForm.get('nombre')?.value,
        entrada: this.menuForm.get('entrada')?.value,
        platoPrincipal: this.menuForm.get('platoPrincipal')?.value,
        bebida: this.menuForm.get('bebida')?.value,
        postre: this.menuForm.get('postre')?.value,
        precio: this.menuForm.get('precio')?.value,
        //tipoItem: 'menu',
        tipoMenu: (this.menuForm.get('vegetariano')?.value) ? 'menuvegetariano' : 'menuestandar',
        imagen: this.imagenBase64,
      });
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

