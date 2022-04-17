import { UserRole } from "../enums/UserRole";
import { UserMasterPojo } from "./UserMasterPojo";

export interface AuthorizedUser {
  user: UserMasterPojo;
  message: string;
}
