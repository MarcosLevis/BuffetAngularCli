import { HttpClient } from "@angular/common/http";
import { Menu } from "../models/Menu"
import { environment } from "../environment/environment.development";
import { Observable, map } from "rxjs";
import { Injectable } from "@angular/core";
import { Dia } from "../models/Dia";

@Injectable({providedIn: 'root'})

export class MenuService{


    constructor(private http: HttpClient) { }

    //API_URL_LOCAL = environment.API_URL;
    // Ya no usamos el environment, usamos el proxy, porque tiraba errores de CORS  
    API_URL_LOCAL = '/api'



    getDias():Observable<Dia[]>{
        const url = this.API_URL_LOCAL + '/dias/';
        return this.http.get<Dia[]>(url).pipe(map(res => res));  
    }



    createMenu(menu: Menu, dia: Dia):Observable<Dia> {

        const url = `${this.API_URL_LOCAL}/dias/${dia.id}`;
        if (menu.esVegetariano()){
            dia.menuVegetariano = menu;
        }else{
            dia.menuEstandar = menu;
        }
        console.log(dia)
        return this.http.put<Dia>(url, dia).pipe(map(res => res));   
    }

    getMenus():Observable<Menu[]>{
        const url = this.API_URL_LOCAL + '/menus/';
        return this.http.get<Menu[]>(url).pipe(map(res => res));   
    }

    eliminarMenu(menu: Menu, dia: Dia):Observable<Dia> {

        const url = `${this.API_URL_LOCAL}/dias/${dia.id}`;
        if (menu.esVegetariano()){
            dia.menuVegetariano = undefined;
        }else{
            dia.menuEstandar = undefined;
        }
        console.log(dia)
        return this.http.put<Dia>(url, dia).pipe(map(res => res));   
    }

}