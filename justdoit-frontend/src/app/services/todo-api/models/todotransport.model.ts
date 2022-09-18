import { UserTransport } from './usertransport.model'

export interface TodoTransport {
  createdAt?: string;
  description: string;
  dueDate: string;
  finishedAt?: string;
  id?: number;
  status?: string;
  title: string;
  updatedAt?: string;
  assignee: UserTransport;
  createdBy?: UserTransport;
}
