import { User } from './user.model'

export interface Todo {
  createdAt: string;
  description: string;
  dueDate: string;
  finishedAt: string;
  id: number;
  status: string;
  title: string;
  updatedAt: string;
  assignee: User;
  createdBy: User;
}
