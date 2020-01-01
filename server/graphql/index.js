import path from "path";
import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";

const typesArray = fileLoader(path.join(__dirname, "/**/*.graphql"), {
  recursive: true
});
const resolversArray = fileLoader(path.join(__dirname, "/**/*.resolver.js"), {
  recursive: true
});

const typeDefs = mergeTypes(typesArray, { all: true });
const resolvers = mergeResolvers(resolversArray, { all: true });
const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = schema;
