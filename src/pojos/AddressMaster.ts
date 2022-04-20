import { UserMasterPojo } from "./UserMasterPojo";

export class AddressPojo {
  id: number;

  flatNo: string;

  lineNoA: string;

  lineNoB: string;

  landmark: string;

  city: string;

  state: string;

  country: string;

  userId: UserMasterPojo;

  isActive: boolean;

  createdDate: Date;

  lastUpdatedDate: Date;
}
