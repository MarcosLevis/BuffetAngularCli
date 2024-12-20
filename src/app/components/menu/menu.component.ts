import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgregarMenuComponent } from '../agregar-menu/agregar-menu.component';
import { Menu} from 'src/app/models/Menu';
import { MenuService } from 'src/app/services/MenuService';
import { EstasSeguroComponent } from '../estas-seguro/estas-seguro.component';
import { Dia } from '../../models/Dia';
import { AuthService } from 'src/app/services/AuthService';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


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

  constructor(public dialog: MatDialog, private menuService: MenuService, private authService: AuthService, private sanitizer: DomSanitizer) {}
  
  ngOnInit(){
    this.menuService.getDias().subscribe(data => {
      this.dias = data.sort((a, b) => a.id - b.id);
    })
  }

  /// ESTO SEGURAMENTE SE PUEDE REFACTORIZAR (sacando los if else y hacerlo mas bonito y entendible) JEJE UWU
  /// Crea un nuevo menu en un dia determinado. 
  /// Si ese tipo menu ya existe en ese dia particular, pregunta si esta seguro que quiera reemplazar ese tipo menu en ese dia determinado y al confirmar lo reemplaza
  /// el menu anterior queda registrado en la tabla menu pero no asociado al dia determinado
  openDialogCreateMenu(): void {
      const dialogRef = this.dialog.open(AgregarMenuComponent, {
      width: '450px',
      data: {
        titulo: 'Agregar Menú',
        dias: this.dias,
        boton: 'Agregar'
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const menu = new Menu(result.objeto)
        menu.base64 = "'"+ result.base64+"'"
        menu.tipoMenu = result.vegetariano ? "menuvegetariano" : "menuestandar";
        const dia = this.encontrarDiaPorNombre(result.objeto.dia);
        console.log('Dia', dia)
        if ((result.vegetariano && dia.menuVegetariano != null) || (!result.vegetariano && dia.menuEstandar!= null) ){
          const dialogRef = this.dialog.open(EstasSeguroComponent, {
            width: '450px',
            data:{
              titulo: 'Reemplazar Menú',
              contenido: `<p>Ya existe un <strong>${menu.tipoMenu}</strong> en el día <strong>${dia.enumDia}</strong><p>
                        <p>¿Está seguro/a que quiere reemplazarlo?</p>`,
            }
          });
          dialogRef.afterClosed().subscribe(result => {
            if(result){
              this.menuService.createMenu(menu, dia).subscribe(data => {
                console.log('Restpuesta ', data);
              });
            }
          });         
        }else{
          this.menuService.createMenu(menu, dia).subscribe(data => {
            console.log('Restpuesta ', data);
          });
        }       
      } else {
        console.log('El usuario canceló el diálogo.');
      }
    });    
  }


  /// Instancia un modal que preguna si estas seguro de querer eliminar un menu
  /// Al confirma llama al servicio que edita el Dia poniendole en null el menu correspondiente. 
  /// El objeto menu queda guardado en la tabla Menu pero sin estar relacionado con el dia
  openDialogDeleteMenu(tipo: string, dia: Dia): void {
    const dialogRef = this.dialog.open(EstasSeguroComponent, {
      width: '450px',
      data:{
        titulo: 'Eliminar Menú',
        contenido: `<p>¿Está seguro/a que quiere eliminar el <strong>${tipo}</strong> del día <strong>${dia.enumDia}</strong>?<p>`,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){  
        this.menuService.deleteMenu(tipo,dia).subscribe(data =>{
          console.log('Menú fue eliminado ' + data)
        })        
      } 
      else{
        console.log('El usuario/a canceló el diálogo de eliminar.');
      }
    });
  }


  ///Abre un formulario con los datos preestablecidos del Menu a editar
  ///En caso
  openDialogEditMenu(menu: Menu, dia: Dia): void{
    const menu1 = new Menu(menu) //esto lo hago para que sea una instancia de menu y pueda responder directamente a la funcion menu1.esVegetariano()
    const dialogRef = this.dialog.open(AgregarMenuComponent, {
      width: '450px',
      data: {
        titulo: 'Editar Menú',
        dias: this.dias,
        dia: dia.enumDia,
        menu: menu1,
        boton: 'Editar',
        vegetariano: menu1.esVegetariano(),
        editar: true
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        const menu = new Menu(result)
        menu.tipoMenu = result.vegetariano ? "menuvegetariano" : "menuestandar";
        const dia = this.encontrarDiaPorNombre(result.dia);

        if ((result.vegetariano && dia.menuVegetariano != null) || (!result.vegetariano && dia.menuEstandar!= null) ){
          const dialogRef = this.dialog.open(EstasSeguroComponent, {
            width: '450px',
            data:{
              
              contenido: `<p>¿Está seguro/a que quiere editar el <strong>${menu.tipoMenu}</strong> en el día <strong>${dia.enumDia}</strong>?<p>`,
            }
          });
          dialogRef.afterClosed().subscribe(result => {
            if(result){
              this.menuService.editMenu(menu, dia).subscribe(data => {
                console.log('Restpuesta ', data);
              });
            }
          });         
        }
        else{
          this.menuService.createMenu(menu, dia).subscribe(data => {
            console.log('Restpuesta ', data);
          });
        }       
      } 
      else
      {
        console.log('El usuario canceló el diálogo.');
      }
    });    
  }

  isAdministrador():boolean{
    return this.authService.isAdministrador();
  }

  getPaginatedMenus(): any[] {
    const start = this.currentPage * this.itemsPerPage;
    return this.dias.slice(start, start + this.itemsPerPage);
  }  

  cambiarPagina(dia: number) {
    this.currentPage = dia;
    this.diaSeleccionadoIndex = dia;
  }

  verOpcionVegetariana(){
    this.verVegeta = !this.verVegeta
  }
  
  //recive la imagen en 64 y la santiza por seguridad
  public getSanitizedImage(imageBase64: string): SafeUrl {
    //imageBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, ""); /// hice esto porque creia que le faltaba un espacio
    return this.sanitizer.bypassSecurityTrustUrl(imageBase64);

  }


  //recive la imagen en 64 y la convierte en un bytecode
  // public getBytecode(imageBase64: string): SafeUrl {
  //   const byteCharacters = atob(imageBase64.split(',')[1]);
  //   const byteArrays = [];
  //   for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
  //     const byteArray = new Array(1024);
  //     for (let i = 0; i < 1024 && offset + i < byteCharacters.length; i++) {
  //       byteArray[i] = byteCharacters[offset + i].charCodeAt(0);
  //     }
  //     byteArrays.push(new Uint8Array(byteArray));
  //   }
  //   const blob = new Blob(byteArrays, { type: 'image/png' });
  //   return URL.createObjectURL(blob);
  // }

  

  encontrarDiaPorNombre(diaBuscado: string): Dia{
    console.log('Dia buscado', diaBuscado)
    let dia = this.dias.find(dia => dia.enumDia === diaBuscado);
    if(!dia){
      dia = new Dia()
    }
    console.log('dia por nombre',dia)
    return dia
  }

}

