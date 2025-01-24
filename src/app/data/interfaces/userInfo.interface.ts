import {Role} from "./role.type";

export interface UserInfoInterface {
  userId: number,
  userName: string,
  email: string,
  roles: Role[]
}
