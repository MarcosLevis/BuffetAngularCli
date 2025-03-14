import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popup-sugerir',
  templateUrl: './popup-sugerir.component.html',
  styleUrls: ['./popup-sugerir.component.css']
})
export class PopupSugerirComponent {

  sugerenciaForm: FormGroup;

  constructor (private router: Router, fb: FormBuilder){
    this.sugerenciaForm = fb.group({
          dni: new FormControl('', [Validators.required, Validators.pattern(/^\d{8}$/)]), // Exactamente 8 dígitos
          nombre:  new FormControl('', [Validators.required, Validators.minLength(2)]), // Mínimo 2 caracteres
          apellido:  new FormControl('', [Validators.required, Validators.minLength(2)]), // Mínimo 2 caracteres
          email:  new FormControl('', [Validators.required, Validators.email]), // Formato válido de correo electrónico
          password:  new FormControl('', [Validators.required]),
        });
  }

  onSubmit(){
    
  }
}
