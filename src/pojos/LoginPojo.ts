import { UserRole } from "../enums/UserRole";

export interface LoginPojo {
  id: number;
  email: string;
  mobile: string;
  password: string;
  token: string;
}
