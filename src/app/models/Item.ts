export interface Item {
    id: number;
    nombre: string;
    precio: number;
    tipoItem: string;
    entrada?: string;
    platoPrincipal?: string;
    postre?: string;
    bebida?: string;
    tipoMenu?: string;
  }