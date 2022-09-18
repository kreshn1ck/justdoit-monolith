export interface AuthenticationSuccess {
  email: string;
  reason: string;
  authToken: string;
  refreshToken: string;
  userId: number;
  username: string;
  success: boolean;
}
