export interface authUser {
  user: userData,
  token: string,
}

export interface userData {
  id: number,
  name: string,
  email: string,
  role: string,
  email_verified_at: any,
  created_at: any,
  updated_at: any,
}
