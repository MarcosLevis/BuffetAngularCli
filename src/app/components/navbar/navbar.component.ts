import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegistrarseComponent } from '../registrarse/registrarse.component';
import { IniciarSesionComponent } from '../iniciar-sesion/iniciar-sesion.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  //loegeado es una variable momentanea para probar la vista
  logeado: boolean = false;

  constructor(public dialog: MatDialog, private router: Router) {}

  ngOnInit(){}


  switch () {
    if(this.logeado){
      this.logeado = false
    } else{
      this.logeado = true
    }
  }

  navigateMenu() {
    this.router.navigate(['menu'])
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
