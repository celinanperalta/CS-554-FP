import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../lib/useAuth.jsx";
const NavBar = () => {
  const router = useRouter();
  const { isSignedIn, signOut } = useAuth();

  // Todo: Better route restriction
  return (
    <div className="app">
      <ul className="NavBar">
        {isSignedIn() && (
          <div>
            <li>
              <Link href="/">
                <a className={router.asPath == "/" ? "active" : ""}>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/prompts">
                <a className={router.asPath == "/prompts" ? "active" : ""}>
                  Prompts
                </a>
              </Link>
            </li>
            <li>
              <Link href="/users/me">
                <a className={router.asPath == "/users/me" ? "active" : ""}>
                  My Profile
                </a>
              </Link>
            </li>
            <li>
              <Link href="/settings">
                <a className={router.asPath == "/settings" ? "active" : ""}>
                  Settings
                </a>
              </Link>
            </li>
            <li onClick={async () => await signOut()}>
              <a>Logout</a>
            </li>
          </div>
        )}
        {!isSignedIn() && (
          <div>
            <li>
              <Link href="/login">
                <a className={router.asPath == "/login" ? "active" : ""}>
                  Login
                </a>
              </Link>
            </li>
            <li>
              <Link href="/register">
                <a className={router.asPath == "/register" ? "active" : ""}>
                  Register
                </a>
              </Link>
            </li>
          </div>
        )}
      </ul>
    </div>
  );
};

export default NavBar;
