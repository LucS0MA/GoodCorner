import { ForgotPassword } from "../entities/ForgotPassword";
import { Field, InputType } from "type-graphql";

@InputType()
class ForgotPasswordInput implements Partial<ForgotPassword> {
    @Field()
    email: string;
}

export default ForgotPasswordInput;