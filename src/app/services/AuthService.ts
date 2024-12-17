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
  API_URL_LOCAL = environment.API_URL;

  constructor(private http: HttpClient, private router: Router) {}


  login(email: string, password: string): Observable<boolean> {

    const url = this.API_URL_LOCAL + '/auth/login/'

    const credenciales = { email, password };
    return this.http.post<Usuario>(this.API_URL_LOCAL, credenciales).pipe(
      tap((usuario) => {
        this.currentUser = usuario;
        localStorage.setItem('usuario', JSON.stringify(usuario));
      }),
      map(() => true),
      catchError(() => of(false)) // Devuelve `false` si ocurre un error
    );
  }

  //ESTO ES SI QUEREMOS USAR LOCALSTORAGE


  // // Obtener el usuario actual desde el almacenamiento
  // getCurrentUser(): Usuario | null {
  //   if (!this.currentUser) {
  //     const storedUser = localStorage.getItem('usuario');
  //     this.currentUser = storedUser ? JSON.parse(storedUser) : null;
  //   }
  //   return this.currentUser;
  // }

  // // Verifica si el usuario tiene un rol específico
  // hasRole(rol: string): boolean {
  //   return this.getCurrentUser()?.rol == rol;
  // }

  // // Verifica si el usuario está autenticado
  // isAuthenticated(): boolean {
  //   return !!this.getCurrentUser();
  // }

  // // Cerrar sesión
  // logout(): void {
  //   this.currentUser = null;
  //   localStorage.removeItem('usuario');
  //   this.router.navigate(['/home']);
  // }
}
