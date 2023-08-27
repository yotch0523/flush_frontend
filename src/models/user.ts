export interface IUser {
  sub: string
  familyName: string
  givenName: string
  email: string
}

export function getFullName(user: IUser | undefined | null) {
  if (!user) return ''
  return `${user.familyName} ${user.givenName}`
}
