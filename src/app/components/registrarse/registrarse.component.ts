import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
  rol: string;

  constructor(fb: FormBuilder, public dialogRef: MatDialogRef<RegistrarseComponent>, private authService: AuthService, private mensajeService: MensajeService, private imagenService: ImagenService, @Inject(MAT_DIALOG_DATA) public data: any){
    this.registroForm = fb.group({
      dni: new FormControl('', [Validators.required, Validators.pattern(/^\d{8}$/)]), // Exactamente 8 dígitos
      nombre:  new FormControl('', [Validators.required, Validators.minLength(2)]), // Mínimo 2 caracteres
      apellido:  new FormControl('', [Validators.required, Validators.minLength(2)]), // Mínimo 2 caracteres
      email:  new FormControl('', [Validators.required, Validators.email]), // Formato válido de correo electrónico
      password:  new FormControl('', [Validators.required]),
    });
    this.seleccionarImagenLocal("assets/agregar.png");
    this.rol = data?.rol ?? 'cliente';
  }

  onSubmit() {
    if (this.registroForm.valid) {
      if(this.imagenBase64 == '')
        this.mensajeService.mostrarMensaje("La imagen es obligatoria");

      const usuario = new Usuario(this.registroForm.value)
      usuario.rol = {    
        "nombre": this.rol,
        "tipoRol": this.rol
      }

      usuario.imagen = this.imagenBase64.split(",")[1];
      usuario.tipoMime = this.imagenBase64.split(",")[0];

      this.authService.registro(usuario).subscribe({
        next: (usuario) => {
          this.dialogRef.close(usuario);
        },
        error: () => {
          this.mensajeService.mostrarMensaje('Datos inválidos. Por favor, intente nuevamente.');
        }
      })
    }
    else {
      if(this.registroForm.touched && this.registroForm.dirty){
        this.mensajeService.mostrarMensaje('Datos inválidos. Por favor, intente nuevamente.');
      }
    }
  }

  seleccionarImagenLocal(path: string){
    this.imagenService.seleccionarImagenLocal(path).subscribe({
      next: (data) => {
        this.imagenBase64 = data;
        this.registroForm.get('foto')?.setValue(data);
      },
      error: () => {
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

      error: () => {
        this.mensajeService.mostrarMensaje('Error al seleccionar la imagen');
      }
    });
  }

}
