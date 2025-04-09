import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  // Convertir imagen seleccionada a Base64 desde un input
  seleccionarImagen(event: Event): Observable<string> {
    const imagen = (event.target as HTMLInputElement);
    return new Observable<string>((observer) => {
      if (imagen?.files?.length) {
        const imagenSeleccionada = imagen.files[0];
        
        const lector = new FileReader();
        lector.onload = () => {
          // Emitir solo la parte base64, sin el tipo
          observer.next((lector.result as string).split(",")[1]);
          observer.complete();
        };
        lector.onerror = (error) => {
          observer.error(error);
        };
        
        lector.readAsDataURL(imagenSeleccionada);
      } else {
        observer.error('No se seleccionó una imagen');
      }
    });
  }

  // Manejar la imagen predefinida, que se guardan en assets y devolver el base64
  setImagenBase64(pathImagen: string): Observable<string> {//CAMBIAR NOMBRE A seleccionarImagenLocal
    return new Observable<string>((observer) => {
      const img = new Image();
      img.src = pathImagen; //assets/perro.png por ejemplo

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const contexto = canvas.getContext('2d');
        
        if (contexto) {
          canvas.width = img.width;
          canvas.height = img.height;
          contexto.drawImage(img, 0, 0);
          
          // Emitir solo la parte base64, sin el tipo
          observer.next(canvas.toDataURL().split(',')[1]);
          observer.complete();
        } else {
          observer.error('Error al procesar la imagen');
        }
      };
      
      img.onerror = (error) => observer.error(error);
    });
  }
}
