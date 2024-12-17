export class Menu {
    //se que no te va a gustar el public pero no pasa nada papa
    public id: number;
    public nombre: string;
    public precio: number;
    public tipoItem: string;
    public entrada: string;
    public platoPrincipal: string;
    public postre: string;
    public bebida: string;
    public tipoMenu: string;

    constructor(obj?: any)
    {
      this.id = obj && obj.id || '';
      this.precio = obj && obj.precio || '';
      this.nombre =obj && obj.nombre || '';
      this.entrada = obj && obj.entrada || '';
      this.platoPrincipal = obj && obj.platoPrincipal || '';
      this.postre = obj && obj.postre || '';
      this.bebida = obj && obj.bebida || '';
      this.tipoItem = 'tipoMenu';
      this.tipoMenu =obj && obj.tipoMenu || '';
    }
  }



  //esto lo agregue porque le sacaste la id en el back y el endpoint ya no espera que tenga aunque sea un id vacio
export interface MenuObject {
  nombre: string;
  precio: number;
  tipoItem: string;
  entrada: string;
  platoPrincipal: string;
  postre: string;
  bebida: string;
  tipoMenu: string;
}