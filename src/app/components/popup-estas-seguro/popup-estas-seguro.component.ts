import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-estas-seguro',
  templateUrl: './popup-estas-seguro.component.html',
  styleUrls: ['./popup-estas-seguro.component.css']
})
export class PopupEstasSeguroComponent {

  constructor(public dialogRef: MatDialogRef<PopupEstasSeguroComponent>) {}

  cancelar(): void {
    this.dialogRef.close(false);
  }

  confirmar(): void {
    this.dialogRef.close(true);
  }
}
