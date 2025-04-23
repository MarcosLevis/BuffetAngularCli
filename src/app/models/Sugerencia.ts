export interface Sugerencia {
    id: number | null;
    texto: string;
    fecha: Date;
    usuarioId: number | null;
    nombreAutor: string | null;
    categoria: CategoriaSugerencia
  }

  export enum CategoriaSugerencia {
    Alimentos = 0,
    Atencion = 1,
    Precios = 2,
    Infraestructura = 3
  }