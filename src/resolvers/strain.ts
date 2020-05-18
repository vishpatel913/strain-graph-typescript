import { Resolver, Args, Query, Ctx } from "type-graphql";
import { Strain } from "../entities";
import { SearchArgs } from "./types/search-args";
import { DataSources, SearchKey } from "../datasources/types";

@Resolver(() => Strain)
export class StrainResolver {
  @Query(() => [Strain], { nullable: false })
  async strains(
    @Args() { name }: SearchArgs,
    @Ctx("dataSources") { strainApi }: DataSources,
  ): Promise<Strain[]> {
    if (name) {
      const results = await strainApi.searchStrainsByKeyValue(SearchKey.NAME, name);
      return results;
    } else {
      return [];
    }
  }
}
