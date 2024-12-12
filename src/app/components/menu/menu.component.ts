import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgregarMenuComponent } from '../agregar-menu/agregar-menu.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  Menu: any;


  constructor(public dialog: MatDialog) {}

  openDialogAgregarMenu(): void {
    const dialogRef = this.dialog.open(AgregarMenuComponent, {
      width: '450px', // Tamaño del diálogo
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El popup se cerró con el siguiente resultado: ', result);
    });
  }

}
