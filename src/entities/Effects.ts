import { ObjectType, Field } from "type-graphql";

@ObjectType({ description: "The Strain Effects model" })
class Effects {
  @Field(() => [String])
  positive: string[];

  @Field(() => [String])
  negative: string[];

  @Field(() => [String])
  medical: string[];
}

export default Effects;
