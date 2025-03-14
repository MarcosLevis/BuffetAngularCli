import { HttpClient } from "@angular/common/http";
import { Usuario } from "../models/Usuario";
import { Observable, map } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { UsuarioDTO } from "../DTO/UsuarioDTO";

@Injectable({providedIn: 'root'})

export class UsuarioService{

    constructor(private http: HttpClient, private router: Router) {}
    //API_URL_LOCAL = environment.API_URL;
    // Ya no usamos el environment, usamos el proxy, porque tiraba errores de CORS  
    API_URL_LOCAL = '/api'

    editUsuario(usuario: UsuarioDTO | null):Observable<Usuario> {
        if(usuario === null)
            this.router.navigate(['/login']);

        const url = `${this.API_URL_LOCAL}/usuarios/`;
        console.log(usuario)
        return this.http.put<Usuario>(url, usuario).pipe(map(res => res));   
    }

    getUsuario(id: number){
        const url = `${this.API_URL_LOCAL}/usuarios/${id}`;
        return this.http.get<Usuario>(url).pipe(map(res => res));  
    }
}