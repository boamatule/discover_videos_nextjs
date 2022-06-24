import { NextResponse } from "next/server";
import { verifyToken } from "../lib/utils";

export async function middleware(req, ev) {
  console.log({req, ev })
  const token = req ? req.cookies?.token : null;
  const userId = await verifyToken(token);

	if (!token && pathname !== "/login") {
    console.log("redirected")
		return NextResponse.redirect(new URL("/login", req.url));
	}
}
