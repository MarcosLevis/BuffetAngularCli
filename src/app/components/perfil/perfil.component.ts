import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/Usuario';
import { AuthService } from 'src/app/services/AuthService';
import { Router } from '@angular/router';
import { MensajeService } from 'src/app/services/MensajeService';
import { UsuarioService } from 'src/app/services/UsuarioService';
import { UsuarioDTO } from 'src/app/DTO/UsuarioDTO';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  estaEditando: boolean = false;
  imagenAnterior: string = '';
  perfilForm: FormGroup;
  usuario: Usuario | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService,private mensajeService: MensajeService, private usuarioService: UsuarioService, router: Router){
    let buscado = authService.getCurrentUser();
    if(buscado){
      this.usuario = buscado;
    }
    else{
      router.navigate(['/login']);
    }
    this.perfilForm = this.fb.group({
      dni: new FormControl(this.usuario?.dni, [Validators.required, Validators.pattern(/^\d{8}$/)]), //8 dígitos
      email: new FormControl(this.usuario?.email, [Validators.required, Validators.email]), //correo electrónico
      nombre: new FormControl(this.usuario?.nombre, [Validators.required, Validators.minLength(2)]), //mínimo 2 caracteres
      apellido: new FormControl(this.usuario?.apellido, [Validators.required, Validators.minLength(2)]), //mínimo 2 caracteres
    });
    this.imagenAnterior = this.usuario?.imagen ?? "";
  }

  cambio() {
    this.estaEditando = !this.estaEditando;
  }

  cancelar() {
    this.cambio();
    if(this.usuario != null){
      this.usuario.imagen = this.imagenAnterior;
    }
  }


  cambiarFoto(event: Event) {
    const imagen = event.target as HTMLInputElement;
    if (imagen?.files?.length) {
      const imagenSeleccionada = imagen.files[0];
      const lector = new FileReader();
      lector.onload = () => {
        if(this.usuario){
          this.usuario.imagen = (lector.result as string).split(",")[1];//le saco la parte que indica el tipo y que es un base64
          this.usuario.tipoMime = (lector.result as string).split(",")[0];//la pongo acá
        }
      };;
      lector.readAsDataURL(imagenSeleccionada);
    }
  }
  

  onSubmit(){
    if(!this.estaEditando){
      return;
    }
    if(!this.perfilForm.valid){
      this.mensajeService.mostrarMensaje();
    }
    else{
      const actualizado: UsuarioDTO = new UsuarioDTO({
        id: this.usuario?.id,
        dni: this.perfilForm.value.dni ?? this.usuario?.dni,
        email: this.perfilForm.value.email ?? this.usuario?.email,
        nombre: this.perfilForm.value.nombre ?? this.usuario?.nombre,
        apellido: this.perfilForm.value.apellido ?? this.usuario?.apellido,
        imagen: this.usuario?.imagen,
        tipoMime: this.usuario?.tipoMime,
        rol: this.usuario?.rol
      });

      this.usuarioService.editUsuario(actualizado).subscribe({
        next: (data) => {
          this.mensajeService.mostrarMensaje("Edición exitosa.");
          this.estaEditando = false;
          this.usuario = data;
          this.imagenAnterior = this.usuario?.imagen;
          this.authService.setCurrentUser(this.usuario);
        },
        error: (err) => {
          this.mensajeService.mostrarMensaje('Datos inválidos. Por favor, intente nuevamente.');
        }
      })
    }
  }

  armarImagen(){
    if(this.usuario?.tipoMime && this.usuario.imagen)
      return this.usuario?.tipoMime + ',' + this.usuario.imagen;
    return '';
  }

}
