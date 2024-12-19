import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/models/Usuario';
import { AuthService } from 'src/app/services/AuthService';



@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent {

  registroForm: FormGroup;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<RegistrarseComponent>, private authService: AuthService,private snackbar: MatSnackBar){
    this.registroForm = this.fb.group({
      dni: new FormGroup('', [Validators.required, Validators.pattern(/^\d{8}$/)]), // Exactamente 8 dígitos
      nombre:  new FormGroup('', [Validators.required, Validators.minLength(2)]), // Mínimo 2 caracteres
      apellido:  new FormGroup('', [Validators.required, Validators.minLength(2)]), // Mínimo 2 caracteres
      email:  new FormGroup('', [Validators.required, Validators.email]), // Formato válido de correo electrónico
      password:  new FormGroup('', [Validators.required]),
    })
  }

  onSubmit() {
    if (this.registroForm.value) {

      //esto no funciona habria que crear el objeto usuario creeria yo, o hacerlo todo como string.
      const usuario = new Usuario(JSON.stringify(this.registroForm.value))
      console.log(usuario)
      this.authService.registro(usuario).subscribe({
        next: (data) => {
          console.log('Registro exitoso:', data);
          this.dialogRef.close(true)
        },
        error: (err) => {
          console.error('Error en el registro:', err);
          this.mostrarError('Datos inválidos. Por favor, intente nuevamente.');
        }
      })
    }
    else {
      console.log('Formulario de registro inválido');
      this.mostrarError('Datos inválidos. Por favor, intente nuevamente.');
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

