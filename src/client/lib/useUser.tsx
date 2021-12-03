import { useEffect } from "react";
import Router from "next/router";
import { useQuery } from "@apollo/client";
import queries from "../queries";
import { useAuth } from "./useAuth";

export default function useUser({
  redirectTo = "",
  redirectIfFound = false,
} = {}) {
  const { isSignedIn } = useAuth();
  const { data, loading, error } = useQuery(queries.GET_ME);

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (loading) return;

    if (
      !isSignedIn() ||
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !data.me) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && data.me)
    ) {
      Router.push(redirectTo);
    }
  }, [data, redirectIfFound, redirectTo]);

  return { data };
}
