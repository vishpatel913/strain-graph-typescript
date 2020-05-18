import { ArgsType, Field } from "type-graphql";
import { IsIn } from "class-validator";

@ArgsType()
export class SearchArgs {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  @IsIn(["sativa", "indica", "hybrid"])
  race?: string;

  @Field(() => String, { nullable: true })
  flavor?: string;

  @Field(() => String, { nullable: true })
  effect?: string;
}
