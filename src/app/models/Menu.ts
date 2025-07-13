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
    public imagen: string; //base64

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
      this.imagen = obj && obj.imagen || '';
    }

    esVegetariano(){
      return this.tipoMenu === 'menuvegetariano'
    }
  }
