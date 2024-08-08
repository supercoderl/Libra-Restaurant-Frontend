import { AVUser } from 'src/type/Store'

export namespace Rep {
  export interface LoginRep extends AVUser{
    sessionToken: string
  }
}
