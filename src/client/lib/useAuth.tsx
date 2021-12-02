import React, { useState, useContext } from "react";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import queries from "../queries";
import Router from "next/router";

const AuthContext = React.createContext(undefined);

interface AuthProviderFuncs {
    setAuthToken: React.Dispatch<any>,
    isSignedIn: () => boolean,
    signIn: ({username, password}) => Promise<void>,
    signOut: () => void,
    createApolloClient: () => ApolloClient<any>,
}

export function AuthProvider({ children }) {
  const auth : AuthProviderFuncs = useProvideAuth();

  const provider = (
    <AuthContext.Provider value={auth}>
    <ApolloProvider client={auth.createApolloClient()}>
      {children}
    </ApolloProvider>
    </AuthContext.Provider>
  );

  return provider;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProvideAuth() {
  const [authToken, setAuthToken] = useState(null);

  const isSignedIn = () => {
    if (authToken) {
      return true;
    } else {
      return false;
    }
  };

  const getAuthHeaders = () => {
    if (!authToken) return null;

    return {
      authorization: `Bearer ${authToken}`,
    };
  };

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
      cache: new InMemoryCache(),
      link: from([errorLink, httpLink]),
    });
  };

  const signIn = async ({ username, password }) => {
    const client = createApolloClient();

    const result = await client.mutate({
      mutation: queries.LOGIN_USER,
      variables: { username, password },
    });

    if (result?.data?.login?.id) {
      setAuthToken(result.data.login.id);
      Router.push("/users/me");
    }
  };

  const signOut = () => {
    setAuthToken(null);
  };

  return {
    setAuthToken,
    isSignedIn,
    signIn,
    signOut,
    createApolloClient,
  };
}
