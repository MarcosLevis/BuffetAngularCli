import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Menu } from 'src/app/models/Menu';
import { MenuService } from '../../services/MenuService';

@Component({
  selector: 'app-estas-seguro',
  templateUrl: './estas-seguro.component.html',
  styleUrls: ['./estas-seguro.component.css']
})
export class EstasSeguroComponent {

  constructor(public dialogRef: MatDialogRef<EstasSeguroComponent>, private menuService: MenuService) {}

    onEliminarMenu(menu: Menu): void {
      this.menuService.eliminarMenu(menu.id).subscribe(data => {
        console.log('El formulario se ha eliminado');
      })              
    }
  
    onCancelar(): void {
      this.dialogRef.close(null); // Cerrar sin devolver nada
    }


}



