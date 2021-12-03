import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../lib/useAuth";
const NavBar = () => {
  const router = useRouter();
  const { isSignedIn, signOut } = useAuth();

  return (
    <div className="app">
      <ul className="NavBar">
        <li>
          <Link href="/">
            <a className={router.asPath == "/" ? "active" : ""}>Home</a>
          </Link>
        </li>
        {isSignedIn() && (
          <div>
            <li>
              <Link href="/prompts">
                <a className={router.asPath == "/prompts" ? "active" : ""}>
                  Prompts
                </a>
              </Link>
            </li>
            <li onClick={() => signOut()}>
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
