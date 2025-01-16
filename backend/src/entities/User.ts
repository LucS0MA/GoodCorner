import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ad } from "./Ad";
import { TempUser } from "./TempUser";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  hashedPassword: string;

  @OneToOne(() => TempUser, tempUser => tempUser.user)
  tempUser: TempUser;

  @Column({default: "USER"})
  role: string;

  @OneToMany(() => Ad, (ad) => ad.user)
  @Field(() => [Ad])
  ads: Ad[];
}
