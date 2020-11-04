import { Resolver, Args, Query, Ctx, FieldResolver, Root, Arg } from "type-graphql";
import { Strain, Effects, Race } from "../entities";
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

  @Query(() => Strain, { nullable: false })
  async strain(@Arg("delay", { defaultValue: 1 }) delay: number): Promise<Strain> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: 1824,
          name: "Stardawg",
          desc:
            "Stardawg, possibly named after the bright, sparkling crystal trichomes that blanket the strain like stars, is a hybrid cross between Chemdawg 4 and Tres Dawg. Earthy pine with sour notes of diesel color Stardawg, whose uplifting effects may help patients treating stress, fatigue, and anxiety disorders. Stardawg flowers in 67 days indoors with moderate yields. ",
          race: Race.HYBRID,
          effects: { positive: [], negative: [], medical: [] },
        });
      }, delay * 1000);
    });
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
