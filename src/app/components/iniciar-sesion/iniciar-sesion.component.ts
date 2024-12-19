import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/AuthService';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent {


  loginForm: FormGroup;
  
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<IniciarSesionComponent>, private authService: AuthService,private snackbar: MatSnackBar) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required]),  // Add validation here if needed
      password: new FormControl('', [Validators.required])  // Add validation here if needed
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.email,this.loginForm.value.password).subscribe({
        next: (data) => {
          console.log('Login exitoso:', data);
          this.dialogRef.close(true)
        },
        error: (err) => {
          console.error('Error en el login:', err);
          this.mostrarError('Datos inválidos. Por favor, intente nuevamente.'); // Llamada a una función para manejar el error
        }
      })
    }
    else {
      console.log('Formulario de login inválido');
    }
  }

  mostrarError(mensaje: string): void {
    this.snackbar.open(mensaje, 'Cerrar', {
       duration: 5000,
       horizontalPosition: 'center',
       verticalPosition: 'bottom',
     });
   }


}