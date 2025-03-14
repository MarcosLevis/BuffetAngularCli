import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({providedIn: 'root'})
export class MensajeService{
    
    constructor (private snackbar: MatSnackBar){}

    mostrarMensaje(mensaje: string = 'Datos inválidos. Por favor, intente nuevamente.'): void {
        this.snackbar.open(mensaje, 'Cerrar', {
           duration: 5000,
           horizontalPosition: 'center',
           verticalPosition: 'bottom',
         });
       }
}