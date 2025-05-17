import { HttpClient } from "@angular/common/http";
import { Producto } from "../models/Producto";
import { Observable, map } from "rxjs";
import { Injectable } from "@angular/core";
import { ProductoDTO } from "../DTO/ProductoDTO";
@Injectable({providedIn: 'root'})

export class ProductoService{

    constructor(private http: HttpClient) { }
    //API_URL_LOCAL = environment.API_URL;
    // Ya no usamos el environment, usamos el proxy, porque tiraba errores de CORS  
    API_URL_LOCAL = '/api'

    getProductos():Observable<Producto[]>{
        const url = this.API_URL_LOCAL + '/productos/';
        return this.http.get<Producto[]>(url).pipe(map(res => res));   
    }

    getProductosAlfabeticamente():Observable<Producto[]>{
        const url = this.API_URL_LOCAL + '/productos/ordenados-por-nombre';
        return this.http.get<Producto[]>(url).pipe(map(res => res));   
    }

    createProducto(productoDTO: ProductoDTO):Observable<Producto> {
        const url = `${this.API_URL_LOCAL}/productos/`;
        return this.http.post<Producto>(url,productoDTO).pipe(map(res => res));//hacer que espere el DTO
    }

    deleteProducto(producto: Producto):Observable<Producto> {
        const url = `${this.API_URL_LOCAL}/productos/${producto.id}`;
        return this.http.delete<Producto>(url);
    }

    editProducto(producto: Producto):Observable<Producto> {
        const url = `${this.API_URL_LOCAL}/productos/`;
        return this.http.put<Producto>(url, producto).pipe(map(res => res));   
    }
}