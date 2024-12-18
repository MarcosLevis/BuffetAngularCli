import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Menu } from 'src/app/models/Menu';
import { MenuService } from '../../services/MenuService';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-estas-seguro',
  templateUrl: './estas-seguro.component.html',
  styleUrls: ['./estas-seguro.component.css']
})
export class EstasSeguroComponent {




  constructor(
      public dialogRef: MatDialogRef<EstasSeguroComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private sanitizer: DomSanitizer
  ) {
    console.log(data)
  }

    // onEliminarMenu(menu: Menu): void {
    //   this.menuService.eliminarMenu(menu.id).subscribe(data => {
    //     console.log('El formulario se ha eliminado');
    //   })              
    // }

    get sanitizedContent(): SafeHtml {
      return this.sanitizer.bypassSecurityTrustHtml(this.data.contenido);
    }

    retornar(confirmar: boolean){
      this.dialogRef.close(confirmar);
    }


    
}



