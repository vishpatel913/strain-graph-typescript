import { Resolver, Query, Ctx } from "type-graphql";
import { Effect } from "../entities";
import { DataSources, GetKey } from "../datasources/types";

@Resolver(() => Effect)
export class EffectResolver {
  @Query(() => [Effect], { nullable: false })
  async allEffects(
    // @Arg("filter") { type }: { type: string },
    @Ctx("dataSources") { strainApi }: DataSources,
  ): Promise<Effect[]> {
    const results = await strainApi.getValuesByKey(GetKey.EFFECTS);
    return results;
  }
}
