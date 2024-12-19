import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegistrarseComponent } from '../registrarse/registrarse.component';
import { IniciarSesionComponent } from '../iniciar-sesion/iniciar-sesion.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/AuthService';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  //loegeado es una variable momentanea para probar la vista
  logeado: boolean = false;

  constructor(public dialog: MatDialog, private router: Router,private authService: AuthService) {}

  ngOnInit(){}

  navigateMenu() {
    this.router.navigate(['menu'])
  }

  openDialogRegistrarse(): void {

    const dialogRef = this.dialog.open(RegistrarseComponent, {
      width: '450px', // Tamaño del diálogo
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El popup se cerró con el siguiente resultado: ', result);
      this.router.navigate(['home'])
    });
  }

  openDialogIniciarSesion(): void {

    const dialogRef = this.dialog.open(IniciarSesionComponent, {
      width: '450px', // Tamaño del diálogo
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El popup se cerró con el siguiente resultado: ', result);
      this.router.navigate(['home'])
    });

  }

  isLoged():boolean{
    return this.authService.isAuthenticated();
  }
  isAdministrador():boolean{
    return this.authService.isAdministrador();
  }

  logOut(){
    this.authService.logout();
  }
  


}
