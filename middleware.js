import { NextResponse } from "next/server";
import { verifyToken } from "./lib/utils";


export async function middleware(req, ev, NextResponse) {
	console.log({ req, ev });
	const token = req ? req.cookies?.token : null;
	const userId = await verifyToken(token);

	if ((!token || !userId) && pathname !== "/login") {
		const url = req.nextUrl.clone();
		url.pathname = "/login";
		return NextResponse.rewrite(url);
	}
}
