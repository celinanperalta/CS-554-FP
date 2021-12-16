import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { offsetLimitPagination } from "@apollo/client/utilities";

const createApolloClient = () => {
  const httpLink = new HttpLink({
    uri: "http://localhost:4000/graphql",
    credentials: "include",
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  return new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            searchSongs: {
              ...offsetLimitPagination(),
              keyArgs: false,
              merge(existing = [], incoming) {
                return [...existing, ...incoming];
              },
            }
          }
        }
      },
    }),
    link: from([errorLink, httpLink]),
  });
};

const client = createApolloClient();

export default client;
