import React from 'react'
import '../styles/globals.css'
import NavBar from '../components/NavBar'
import '../styles/styles.css'
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <br />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
