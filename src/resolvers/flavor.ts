import { Resolver, Query, Ctx } from "type-graphql";
import { DataSources, GetKey } from "../datasources/types";

@Resolver(() => String)
export class FlavorResolver {
  @Query(() => [String], { nullable: false })
  async flavors(@Ctx("dataSources") { strainApi }: DataSources): Promise<string[]> {
    const results = await strainApi.getValuesByKey(GetKey.FLAVORS);
    return results;
  }
}
