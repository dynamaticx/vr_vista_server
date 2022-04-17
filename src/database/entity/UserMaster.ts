import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserRole } from "../../enums/UserRole";

@Entity({ name: "user_manager" })
export class UserMaster extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "first_name" })
  firstName: string;

  @Column({ name: "last_name" })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  mobile: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  token: string;

  @Column({ name: "is_active", default: true })
  isActive: boolean;

  @Column({
    name: "user_role",
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
  })
  userRole: UserRole;

  @CreateDateColumn({ name: "created_date" })
  createdDate: Date;

  @UpdateDateColumn({ name: "last_updated_date" })
  lastUpdatedDate: Date;
}
