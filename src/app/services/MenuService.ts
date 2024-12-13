import { HttpClient } from "@angular/common/http";
import { Menu } from "../models/Menu"
import { environment } from "../environment/environment.development";
import { Observable, map } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})

export class MenuService{

    constructor(private http: HttpClient) { }

    API_URL_LOCAL = environment.API_URL;
    
    createMenu(menu: Menu):Observable<Menu> {
        const url = this.API_URL_LOCAL + '/menus/';
        console.log(url);
        console.log(menu);
        return this.http
          .post<Menu>(url, menu)
          .pipe(map(res => res));   
    }

}