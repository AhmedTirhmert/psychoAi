export interface registerForm {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirm_password?: string;
  accept_terms_and_conditions: boolean;
}
