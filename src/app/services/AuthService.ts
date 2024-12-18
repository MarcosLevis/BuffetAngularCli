import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../environment/environment.development';
import { Usuario } from '../models/Usuario'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
 
  private currentUser: Usuario | null = null;
  private token: string | null = null;
  url_login = environment.API_URL + '/auth/login/';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<boolean> {

    const credenciales = { email, password };
    return this.http.post<loginResponse>(this.url_login, credenciales).pipe(
      tap((loginResponse) => {
        console.log(loginResponse.getToken(),loginResponse.getToken());
        this.currentUser = loginResponse.getUsuario();
        this.token = loginResponse.getToken();
        localStorage.setItem('usuario', JSON.stringify(this.currentUser));
        localStorage.setItem('token', JSON.stringify(this.token));
      }),
      map(() => true),
      catchError(() => of(false)) // Devuelve `false` si ocurre un error
    );
  }

  // Obtener el usuario actual y si no lo tiene, lo busca en el local storage
  getCurrentUser(): Usuario | null {
    try{
      if (!this.currentUser) {
        const storedUser = localStorage.getItem('usuario');
        this.currentUser = storedUser ? JSON.parse(storedUser) : null;
      }
    }
    catch(error){
      console.log("Error al recuperar el usuario actal: " + error);
    }
    finally{
      return this.currentUser;
    }
  }

  isAdministrador(rol: string){
    return this.getCurrentUser()?.rol?.tipoRol === "administrador";
  }

  isResponsableTurno(rol: string){
    return this.getCurrentUser()?.rol?.tipoRol ==="responsable-turno";
  }

  isCliente(rol: string){
    return this.getCurrentUser()?.rol?.tipoRol === "cliente";
  }

  hasRole(rol: string): boolean {
    return (this.getCurrentUser()?.rol?.tipoRol === rol || this.getCurrentUser()?.rol?.nombre === rol);
  }

  isAuthenticated(): boolean {
    return !!this.token && !!this.getCurrentUser();
    //se convierte a false si es distinto de cero, null, undefined y vacío (es decir, si NO es "falsy")
    // Luego el siguiente not lo niega para obtener el resultado lógico esperado
  }


  logout(): void {
    this.currentUser = null;
    this.token = null;
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    this.router.navigate(['home']);
  }
}

class loginResponse{
  private token:string;
  private usuario:Usuario;

  constructor(token:string, usuario:Usuario){
    this.token = token;
    this.usuario = usuario;
  }

  public getToken():string {
    return this.token;
  }

  public getUsuario():Usuario {
    return this.usuario;
  }
}