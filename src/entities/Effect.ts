import { ObjectType, Field } from "type-graphql";
import { IsIn } from "class-validator";

@ObjectType({ description: "The Effect model" })
class Effects {
  @Field()
  effect: string;

  @Field()
  @IsIn(["postive", "negative", "medical"])
  type: string;
}

export default Effects;
