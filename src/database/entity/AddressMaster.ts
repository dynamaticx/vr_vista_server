import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { UserMaster } from "./UserMaster";

@Entity({ name: "address_master" })
export class AddressMaster extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "flat_no" })
  flatNo: string;

  @Column({ name: "line_no_a" })
  lineNoA: string;

  @Column({ name: "line_no_b" })
  lineNoB: string;

  @Column()
  landmark: string;

  @Column({ default: "Ahmedabad" })
  city: string;

  @Column({ default: "Gujarat" })
  state: string;

  @Column({ default: "India" })
  country: string;

  @ManyToOne((type) => UserMaster)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  userId: UserMaster;

  @Column({ name: "is_active", default: true })
  isActive: boolean;

  @CreateDateColumn({ name: "created_date" })
  createdDate: Date;

  @UpdateDateColumn({ name: "last_updated_date" })
  lastUpdatedDate: Date;
}
