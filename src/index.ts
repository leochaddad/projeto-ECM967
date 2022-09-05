import { createServer } from "graphql-yoga";

const typeDefs = /* GraphQL */ `
  type Query {
    hello: String!
    randomNumber: Int!
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello world!",
    randomNumber: () => Math.floor(Math.random() * 100),
  },
};

const server = createServer({
  schema: {
    typeDefs,
    resolvers,
  },
});

server.start();
