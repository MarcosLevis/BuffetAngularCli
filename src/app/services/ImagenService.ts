import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { ImagenDTO } from '../DTO/ImagenDTO';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {
  private API_URL_LOCAL: string;

  constructor(private http: HttpClient){
    this.API_URL_LOCAL = '/api';
  }

  // Convertir imagen seleccionada a Base64 desde un input
  seleccionarImagen(event: Event): Observable<string> {
    const imagen = (event.target as HTMLInputElement);
    return new Observable<string>((observer) => {
      if (imagen?.files?.length) {
        const imagenSeleccionada = imagen.files[0];
        
        const lector = new FileReader();
        lector.onload = () => {
          observer.next((lector.result as string));
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

  seleccionarImagenLocal(pathImagen: string): Observable<string> {
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
          observer.next(canvas.toDataURL());
          observer.complete();
        } else {
          observer.error('Error al procesar la imagen');
        }
      };
      
      img.onerror = (error) => observer.error(error);
    });
  }

  seleccionarImagenLocalNUEVO(pathImagen: string): Observable<File> {//cambiado para imagenes
    return new Observable<File>((observer) => {
      const img = new Image();
      img.src = pathImagen; //assets/perro.png por ejemplo
  
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const contexto = canvas.getContext('2d');
        
        if (contexto) {
          canvas.width = img.width;
          canvas.height = img.height;
          contexto.drawImage(img, 0, 0);
  
          // Convertir el canvas a Blob y luego a File
          let nombre: string = pathImagen.split('/')[(pathImagen.split('/').length - 1)];
          let extension: string = pathImagen.split('.')[(pathImagen.split('.').length - 1)];;
          canvas.toBlob((blob) => {
            if (blob) {
              const file = new File([blob], nombre, { type: blob.type });
              observer.next(file);
              observer.complete();
            } else {
              observer.error('Error al generar el Blob');
            }
          }, 'image/' + extension)
        } else {
          observer.error('Error al procesar la imagen');
        }
      };
      
      img.onerror = (error) => observer.error(error);
    });
  }
  

  guardarImagen(imagen: File): Observable<ImagenDTO> {//cambiado para imagenes
    const url = this.API_URL_LOCAL + '/imagenes/guardarImagen';
    const formData = new FormData();
    formData.append('imagen', imagen);
  
    return this.http.post<ImagenDTO>(url, formData);
  }
  

  recuperarImagenBase64(imagenUrl: string): Observable<string> {//cambiado para imagenes
    const url = this.API_URL_LOCAL + '/imagenes/recuperarImagen/' + imagenUrl;
    return this.http.get(url, { responseType: 'blob' }).pipe(
      switchMap(blob => {
        return new Observable<string>(observer => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64data = reader.result as string; // ya incluye el prefix "data:image/png;base64,..."
            observer.next(base64data);
            observer.complete();
          };
          reader.onerror = err => observer.error(err);
          reader.readAsDataURL(blob);
        });
      })
    );
  }

}
