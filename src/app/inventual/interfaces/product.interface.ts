import { Unit } from "../enums/unit.enum";

export interface Product{
    id: string | undefined;
    name: string;
    storeId: string;
    categoryId: string;
    stock: number | undefined;
  }