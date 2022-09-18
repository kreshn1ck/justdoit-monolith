
export interface AuthenticationSuccess {
  authToken: string;
  email: string;
  reason: string;
  refreshToken: string;
  success: boolean;
  userId: number;
  username: string;
}
