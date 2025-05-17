import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  map } from 'rxjs/operators';
import { TurnoDTO } from '../DTO/TurnoDTO';
import { Turno } from '../models/Turno';
@Injectable({
  providedIn: 'root',
})

export class TurnoService {
 
  urlbase = '/api'

  constructor(private http: HttpClient) {}

  createTurno(turnoDTO: TurnoDTO): Observable<TurnoDTO>{
    const url = this.urlbase + '/turnos/';
    return this.http.post<TurnoDTO>(url,turnoDTO).pipe(map(res => res));
  }
  
  getTurnosOrdenadosPorHora(): Observable<TurnoDTO[]>{
    const url = this.urlbase + '/turnos/ordenados-por-hora';
    return this.http.get<TurnoDTO[]>(url).pipe(map(res => res));
  }

  editTurno(turnoDTO: TurnoDTO):Observable<TurnoDTO> {
    const url = this.urlbase + '/turnos/';
    return this.http.put<TurnoDTO>(url, turnoDTO).pipe(map(res => res));   
  }

  deleteTurno(turno: TurnoDTO):Observable<Turno> {
    const url = this.urlbase + '/turnos/${turno.id}';
    return this.http.delete<Turno>(url);
  }
}



