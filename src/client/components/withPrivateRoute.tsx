/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import Router from "next/router";
import useUser from "../lib/useUser";
import { useAuth } from "../lib/useAuth";
import {
  ApolloClient,
  from,
  HttpLink,
  InMemoryCache,
  useQuery,
} from "@apollo/client";
import queries from "../queries";
import { onError } from "@apollo/client/link/error";
import client from "../apollo-client";

const login = "/login"; // Define your login route address.


export default (WrappedComponent) => {
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />;

  hocComponent.getInitialProps = async (context) => {
    const { data } = await client.query({ query: queries.GET_ME });

    const userAuth = data;

    // Are you an authorized user or not?
    if (!userAuth?.me) {
      // Handle server-side and client-side rendering.
      if (context.res) {
        context.res?.writeHead(302, {
          Location: login,
        });
        context.res?.end();
      } else {
        Router.replace(login);
      }
    } else if (WrappedComponent.getInitialProps) {
      const wrappedProps = await WrappedComponent.getInitialProps({
        ...context,
        auth: userAuth,
      });
      return { ...wrappedProps, userAuth };
    }

    return { userAuth };
  };

  return hocComponent;
};
