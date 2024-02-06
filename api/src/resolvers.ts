// Construct a schema, using GraphQL schema language
export const typeDefs = `
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
export const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};
