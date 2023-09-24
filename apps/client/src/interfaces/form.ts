export interface IRegisterForm {
  username: string
  email: string
  password: string
}

export interface ILoginForm extends Omit<IRegisterForm, 'username'> {}
