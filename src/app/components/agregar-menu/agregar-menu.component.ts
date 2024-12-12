import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-menu',
  templateUrl: './agregar-menu.component.html',
  styleUrls: ['./agregar-menu.component.css']
})
export class AgregarMenuComponent {


  menu: any;

  constructor(
  public dialogRef: MatDialogRef<AgregarMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.menu = data || {
      foto: '',
      nombre: '',
      entrada: '',
      plato: '',
      bebida: '',
      postre: ''
    };
  }

  onAgregarMenu(): void {
    this.dialogRef.close(this.menu); // Devolver los datos al cerrar
  }

  onCancelar(): void {
    this.dialogRef.close(null); // Cerrar sin devolver nada
  }
}

