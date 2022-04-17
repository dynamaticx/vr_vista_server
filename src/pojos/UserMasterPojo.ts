import { UserRole } from "../enums/UserRole";

export interface UserMasterPojo {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password: string;
  isActive: boolean;
  userRole: UserRole;
  createdDate: Date;
  lastUpdatedDate: Date;
  token: string;
}
