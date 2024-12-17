import { HttpClient } from "@angular/common/http";
import { Menu } from "../models/Menu"
import { environment } from "../environment/environment.development";
import { Observable, map } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})

export class DiaService{

    constructor(private http: HttpClient) { }

    //API_URL_LOCAL = environment.API_URL;
    // Ya no usamos el environment, usamos el proxy, porque tiraba errores de CORS  
    API_URL_LOCAL = '/api'
    createMenu(menu: Menu):Observable<Menu> {
        const url = this.API_URL_LOCAL + '/menus/';
        return this.http.post<Menu>(url, menu).pipe(map(res => res));   
    }

    getMenus():Observable<Menu[]>{
        const url = this.API_URL_LOCAL + '/menus/';
        return this.http.get<Menu[]>(url).pipe(map(res => res));   
    }

    eliminarMenu(id: number){
        const url = this.API_URL_LOCAL + '/menus/{id}';
        return this.http.delete<Menu>(url).pipe(map(res => res));   
    }

}