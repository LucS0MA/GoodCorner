import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class TempUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  randomCode: string;

  @Field()
  @Column()
  email: string;

  @Column()
  hashedPassword: string;

  @CreateDateColumn()
  created_at: Date;
}
