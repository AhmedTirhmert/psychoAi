export interface registerForm {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirm_password?: string;
  accept_terms_and_conditions: boolean;
}

export interface LoginForm {
  email_or_username: string;
  password: string;
  remember_me: boolean;
}

export interface User {
  username: string;
  email: string;
  picture_url: string;
}
