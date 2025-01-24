import {Role} from "./role.type";

export interface ValidationInfoInterface{
  userId: number,
  isAuthorized: boolean,
  roles: Role[],
}
