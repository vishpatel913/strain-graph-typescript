import Koa from "koa";
import Router from "koa-router";
import logger from "koa-logger";
import json from "koa-json";
import bodyParser from "koa-bodyparser";
import { ApolloServer, gql } from "apollo-server-koa";

const app = new Koa();
const router = new Router();

// /** Middlewares */
app.use(json());
app.use(logger());
app.use(bodyParser());

// /** Routes */
app.use(router.routes()).use(router.allowedMethods());

router.get("/", async (ctx: Koa.Context, next: () => Promise<any>) => {
  ctx.body = { message: "This is your GET route" };
  await next();
});

router.post("/data", async (ctx: Koa.Context, next: () => Promise<any>) => {
  ctx.body = {
    message: "This is your POST route, attached you can find the data you sent",
    body: ctx.request.body,
  };
  await next();
});

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => "Hello world!",
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });
// alternatively you can get a composed middleware from the apollo server
// app.use(server.getMiddleware());

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
);
