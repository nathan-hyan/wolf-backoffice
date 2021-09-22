export interface User {
  email: string;
  password: string;
}

export interface UserResponse {
  success: boolean;
  username: string;
  id: string;
}
