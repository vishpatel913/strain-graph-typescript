import { ObjectType, Field, ID } from "type-graphql";
import { Effects, Race } from ".";

@ObjectType({ description: "The Strain model" })
class Strain {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field(() => Race)
  race: Race;

  @Field({ nullable: true })
  desc?: string;

  @Field(() => [String], { nullable: true })
  flavors?: string[];

  @Field(() => Effects)
  effects: Effects;
}

export default Strain;
