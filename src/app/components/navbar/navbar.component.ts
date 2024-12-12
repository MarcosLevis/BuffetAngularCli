import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegistrarseComponent } from '../registrarse/registrarse.component';
import { IniciarSesionComponent } from '../iniciar-sesion/iniciar-sesion.component';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  //loegeado es una variable momentanea para probar la vista
  logeado: boolean = false;

  constructor(public dialog: MatDialog) {}

  ngOnInit(){}


  switch () {
    if(this.logeado){
      this.logeado = false
    } else{
      this.logeado = true
    }
  }

  openDialogRegistrarse(): void {
    const dialogRef = this.dialog.open(RegistrarseComponent, {
      width: '450px', // Tamaño del diálogo
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El popup se cerró con el siguiente resultado: ', result);
    });
  }


  openDialogIniciarSesion(): void {
    const dialogRef = this.dialog.open(IniciarSesionComponent, {
      width: '450px', // Tamaño del diálogo
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El popup se cerró con el siguiente resultado: ', result);
    });
  }


}
