import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgregarMenuComponent } from '../agregar-menu/agregar-menu.component';
import { Menu} from 'src/app/models/Menu';
import { MenuService } from 'src/app/services/MenuService';
import { EstasSeguroComponent } from '../estas-seguro/estas-seguro.component';
import { Dia } from '../../models/Dia';


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

  constructor(public dialog: MatDialog, private menuService: MenuService) {}
  
  ngOnInit(){
    // this.menuService.getMenus().subscribe(data => {
    //   this.menus = data;
    //   console.log(this.menus);
    // })

    this.menuService.getDias().subscribe(data => {
      this.dias = data.sort((a, b) => a.id - b.id);
    })
  }

  getPaginatedMenus(): any[] {
    const start = this.currentPage * this.itemsPerPage;
    return this.dias.slice(start, start + this.itemsPerPage);
  }  

  cambiarPagina(dia: number) {
    this.currentPage = dia;
    this.verVegeta = false;
    this.diaSeleccionadoIndex = dia;
  }

  openDialogAgregarMenu(): void {
      const dialogRef = this.dialog.open(AgregarMenuComponent, {
      width: '450px',
      data: this.dias,
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const menu = new Menu(result)
        menu.tipoMenu = result.vegetariano ? "menuvegetariano" : "menuestandar";
        const dia = this.encontrarDiaPorNombre(result.dia);
        console.log('Antes de ser mandado', menu)
        this.menuService.createMenu(menu, dia).subscribe(data => {
          console.log('Restpuesta ', data);
        });
       
      } else {
        console.log('El usuario canceló el diálogo.');
      }
    });
  }

  openDialogEliminarMenu(): void {
    const dialogRef = this.dialog.open(EstasSeguroComponent, {
    width: '450px',
  });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {  
        console.log('Menu fue eliminado')
      } else {
        console.log('El usuario canceló el diálogo de eliminar.');
      }
    });
  }

  verOpcionVegetariana(){
    this.verVegeta = !this.verVegeta
  }

  encontrarDiaPorNombre(diaBuscado: string): Dia{
    let dia = this.dias.find(dia => dia.enumDia === diaBuscado);
    if(!dia){
      dia = new Dia()
    }
    return dia
  }

}

