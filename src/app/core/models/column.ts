import { Item } from "./item";

export interface Column {
  id: string;
  title: string;
  items: Item[];
}