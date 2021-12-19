import { NextRequest, NextResponse } from "next/server";
import client from "../apollo-client";
import queries from "../queries";

const allowList = ["/login", "/register"];

export async function middleware(req: NextRequest) {
//   const isAuthenticated = await client.query({
//     query: queries.IS_AUTHENTICATED,
//   });

//   if (
//     isAuthenticated.data &&
//     allowList.indexOf(req.url) > -1
//   ) {
//     console.log(isAuthenticated);
//     console.log(req.url);

//     if (isAuthenticated.data.isAuthenticated && !allowList.includes(req.url)) {
//       return NextResponse.next();
//     } else if (
//       isAuthenticated.data.isAuthenticated &&
//       allowList.includes(req.url)
//     ) {
//       return NextResponse.redirect("/users/me");
//     } else if (
//       !isAuthenticated.data.isAuthenticated &&
//       !allowList.includes(req.url)
//     ) {
//       return NextResponse.redirect("/login");
//     } else {
//     }
// }
return NextResponse.next();
}
