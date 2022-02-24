import { verifyToken } from "../lib/utils";

const userRedirectUser = async (context) => {
	const token = context.req ? context.req?.cookies.token : null;

	const userId = verifyToken(token);

	if (!userId) {
		return {
			props: {},
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};
	}

	return {
		userId,
		token,
	};
};

export default userRedirectUser;
