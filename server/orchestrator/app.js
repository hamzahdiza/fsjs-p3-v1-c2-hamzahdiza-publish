const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const { typeDefs: userTypeDefs, resolvers: userResolvers } = require("./schemas/user");
const { typeDefs: productsTypeDefs, resolvers: productsResolver } = require("./schemas/products");

(async () => {
  const server = new ApolloServer({
    typeDefs: [userTypeDefs, productsTypeDefs],
    resolvers: [userResolvers, productsResolver],
    introspection: true,
  });

  const { url } = await startStandaloneServer(server, {
    port: process.env.PORT || 4000,
  });

  console.log(`🚀  Server ready at: ${url}`);
})();
