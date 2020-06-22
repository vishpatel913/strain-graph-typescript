import Koa from "koa";
import Router from "koa-router";
import logger from "koa-logger";
import json from "koa-json";
import bodyParser from "koa-bodyparser";

import { ApolloServer } from "apollo-server-koa";
import "reflect-metadata";
import { buildSchema } from "type-graphql";

import { StrainResolver } from "./resolvers/strain";
import { EffectResolver } from "./resolvers/effect";
import { FlavorResolver } from "./resolvers/flavor";
import StrainAPI from "./datasources/strainApi";

// interface Context {
//   token?: string;
// }

const main = async () => {
  const schema = await buildSchema({
    resolvers: [StrainResolver, EffectResolver, FlavorResolver],
    emitSchemaFile: true,
    validate: false,
  });

  const app = new Koa();
  const router = new Router();

  // /** Middlewares */
  app.use(json());
  app.use(logger());
  app.use(bodyParser());

  // /** Routes */
  app.use(router.routes()).use(router.allowedMethods());

  router.get("/", async (ctx: Koa.Context, next: () => Promise<any>) => {
    ctx.body = { message: "Welcome to the Strain Graph, a GraphQL layer for Strain data" };
    await next();
  });

  const dataSources = () => ({
    strainApi: new StrainAPI(),
  });

  const server = new ApolloServer({
    schema,
    dataSources,
    context: async ({ ctx }) => {
      let token;

      try {
        token = await ctx.request.headers.authorization;
      } catch (e) {
        throw new Error("Unauthenticated!");
      }
      return {
        token,
      };
    },
    // mocks: true,
  });

  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
  );
};
main().catch((error) => {
  console.log(error, "error");
});
