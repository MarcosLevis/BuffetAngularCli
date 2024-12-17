import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgregarMenuComponent } from '../agregar-menu/agregar-menu.component';
import { Menu} from 'src/app/models/Menu';
import { MenuService } from 'src/app/services/MenuService';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  pruebaMenu!: Menu;
  menus: Menu [] = [];
  currentPage: number = 0;
  itemsPerPage: number = 1;
  diasSemana: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];



  constructor(public dialog: MatDialog, private menuService: MenuService) {
  }
  
  ngOnInit(){
    this.menuService.getMenus().subscribe(data => {
      this.menus = data;
      console.log(this.menus);
    })
  }

  getPaginatedMenus(): any[] {
    const start = this.currentPage * this.itemsPerPage;
    return this.menus.slice(start, start + this.itemsPerPage);
  }
  
  nextPage(): void {
    if ((this.currentPage + 1) * this.itemsPerPage < this.menus.length) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  cambiarPagina(dia: number) {
    this.currentPage = dia;
  }


  openDialogAgregarMenu(): void {
      const dialogRef = this.dialog.open(AgregarMenuComponent, {
      width: '450px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pruebaMenu = result;
        // esto es de prueba
        this.pruebaMenu.tipoItem = 'tipoMenu'
        this.pruebaMenu.tipoMenu = 'menuestandar'
        console.log('Menu pre llamado api ', this.pruebaMenu)

        this.menuService.createMenu(this.pruebaMenu).subscribe(data => {
          console.log('Restpuesta ', data);
        });
       
      } else {
        console.log('El usuario canceló el diálogo.');
      }
    });
  }

}
