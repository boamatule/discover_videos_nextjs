import { NextResponse } from "next/server";
import { verifyToken } from "../lib/utils";

export async function middleware(req, ev) {
	console.log({ req, ev });

	const token = req ? req.cookies?.token : null;
	const userId = await verifyToken(token);

	//check the token
	//if token is valid
	//|| if page is /login
	const { pathname } = req.nextUrl;
	if ((token && userId) || pathname.includes("/api/login")) {
		return NextResponse.next();
	}

	//if no token
	//redirect to login
	if(!token && pathname !== '/login') {
		return NextResponse.redirect("/login")
	}
}
