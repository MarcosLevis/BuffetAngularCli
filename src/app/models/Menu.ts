export abstract class Menu {

    precio: number;
    nombre: string;
    entrada: string;
    platoPrincipal: string;
    postre: string;
    bebida: string;
  
    constructor(
      precio: number,
      nombre: string,
      entrada: string,
      platoPrincipal: string,
      postre: string,
      bebida: string
    ) {
      this.precio = precio;
      this.nombre = nombre;
      this.entrada = entrada;
      this.platoPrincipal = platoPrincipal;
      this.postre = postre;
      this.bebida = bebida;
    }
  }

export class MenuVegetariano extends Menu{

  vegetariano: boolean;

  constructor(    
    precio: number,
    nombre: string,
    entrada: string,
    platoPrincipal: string,
    postre: string,
    bebida: string
  ){
    super(precio,nombre,entrada,platoPrincipal,postre,bebida);
    this.vegetariano = true;
  }

  esVegetariano(){
    return this.vegetariano;
  }
}

export class MenuEstandar extends Menu{

  vegetariano: boolean;

  constructor(    
    precio: number,
    nombre: string,
    entrada: string,
    platoPrincipal: string,
    postre: string,
    bebida: string
  ){
    super(precio,nombre,entrada,platoPrincipal,postre,bebida);
    this.vegetariano = false;
  }

  esVegetariano(){
    return this.vegetariano;
  }
}

