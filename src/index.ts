import { createServer } from "graphql-yoga";
import db from "../db";

const typeDefs = /* GraphQL */ `
  type Query {
    users: [User!]!
    posts: [Post!]!
    comments: [Comment!]!
    allReactions: AllReactions!
  }

  type AllReactions {
    likePercentage: Float!
    dislikePercentage: Float!
    reactions: [Reaction!]!
  }

  type User {
    id: ID!
    name: String!
    age: Int!
    posts: [Post!]!
    comments: [Comment!]!
    reactions: [Reaction!]!
  }

  type Post {
    id: ID!
    text: String!
    comments: [Comment!]!
    reactions: [Reaction!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User
  }

  type Reaction {
    id: ID!
    type: String!
  }
`;

const resolvers = {
  Query: {
    users: () =>
      db.users.map((user) => ({
        ...user,
        posts: db.posts.filter((post) => post.author === user.id),
        comments: db.comments.filter((comment) => comment.author === user.id),
        reactions: db.reactions.filter((reaction) => reaction.user === user.id),
      })),
    posts: () =>
      db.posts.map((post) => ({
        ...post,
        comments: db.comments.filter((comment) => comment.post === post.id),
        reactions: db.reactions.filter((reaction) => reaction.post === post.id),
      })),
    comments: () =>
      db.comments.map((comment) => ({
        ...comment,
        author: db.users.find((user) => user.id === comment.author),
      })),
    allReactions: () => ({
      likePercentage:
        db.reactions.filter((reaction) => reaction.type === "LIKE").length /
        db.reactions.length,
      dislikePercentage:
        db.reactions.filter((reaction) => reaction.type === "DISLIKE").length /
        db.reactions.length,
      reactions: db.reactions,
    }),
  },
};

const server = createServer({
  schema: {
    typeDefs,
    resolvers,
  },
});

server.start();
