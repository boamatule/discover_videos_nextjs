import { magicAdmin } from '../../lib/magic';
import jwt from 'jsonwebtoken';
import { isNewUser, createNewUser } from '../../lib/db/hasura';

export default async function login(req, res) {
	if (req.method === "POST") {
		try {
			const auth = req.headers.authorization;
			const didToken = auth ? auth.substr(7) : '';
			console.log({ didToken });
			// invoke magic
			const metadata = await magicAdmin.users.getMetadataByToken(didToken);

			const token = jwt.sign(
				{
				...metadata,
				iat: Math.floor(Date.now() / 1000),
				exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
				"https://hasura.io/jwt/claims": {
					'x-hasura-allowed-roles': ['user', 'admin'],
					'x-hasura-default-role': 'user',
					'x-hasura-user-id': `${metadata.issuer}`,
				},
			},
			process.env.JWT_SECRET
			);

			const isNewUserQuery = await isNewUser(token, metadata.issuer);
			if (isNewUserQuery) {
				//create a new user 
				const createNewUserMutation = await createNewUser(token, metadata);
				console.log({ createNewUserMutation });
				res.send({ done : true, msg: "Is a new user"  });
			} else {
				res.send({ done : true, msg: "Not a new user" });
			}


			res.send({ done : true, isNewUserQuery });
		} catch(error) {
			console.error('Something went wrong logging in', error);
			res.status(500).send({ done: false });
		} 
	} else {
		res.send({ done : false });
	}
}
