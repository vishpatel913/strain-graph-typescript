import StrainAPI from "./strainApi";
export interface DataSources {
  strainApi: StrainAPI;
}

export enum SearchKey {
  NAME = "name",
  RACE = "race",
  FLAVOR = "flavor",
  EFFECT = "effect",
}

export enum GetKey {
  DESC = "desc",
  FLAVORS = "flavors",
  EFFECTS = "effects",
}
