import React from "react";
import "../styles/globals.css";
import NavBar from "../components/NavBar";
import "../styles/styles.css";
import Head from "next/head";
import { AuthProvider } from "../lib/useAuth";


function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <>
        <header>
          <NavBar />
        </header>
        <br />
        <Component {...pageProps} />
      </>
    </AuthProvider>
  );
}

export default MyApp;
