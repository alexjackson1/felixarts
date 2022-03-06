import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

// const httpLink = createHttpLink({
//   uri: "/graphql",
// });

// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from wherever you store it
//   const token = getJWTToken(); // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       // Only pass the authorization header if we have a JWT
//       ...(token ? { authorization: `Bearer ${token}` } : null),
//     },
//   };
// });

export const client = new ApolloClient({
  // link: authLink.concat(httpLink),
  uri: "/api/graphql",
  cache: new InMemoryCache(),
});
