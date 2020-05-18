import { ArgsType, Field } from "type-graphql";
import { IsIn } from "class-validator";

@ArgsType()
export class EffectArgs {
  @Field(() => String, { nullable: true })
  @IsIn(["positive", "negative", "medical"])
  type?: string;
}
