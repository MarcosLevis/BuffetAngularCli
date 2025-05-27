export interface Sugerencia {
    id: number | null;
    texto: string;
    fecha: Date;
    usuarioId: number | null;
    nombreAutor: string | null;
    categoria: CategoriaSugerencia
  }

  export enum CategoriaSugerencia {
    Alimentos = 'Alimentos',
    Atencion = 'Atencion',
    Precios = 'Precios',
    Infraestructura = 'Infraestructura'
  }