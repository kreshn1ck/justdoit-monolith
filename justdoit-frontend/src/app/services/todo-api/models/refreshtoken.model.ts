import { User } from './user.model'

export interface RefreshToken {
  expireDate: string;
  id: number;
  token: string;
  user: User;
}
