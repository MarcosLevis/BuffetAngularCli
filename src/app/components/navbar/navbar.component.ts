import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegistrarseComponent } from '../registrarse/registrarse.component';
import { IniciarSesionComponent } from '../iniciar-sesion/iniciar-sesion.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/AuthService';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  //loegeado es una variable momentanea para probar la vista
  logeado: boolean = false;

  constructor(public dialog: MatDialog, private router: Router,private authService: AuthService,private snackbar: MatSnackBar) {}

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
    });
  }



  openDialogIniciarSesion(): void {
    const dialogRef = this.dialog.open(IniciarSesionComponent, {
      width: '450px', // Tamaño del diálogo
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El popup se cerró con el siguiente resultado: ', result);
      if(result){
        this.authService.login(result.email, result.password).subscribe({
          next: (data) => {
            console.log('Login exitoso:', data);
            this.router.navigate(['home']); // Navega al home solo si el login fue exitoso
          },
          error: (err) => {
            console.error('Error en el login:', err);
            this.mostrarError('Datos inválidos. Por favor, intente nuevamente.'); // Llamada a una función para manejar el error
          }
        });
      }
      this.router.navigate(['home'])
    });
  }

  isLoged():boolean{
    return this.authService.isAuthenticated();
  }

  logOut(){
    this.authService.logout();
  }
  

  mostrarError(mensaje: string): void {
   this.snackbar.open(mensaje, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }




}
