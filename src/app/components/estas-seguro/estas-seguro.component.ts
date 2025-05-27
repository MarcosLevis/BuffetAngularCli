import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-estas-seguro',
  templateUrl: './estas-seguro.component.html',
  styleUrls: ['./estas-seguro.component.css']
})
export class EstasSeguroComponent {

  constructor(public dialogRef: MatDialogRef<EstasSeguroComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

    retornar(confirmar: boolean){
      this.dialogRef.close(confirmar);
    }
}



