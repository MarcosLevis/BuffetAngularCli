export class Menu {
    public id: number;
    public nombre: string;
    public precio: number;
    //public tipoItem: string;
    public entrada: string;
    public platoPrincipal: string;
    public postre: string;
    public bebida: string;
    public tipoMenu: string;
    public imagen: string | null; //base64, se usa para guardar acá la imagen y solo buscarla 1 vez al back
    public imagenUrl: string | null; //nueva forma de persistir imagenes

    constructor(obj?: any)
    {
      this.id = obj && obj.id || null;
      this.precio = obj && obj.precio || '';
      this.nombre = obj && obj.nombre || '';
      this.entrada = obj && obj.entrada || '';
      this.platoPrincipal = obj && obj.platoPrincipal || '';
      this.postre = obj && obj.postre || '';
      this.bebida = obj && obj.bebida || '';
      //this.tipoItem = 'menu';
      this.tipoMenu = obj && obj.tipoMenu || '';
      this.imagen = obj && obj.imagen || null;
      this.imagenUrl = obj && obj.imagenUrl;
    }

    esVegetariano(){
      return this.tipoMenu === 'menuvegetariano'
    }
  }
