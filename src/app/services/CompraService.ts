import { HttpClient } from "@angular/common/http";
import { Compra } from "../models/Compra";
import { Observable, map } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { UsuarioDTO } from "../DTO/UsuarioDTO";

@Injectable({providedIn: 'root'})

export class CompraService{

    constructor(private http: HttpClient) {}
    // Ya no usamos el environment, usamos el proxy, porque tiraba errores de CORS  
    API_URL_LOCAL = '/api'

    getCompra(id: number){
        const url = `${this.API_URL_LOCAL}/compras/${id}`;
        return this.http.get<Compra>(url).pipe(map(res => res));  
    }

    editCompra(compra: Compra | null):Observable<Compra> {
        const url = `${this.API_URL_LOCAL}/compras/`;
        return this.http.put<Compra>(url, compra).pipe(map(res => res));   
    }

    deleteCompra(compraId: number){
        const url = `${this.API_URL_LOCAL}/compras/${compraId}`;
        return this.http.delete<Compra>(url).pipe(map(res => res));
    }

    getCompras(){
        const url = `${this.API_URL_LOCAL}/compras/`;
        return this.http.get<Compra[]>(url).pipe(map(res => res));  
    }

    getComprasEntreFechas(desde:string, hasta:string){//ver sugerencia service
        const url = `${this.API_URL_LOCAL}/compras/between-dates/${desde}/${hasta}/`;
        return this.http.get<Compra[]>(url).pipe(map(res => res));  
    }
}