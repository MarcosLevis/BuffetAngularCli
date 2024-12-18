import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/AuthService';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent {


  loginForm: FormGroup;
  
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required]),  // Add validation here if needed
      password: new FormControl('', [Validators.required])  // Add validation here if needed
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.email,this.loginForm.value.password).subscribe({
        next: (loginExitoso) => {
          if(loginExitoso){
            console.log('Login exitoso');
            this.router.navigate(['home']);
          }
          else{
            console.log('Login fallido');
            alert("Credenciales inválidas");
            this.router.navigate(['login']); //tiene sentido?
          }
        }
      })
    }
    else {
      console.log('Formulario de login inválido');
    }
  }
}