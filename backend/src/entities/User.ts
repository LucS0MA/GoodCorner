import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ad } from "./Ad";

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

  @Column({default: "user"})
  role: string;

  @OneToMany(() => Ad, (ad) => ad.user)
  @Field(() => [Ad])
  ads: Ad[];
}
