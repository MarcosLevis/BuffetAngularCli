import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AgregarMenuComponent } from '../agregar-menu/agregar-menu.component';
import { Menu} from 'src/app/models/Menu';
import { MenuService } from 'src/app/services/MenuService';
import { EstasSeguroComponent } from '../estas-seguro/estas-seguro.component';
import { Dia } from '../../models/Dia';
import { AuthService } from 'src/app/services/AuthService';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AgregarSugerenciaComponent } from '../agregar-sugerencia/agregar-sugerencia.component';
import { MensajeService } from 'src/app/services/MensajeService';
import { ImagenService } from 'src/app/services/ImagenService';
import { firstValueFrom, forkJoin, map, Observable } from 'rxjs';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  menus: Menu [] = [];
  dias: Dia [] = [];
  verVegeta: boolean = false;

  currentPage: number = 0;
  itemsPerPage: number = 1;

  diaSeleccionadoIndex: number = 0;
  AgregarSugerenciaComponent = AgregarSugerenciaComponent;

  constructor(private dialog: MatDialog, private menuService: MenuService, private authService: AuthService, private sanitizer: DomSanitizer, private router: Router, private mensajeService: MensajeService, private imagenService: ImagenService) {}
  
  ngOnInit(){
    this.menuService.getDias().subscribe(data => {
      this.dias = data.sort((a, b) => a.id - b.id);
      if(this.dias.length > 0){
        this.cambiarPagina(0);//lunes
      }
    })
  }

  /// el menu anterior queda registrado en la tabla menu pero no asociado al dia determinado (para estadísticas)
  openDialogCreateMenu(): void {
      const dialogRef = this.dialog.open(AgregarMenuComponent, {
      width: '450px',
      data: {
        titulo: 'Agregar Menú',
        dias: this.dias,
        boton: 'Agregar'
      }
    });
    this.actualizarDia(dialogRef);
  }

  private actualizarDia(dialogRef: MatDialogRef<AgregarMenuComponent>): void {
    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        const diaRecibido = new Dia(result.dia);
        const posicion = this.dias.findIndex(dia => dia.enumDia === diaRecibido.enumDia);
        this.dias[posicion] = diaRecibido;
        await this.buscarImagenesDelDia(this.dias[posicion]);// esperar a que las imágenes Base64 se carguen
      }
    });
  }

  //Abre un formulario con los datos preestablecidos del Menu a editar
  openDialogEditMenu(menu: Menu, dia: Dia): void{
  const menu_local = new Menu(menu); //esto lo hago para que sea una instancia de menu y pueda responder directamente a la funcion menu1.esVegetariano()
    const dialogRef = this.dialog.open(AgregarMenuComponent, {
      width: '450px',
      data: {
        titulo: 'Editar Menú',
        dias: this.dias,
        dia: dia,
        menu: menu_local,
        boton: 'Editar',
        vegetariano: menu_local.esVegetariano(),
        editar: true
      }
    });
    this.actualizarDia(dialogRef);
  }

  /// Instancia un modal que preguna si estas seguro de querer eliminar un menu
  /// Al confirma llama al servicio que edita el Dia poniendole en null el menu correspondiente. 
  /// El objeto menu queda guardado en la tabla Menu pero sin estar relacionado con el dia
  openDialogDeleteMenu(tipo: string, dia: Dia): void {
    const dialogRef = this.dialog.open(EstasSeguroComponent, {
      width: '450px',
      data:{
        titulo: 'Eliminar Menú',
        contenido: `<p>¿Está seguro/a que quiere eliminar el menú <strong>${tipo}</strong> del día <strong>${dia.enumDia}</strong>?<p>`,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){  
        this.menuService.deleteMenu(tipo,dia).subscribe(data =>{
          this.mensajeService.mostrarMensaje('El menú fue eliminado con éxtio');
        })        
      } 
    });
  }
  
  openDialogSugerir(): void {
    
    const dialogRef = this.dialog.open(AgregarSugerenciaComponent, {
      width: '450px'
    });
    dialogRef.afterClosed().subscribe();
  }

  isAdministrador():boolean{
    return this.authService.isAdministrador();
  }

  getPaginatedMenus(): any[] {
    const start = this.currentPage * this.itemsPerPage;
    return this.dias.slice(start, start + this.itemsPerPage);
  }

  async cambiarPagina(diaIndex: number) {
    this.currentPage = diaIndex;
    this.diaSeleccionadoIndex = diaIndex;
    await this.buscarImagenesDelDia(this.dias[diaIndex]);// esperar a que las imágenes Base64 se carguen
  }

  verOpcionVegetariana(){
    this.verVegeta = !this.verVegeta
  }
  
  //recibe la imagen en 64 y la santiza por seguridad
  public getSanitizedImage(imageBase64: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageBase64);
  }

  encontrarDiaPorNombre(diaBuscado: string): Dia{
    let dia = this.dias.find(dia => dia.enumDia === diaBuscado);
    if(!dia){
      dia = new Dia();
    }
    return dia;
  }

  private async buscarImagenesDelDia(dia: Dia): Promise<void> {
    const observables: Observable<string>[] = [];
  
    if(dia.menuEstandar?.imagenUrl && !dia.menuEstandar.imagen){
      observables.push(
        this.imagenService.recuperarImagenBase64(dia.menuEstandar.imagenUrl).pipe(
          map(base64 => {
            dia.menuEstandar!.imagen = base64;
            return base64;
          })
        )
      );
    }
  
    if(dia.menuVegetariano?.imagenUrl && !dia.menuVegetariano.imagen){
      observables.push(
        this.imagenService.recuperarImagenBase64(dia.menuVegetariano.imagenUrl).pipe(
          map(base64 => {
            dia.menuVegetariano!.imagen = base64;
            return base64;
          })
        )
      );
    }
  
    if(observables.length === 0){
      return Promise.resolve();
    }
  
    // forkJoin espera a que todos los observables se completen
    return firstValueFrom(forkJoin(observables)).then(() => {});
  }
  

  public esCliente(): boolean { return this.authService.isCliente(); }
  public esAdministrador(): boolean { return this.authService.isAdministrador(); }
  public esResponsable(): boolean { return this.authService.isResponsableTurno(); }
}

