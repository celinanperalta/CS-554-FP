import React, { useState, useContext } from "react";
import { ApolloProvider } from "@apollo/client";
import queries from "../queries";
import Router from "next/router";
import client from "../apollo-client";

const AuthContext = React.createContext(undefined);

export function AuthProvider({ children }) {
  const auth = useProvideAuth();

  React.useEffect(() => {
    const initializeAuth = async () => {
      const response = await client.query({
        query: queries.IS_AUTHENTICATED,
      });
      console.log("initializeAuth response:", response.data.isAuthenticated);
      auth.setAuthToken(response.data.isAuthenticated);
    };
    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider value={auth}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProvideAuth() {
  const [authToken, setAuthToken] = useState(null);

  const isSignedIn = () => {
    return authToken;
  };

  const updateCacheAfterLogin = (cache, { data: { login } }) => {
    cache.writeQuery({
      query: queries.GET_ME,
      data: {
        me: {
          id: login.id,
          username: login.username,
          email: login.email,
        },
      },
    });
  };

  const signIn = async ({ username, password }) => {
    try {
      const result = await client.mutate({
        mutation: queries.LOGIN_USER,
        variables: { username, password },
        update: updateCacheAfterLogin,
      });

      if (result?.data?.login?.id) {
        setAuthToken(result.data.login.id);
        Router.push("/users/me");
      }
    } catch (error) {
      console.log("signIn error:", error);
    }
  };

  const signOut = async () => {
    const result = await client.mutate({
      mutation: queries.LOGOUT_USER,
      update: (cache) => {
        cache.writeQuery({
          query: queries.GET_ME,
          data: { me: null },
        });
      },
    });

    setAuthToken(null);

    Router.push("/");
  };

  return {
    setAuthToken,
    isSignedIn,
    signIn,
    signOut,
  };
}
