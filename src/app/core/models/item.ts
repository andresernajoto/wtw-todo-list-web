export interface Item {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  listId: number;
  createdAt?: Date;
  updatedAt?: Date;
  statusId: number;
}
