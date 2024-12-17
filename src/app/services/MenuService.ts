import { HttpClient } from "@angular/common/http";
import { Menu, MenuObject } from "../models/Menu"
import { environment } from "../environment/environment.development";
import { Observable, map } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})

export class MenuService{

    constructor(private http: HttpClient) { }

    API_URL_LOCAL = environment.API_URL;
    
    createMenu(menu: MenuObject):Observable<MenuObject> {
        const url = this.API_URL_LOCAL + '/menus/';
        return this.http.post<Menu>(url, menu).pipe(map(res => res));   
    }

}