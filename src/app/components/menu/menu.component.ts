import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgregarMenuComponent } from '../agregar-menu/agregar-menu.component';
import { Menu } from 'src/app/models/Menu';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  pruebaMenu: Menu;
  semana: Menu [] = [];

  constructor(public dialog: MatDialog) {
    this.pruebaMenu = {
      nombre: 'Menu 1',
      entrada: 'Ensalada',
      platoPrincipal: 'Arroz con pollo',
      bebida: 'Cocucha',
      postre: 'Flan',
      precio: 100,
    };
  }
  
  ngOnInit(){

  }


  openDialogAgregarMenu(): void {
    const initialData = {
      nombre: '',
      entrada: '',
      plato: '',
      bebida: '',
      postre: ''
    };
  
    const dialogRef = this.dialog.open(AgregarMenuComponent, {
      width: '450px',
      data: initialData
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Datos del formulario:', result);
        // Aquí puedes manejar los datos enviados desde el formulario
      } else {
        console.log('El usuario canceló el diálogo.');
      }
    });
  }

}
