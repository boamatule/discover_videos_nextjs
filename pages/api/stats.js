import {
  findVideoIdByUser,
} from "../../lib/db/hasura";

import jwt from 'jsonwebtoken';

export default async function stats(req, resp) {
  if (req.method === "POST") {
    try {
			const token = req.cookies.token;
      if (!token) {
        resp.status(403).send({});
      } else {
        const videoId = req.query.videoId;
				const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
				console.log({ decodedToken })

        const userId = decodedToken.issuer;

        const findVideoId = await findVideoIdByUser(token, userId, videoId);
        resp.send({ msg: "It works", decodedToken, findVideoId});
      }
    } catch (error) {
			console.log('Error occured /stats', error)
      resp.status(500).send({ done: false, error: error?.message });
    }
  }
}
