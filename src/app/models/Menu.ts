// export abstract class Menu
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

// export class MenuVegetariano extends Menu{


//   constructor(    
//     precio: number,
//     nombre: string,
//     entrada: string,
//     platoPrincipal: string,
//     postre: string,
//     bebida: string,
//     tipoMenu: string,
//   ){
//     super(precio,nombre,entrada,platoPrincipal,postre,bebida,tipoMenu);

//   }

//   // esVegetariano(){
//   //   return true;
//   // }
// }

// export class MenuEstandar extends Menu{

//   constructor(    
//     precio: number,
//     nombre: string,
//     entrada: string,
//     platoPrincipal: string,
//     postre: string,
//     bebida: string,
//     tipoMenu: string,
//   ){
//     super(precio,nombre,entrada,platoPrincipal,postre,bebida, tipoMenu);
//   }

//   // esVegetariano(){
//   //   return false;
//   // }
// }
