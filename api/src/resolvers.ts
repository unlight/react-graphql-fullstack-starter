// Construct a schema, using GraphQL schema language
export const typeDefs = /* GraphQL */ `
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
export const resolvers = {
  Query: {
    hello: (source, args, contextValue, info) => {
      return 'Hello world!';
    },
  },
};
