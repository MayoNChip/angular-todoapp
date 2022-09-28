export interface Todo {
  userId: number;
  id: number;
  title: string;
  content?: string;
  completed: boolean;
  new?: boolean;
  createdAt?: string;
}
