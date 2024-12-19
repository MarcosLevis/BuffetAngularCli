import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {  map } from 'rxjs/operators';
import { Usuario } from '../models/Usuario'
import { LoginResponse } from '../models/LoginResponse'
@Injectable({
  providedIn: 'root',
})

export class AuthService {
 
  private currentUser: Usuario | null = null;
  private token: string | null = null;
  urlbase = '/api'

  constructor(private http: HttpClient, private router: Router) {}

  registro(usuario: Usuario): Observable<Usuario>{
    const url = this.urlbase + '/usuarios/';
    console.log('url en servicel', url)
    return this.http.post<Usuario>(url,usuario).pipe(map(res => res));   
  }
  
  login(email: string, password: string): Observable<LoginResponse> {
    const credenciales = { email, password };
    const url = this.urlbase + '/auth/login';
    return this.http.post<LoginResponse>(url, credenciales).pipe(
      map((res: LoginResponse) => {
        localStorage.setItem('accessToken', res.token);
        localStorage.setItem('usuario', JSON.stringify(res.usuario));
        const actual = new LoginResponse(res);
        this.currentUser = actual.getUsuario();
        this.token = actual.getToken();
        return res;
      })
    )
  }

  logout(): void {
    this.currentUser = null;
    this.token = null;
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    this.router.navigate(['home']);
  }

  getCurrentUser(): Usuario | null {
    try{
      if (!this.currentUser) {
        const storedUser = localStorage.getItem('usuario');
        this.currentUser = storedUser ? JSON.parse(storedUser) : null;
      }
    }
    catch(error){
      console.log("Error al recuperar el usuario actual: " + error);
    }
    finally{
      return this.currentUser;
    }
  }

  getCurrentToken(): string | null {
    try{
      if (!this.token) {
        const storedToken = localStorage.getItem('accessToken');
        this.token = storedToken ? storedToken : null;
      }
    }
    catch(error){
      console.log("Error al recuperar el usuario actual: " + error);
    }
    finally{
      return this.token;
    }
  }

  isAdministrador():boolean{
    return this.getCurrentUser()?.rol?.tipoRol === "administrador";
  }

  isResponsableTurno():boolean{
    return this.getCurrentUser()?.rol?.tipoRol ==="responsable-turno";
  }

  isCliente():boolean{
    return this.getCurrentUser()?.rol?.tipoRol === "cliente";
  }

  hasRole(rol: string): boolean {
    return (this.getCurrentUser()?.rol?.tipoRol === rol || this.getCurrentUser()?.rol?.nombre === rol);
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentToken() && !!this.getCurrentUser();
    //se convierte a false si es distinto de cero, null, undefined y vacío (es decir, si NO es "falsy")
    // Luego el siguiente not lo niega para obtener el resultado lógico esperado
  }
}



