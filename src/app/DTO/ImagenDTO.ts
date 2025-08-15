export class ImagenDTO {
    urlImagen: string;
  
    constructor(urlImagen: string) {
      this.urlImagen = urlImagen;
    }
  
    public getUrlImagen(): string {
      return this.urlImagen;
    }
  
    public setUrlImagen(urlImagen: string): void {
      this.urlImagen = urlImagen;
    }
  }
  