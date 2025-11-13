import express from "express";
import { config } from "dotenv";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";

config();

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 8000;

  app.get("/", (req, res) => {
    res.json({ messge: "server is running " });
  });

  // making a basic Apollo server

  const typeDefs = `
    type Query {
      hello: String
    }
  `;
  const resolvers = {
    Query: {
        hello: () => "hello from gql"
    }
  };

  const gqlServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  // starting apollo server

  await gqlServer.start();

  // middleware for express

  app.use(express.json());

  app.use('/graphql', expressMiddleware(gqlServer));

  app.listen(PORT, () => {
    console.log("server is running on port " + PORT);
  });
}

startServer();