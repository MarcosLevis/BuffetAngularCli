import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
      dni: new FormControl('', [Validators.required, Validators.pattern(/^\d{8}$/)]), // Exactamente 8 dígitos
      nombre:  new FormControl('', [Validators.required, Validators.minLength(2)]), // Mínimo 2 caracteres
      apellido:  new FormControl('', [Validators.required, Validators.minLength(2)]), // Mínimo 2 caracteres
      email:  new FormControl('', [Validators.required, Validators.email]), // Formato válido de correo electrónico
      password:  new FormControl('', [Validators.required]),
    })
  }

  onSubmit() {
    if (this.registroForm.valid) {

      const usuario = new Usuario(this.registroForm.value)
      usuario.rol = {    
        "nombre": "cliente",
        "tipoRol": "cliente"
      }

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

   normalizarDatos(datos: any): any {
    const normalizado: any = {};
    Object.keys(datos).forEach(key => {
      if (typeof datos[key] === 'object' && datos[key] !== null) {
        normalizado[key] = datos[key].value || ''; // Si es un objeto, tomar el valor de `value`
      } else {
        normalizado[key] = datos[key]; // Si es un valor simple, usarlo directamente
      }
    });
    return normalizado;
  }

}

