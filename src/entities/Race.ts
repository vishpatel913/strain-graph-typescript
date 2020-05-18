import { registerEnumType } from "type-graphql";

enum Race {
  SATIVA = "sativa",
  INDICA = "indica",
  HYBRID = "hybrid",
}

registerEnumType(Race, {
  name: "Race",
  description: "One of [sativa, indica, hybrid]",
});

export default Race;
