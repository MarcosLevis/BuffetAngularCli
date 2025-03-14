import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Usuario } from 'src/app/models/Usuario';
import { AuthService } from 'src/app/services/AuthService';
import { MensajeService } from 'src/app/services/MensajeService';


@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent {

  registroForm: FormGroup;
  imagenBase64: string;

  constructor(fb: FormBuilder, public dialogRef: MatDialogRef<RegistrarseComponent>, private authService: AuthService, private mensajeService: MensajeService){
    this.registroForm = fb.group({
      dni: new FormControl('', [Validators.required, Validators.pattern(/^\d{8}$/)]), // Exactamente 8 dígitos
      nombre:  new FormControl('', [Validators.required, Validators.minLength(2)]), // Mínimo 2 caracteres
      apellido:  new FormControl('', [Validators.required, Validators.minLength(2)]), // Mínimo 2 caracteres
      email:  new FormControl('', [Validators.required, Validators.email]), // Formato válido de correo electrónico
      password:  new FormControl('', [Validators.required]),
    });
    this.imagenBase64 = '';
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
          console.log('Registro exitoso:', data);
          this.dialogRef.close(true)
        },
        error: (err) => {
          console.error('Error en el registro:', err);
          this.mensajeService.mostrarMensaje('Datos inválidos. Por favor, intente nuevamente.');
        }
      })
    }
    else {
      console.log('Formulario de registro inválido');
      this.mensajeService.mostrarMensaje('Datos inválidos. Por favor, intente nuevamente.');
    }
  }

  seleccionarImagen(event: Event): void {
    const imagen = event.target as HTMLInputElement;
    if (imagen?.files?.length) {
      const imagenSeleccionada = imagen.files[0];
      
      // FileReader convierte la imagen a base64
      const lector = new FileReader();
      lector.onload = () => {
        this.imagenBase64 = (lector.result as string).split(",")[1];//le saco la parte que indica el tipo y que es un base64
        console.log("BASE 64: " + this.imagenBase64.substring(0,20))//cambiar
      };;
      lector.readAsDataURL(imagenSeleccionada);
      //pegarle a la api ?? si ya tengo el base64 entonces no
    }
  }

  //manejar la selección de las imágenes predefinidas (perro, gato)
  setImagenBase64(imagen: string): void {
    const img = new Image();
    img.src = imagen;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const contexto = canvas.getContext('2d');
      if (contexto) {
        canvas.width = img.width;
        canvas.height = img.height;
        contexto.drawImage(img, 0, 0);
        this.imagenBase64 = canvas.toDataURL().split(',')[1]; //solo la parte Base64
        console.log("BASE 64 (Imagen predefinida): " + this.imagenBase64);//cambiar
      }
    };
  }
}
