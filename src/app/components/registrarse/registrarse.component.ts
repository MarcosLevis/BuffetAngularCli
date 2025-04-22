import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Usuario } from 'src/app/models/Usuario';
import { AuthService } from 'src/app/services/AuthService';
import { ImagenService } from 'src/app/services/ImagenService';
import { MensajeService } from 'src/app/services/MensajeService';


@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent {

  registroForm: FormGroup;
  imagenBase64: string = '';

  constructor(fb: FormBuilder, public dialogRef: MatDialogRef<RegistrarseComponent>, private authService: AuthService, private mensajeService: MensajeService, private imagenService: ImagenService){
    this.registroForm = fb.group({
      dni: new FormControl('', [Validators.required, Validators.pattern(/^\d{8}$/)]), // Exactamente 8 dígitos
      nombre:  new FormControl('', [Validators.required, Validators.minLength(2)]), // Mínimo 2 caracteres
      apellido:  new FormControl('', [Validators.required, Validators.minLength(2)]), // Mínimo 2 caracteres
      email:  new FormControl('', [Validators.required, Validators.email]), // Formato válido de correo electrónico
      password:  new FormControl('', [Validators.required]),
    });
    this.seleccionarImagenLocal("assets/agregar.png");
  }

  onSubmit() {
    if (this.registroForm.valid) {
      if(this.imagenBase64 == '')
        this.mensajeService.mostrarMensaje("La imagen es obligatoria");

      const usuario = new Usuario(this.registroForm.value)
      usuario.rol = {    
        "nombre": "cliente",
        "tipoRol": "cliente"
      }

      usuario.imagen = this.imagenBase64;

      this.authService.registro(usuario).subscribe({
        next: (data) => {
          this.dialogRef.close(true)
        },
        error: (err) => {
          console.error('Error en el registro:', err);
          this.mensajeService.mostrarMensaje('Datos inválidos. Por favor, intente nuevamente.');
        }
      })
    }
    else {
      this.mensajeService.mostrarMensaje('Datos inválidos. Por favor, intente nuevamente.');
    }
  }

  seleccionarImagenLocal(path: string){
    this.imagenService.seleccionarImagenLocal(path).subscribe({
      next: (data) => {
        this.imagenBase64 = data;
        this.registroForm.get('foto')?.setValue(data);
      },
      error: (err) => {
        this.mensajeService.mostrarMensaje('Error al seleccionar la imagen local');
      }
    });
  }

  seleccionarImagen(event: Event){
    this.imagenService.seleccionarImagen(event).subscribe({
      next: (data) => {
        this.imagenBase64 = data;
        this.registroForm.get('foto')?.setValue(data);
      },

      error: (err) => {
        this.mensajeService.mostrarMensaje('Error al seleccionar la imagen');
      }
    });
  }

  //cambiar que se pasen a imagen service
}
