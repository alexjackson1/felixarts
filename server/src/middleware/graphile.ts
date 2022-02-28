import postgraphile, { PostGraphileOptions } from "postgraphile";
import pgSimplify from "@graphile-contrib/pg-simplify-inflector";

import * as env from "../env";

const SCHEMAS = ["felix", "ref", "public", "globe"];

const base: PostGraphileOptions = {
  subscriptions: true,
  dynamicJson: true,
  ignoreRBAC: false,
  appendPlugins: [pgSimplify],
  enableQueryBatching: true,
  ownerConnectionString: env.getDBOwnerConnectionString(),
  legacyRelations: "omit",
};

const dev: PostGraphileOptions = {
  watchPg: true,
  setofFunctionsContainNulls: false,
  showErrorStack: "json",
  extendedErrors: ["hint", "detail", "errcode"],
  exportGqlSchemaPath: "schema.graphql",
  graphiql: true,
  enhanceGraphiql: true,
  allowExplain(req) {
    // TODO: customise condition
    return true;
  },
};

const prod: PostGraphileOptions = {
  subscriptions: true,
  retryOnInitFail: true,
  dynamicJson: true,
  setofFunctionsContainNulls: false,
  ignoreRBAC: false,
  extendedErrors: ["errcode"],
  graphiql: false,
  enableQueryBatching: true,
  disableQueryLog: true,
  legacyRelations: "omit",
};

function getConfig(): PostGraphileOptions {
  if (env.isDevelopment()) return { ...base, ...dev };
  return { ...base, ...prod };
}

export default () =>
  postgraphile(env.getDBConnectionString(), SCHEMAS, getConfig());
