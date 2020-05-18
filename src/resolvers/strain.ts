import { Resolver, Args, Query, Ctx, FieldResolver, Root } from "type-graphql";
import { Strain, Effects } from "../entities";
import { SearchArgs } from "./types/search-args";
import { DataSources, SearchKey, GetKey } from "../datasources/types";

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

  @FieldResolver(() => [String])
  async flavors(
    @Root() { id }: Strain,
    @Ctx("dataSources") { strainApi }: DataSources,
  ): Promise<string[]> {
    const flavors = strainApi.getStrainDetailsById(GetKey.FLAVORS, id);
    return flavors;
  }

  @FieldResolver(() => Effects)
  async effects(
    @Root() { id }: Strain,
    @Ctx("dataSources") { strainApi }: DataSources,
  ): Promise<string[]> {
    const effects = strainApi.getStrainDetailsById(GetKey.EFFECTS, id);
    return effects;
  }
}
