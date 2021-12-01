import React from 'react'
import Link from "next/link";
import { useRouter } from "next/router";
const NavBar = () => {
    const router = useRouter();
    return (
        <div className="app">
            <ul className="NavBar">
                <li>
                    <Link href="/">
                        <a className={router.asPath == "/" ? "active" : ""}>Home</a>
                    </Link>
                </li>
                <li>
                    <Link href="/login">
                        <a className={router.asPath == "/login" ? "active" : ""}>Login</a>
                    </Link>
                </li>
                <li>
                    <Link href="/signup">
                        <a className={router.asPath == "/signup" ? "active" : ""}>SignUp</a>
                    </Link>
                </li>
                <li>
                    <Link href="/prompts">
                        <a className={router.asPath == "/prompts" ? "active" : ""}>Prompts</a>
                    </Link>

                </li>
            </ul>
        </div>
    )

}

export default NavBar;