export interface User {
  id: string;
  email: string;
  username: string;
  created_at: Date;
}

export interface SignUpData {
  email: string;
  username: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}