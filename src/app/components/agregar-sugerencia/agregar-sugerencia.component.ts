import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MensajeService } from 'src/app/services/MensajeService';
import { SugerenciaService } from 'src/app/services/SugerenciaService';
import { CategoriaSugerencia, Sugerencia } from 'src/app/models/Sugerencia';
import { AuthService } from 'src/app/services/AuthService';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-sugerencia',
  templateUrl: './agregar-sugerencia.component.html',
  styleUrls: ['./agregar-sugerencia.component.css']
})
export class AgregarSugerenciaComponent {

  sugerenciaForm: FormGroup;
  categorias: string[];

  constructor (private mensajeService: MensajeService, private sugerenciaService: SugerenciaService,
    private authService: AuthService, private router: Router, private dialogRef: MatDialogRef<AgregarSugerenciaComponent>, fb: FormBuilder){
    this.categorias = Object.values(CategoriaSugerencia);
    this.sugerenciaForm = fb.group({
      tipo: [CategoriaSugerencia.Alimentos],
      texto:  new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(256)])
    });
  }

  onSubmit(){
    if(this.sugerenciaForm.valid){
      const usuario: Usuario | null = this.authService.getCurrentUser();
      if(usuario === null){
        this.router.navigate(['home']);
        return;
      }

      const categoriaSeleccionada: CategoriaSugerencia = this.sugerenciaForm.value.tipo;

      const sugerencia: Sugerencia = {
        id : null,
        texto : this.sugerenciaForm.value.texto,
        fecha: new Date(),
        usuarioId: usuario.id,
        nombreAutor: null,
        categoria: categoriaSeleccionada
      }

      this.sugerenciaService.createSugerencia(sugerencia, usuario).subscribe({
        next: () => {
          this.mensajeService.mostrarMensaje("Sugerencia creada con éxito");
          this.dialogRef.close();
        },
        error: () => {
          this.mensajeService.mostrarMensaje('Ocurrió un error. Por favor, intente nuevamente.');
        }
      });
    }
    else{
      this.mensajeService.mostrarMensaje('Ocurrió un error. Por favor, intente nuevamente.');
    }
  }
}
