import { Menu } from "./Menu";

export class Dia {
  public id: number;
  public enumDia: string;
  public menuVegetariano?: Menu | null;
  public menuEstandar?: Menu | null;

  constructor(obj?: any)
  {
    this.id = obj && obj.id || '';
    this.enumDia = obj && obj.dia || '';
    this.menuVegetariano = obj && obj.menuVegetariano || null;
    this.menuEstandar = obj && obj.menuEstandar|| null;
  }
}

