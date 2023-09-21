export type TUser = {
  username: string
  email: string
  passwordHash: string
}

type TOmitPassword<T extends TUser> = Omit<T, 'password'>

export type TUserFilter = Partial<TOmitPassword<TUser>> & {
  id?: number
}
