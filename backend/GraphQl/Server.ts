// index.js
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./graphql/schema.js";
import { resolvers } from "./graphql/resolvers.js";
import models from "./models";
import controllers from "./controllers/userController";
import isAuth2 from "./middlewares/isAuth2";

const app = express();
app.use(isAuth2); // attach user if auth exists

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      user: req.user,    // from isAuth2 middleware
      models,
      controllers,
    }),
  });

  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  app.listen(4000, () => console.log("Server running on /graphql"));
}

startServer();
