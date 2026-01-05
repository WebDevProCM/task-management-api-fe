export interface User {
  id?: string
  email: string
  name: string
}

export interface AuthResponse {
  data:{
    token: string
    user?: User
  }
}