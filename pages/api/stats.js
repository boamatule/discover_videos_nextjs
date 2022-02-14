import jwt from "jsonwebtoken";
import {
	findVideoIdByUser,
	updateStats,
	insertStats,
} from "../../lib/db/hasura";

export default async function stats(req, resp) {
	if (req.method === "POST") {
		console.log({ cookies: req.cookies });

		try {
			const token = req.cookies.token;
			if (!token) {
				resp.status(403).send({});
			} else {
				const { videoId, favourited, watched = true } = req.body;

				if (videoId) {
					const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
					const userId = decodedToken.issuer;
					const doesStatsExists = await findVideoIdByUser(
						token,
						userId,
						videoId,
					);
					console.log({ doesStatsExists });

					if (doesStatsExists) {
						// update it
						const response = await updateStats(token, {
							watched,
							userId,
							videoId,
							favourited,
						});
						resp.send({ data: response });
					} else {
						// add it
						const response = await insertStats(token, {
							watched,
							userId,
							videoId,
							favourited,
						});
						resp.send({ data: response });
					}
				}
			}
		} catch (error) {
			console.log("Error occured /stats", error);
			resp.status(500).send({ done: false, error: error?.message });
		}
	}
}
