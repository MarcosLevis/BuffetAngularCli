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
  semana: Menu [] = [];

  constructor(public dialog: MatDialog, private menuService: MenuService) {
  }
  
  ngOnInit(){
  }
  
  openDialogAgregarMenu(): void {
      const dialogRef = this.dialog.open(AgregarMenuComponent, {
      width: '450px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Datos del formulario:', result);      
        this.pruebaMenu = new Menu(result);

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
