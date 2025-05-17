import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {  map } from 'rxjs/operators';
import { Usuario } from '../models/Usuario'
import { Sugerencia } from '../models/Sugerencia'
@Injectable({
  providedIn: 'root',
})

export class SugerenciaService {
 
  urlbase = '/api'

  constructor(private http: HttpClient, private router: Router) {}

  createSugerencia(sugerencia: Sugerencia, usuario: Usuario): Observable<Sugerencia>{
    const url = this.urlbase + '/sugerencias/';
    if(!!sugerencia.usuarioId){
      sugerencia.usuarioId = usuario.id;
    }
    return this.http.post<Sugerencia>(url,sugerencia).pipe(map(res => res));
  }
  
  getSugerenciasOrdenadasFecha(descendente: boolean): Observable<Sugerencia[]>{
    const url = this.urlbase + '/sugerencias/ordenadas-por-fecha/' + (descendente ? 'descendente' : 'ascendente');
    return this.http.get<Sugerencia[]>(url).pipe(map(res => res));
  }

  getSugerenciasDeUnaFecha(fecha: String, max: number = 0): Observable<Sugerencia[]>{
    const url = this.urlbase + '/sugerencias/de-una-fecha/' + fecha + '/' + max;
    return this.http.get<Sugerencia[]>(url).pipe(map(res => res));
  }

  getSugerencias(): Observable<Sugerencia[]>{
    const url = this.urlbase + '/sugerencias/';
    return this.http.get<Sugerencia[]>(url).pipe(map(res => res));
  }
}



