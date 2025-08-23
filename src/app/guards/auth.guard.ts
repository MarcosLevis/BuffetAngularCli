import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/AuthService';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot): boolean {
    if (this.authService.isAuthenticated()) {
      let roles: string[];
      
      if(route.data['roles'] === undefined || route.data['roles'].length < 1){//no se indicaron roles
        return true;
      }
      else{
        roles = route.data['roles'];
      }
      
      const usuario: Usuario | null = this.authService.getCurrentUser();
      if(usuario === null || usuario.rol === undefined){
        return false;
      }

      if (roles.includes(usuario.rol.nombre)){
        return true;
      }
      else{
        this.router.navigate(['/login']);
        return false;  
      }
    } else {
        this.router.navigate(['/login']);
        return false;//buscar '//cambiar'
    }
  }
}
