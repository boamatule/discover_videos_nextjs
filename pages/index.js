import Head from "next/head";
import Banner from "../components/banner/banner";
import Navbar from "../components/nav/navbar";

import SectionCards from "../components/Card/section-cards";

import styles from "../styles/Home.module.css";

import {
	getPopularVideos,
	getVideos,
	getWatchItAgainVideos,
} from "../lib/videos";

import useRedirectUser from "../utils/redirectUser";

export async function getServerSideProps(context) {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	// const { userId, token } = await useRedirectUser(context);
	const token = context.req ? context.req?.cookies.token
	: null;
	console.log({ token });

	const userId ="did:ethr:0x4C5f589E65C59dC2a17fCBC45Fd2E5342f58e677";
	// const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOiJkaWQ6ZXRocjoweDRDNWY1ODlFNjVDNTlkQzJhMTdmQ0JDNDVGZDJFNTM0MmY1OGU2NzciLCJwdWJsaWNBZGRyZXNzIjoiMHg0QzVmNTg5RTY1QzU5ZEMyYTE3ZkNCQzQ1RmQyRTUzNDJmNThlNjc3IiwiZW1haWwiOiJib2EubWF0dWxlQGdtYWlsLmNvbSIsIm9hdXRoUHJvdmlkZXIiOm51bGwsInBob25lTnVtYmVyIjpudWxsLCJpYXQiOjE2NTA2NTYzMjYsImV4cCI6MTY1MTI2MTEyNiwiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdLCJ4LWhhc3VyYS1kZWZhdWx0LXJvbGUiOiJ1c2VyIiwieC1oYXN1cmEtdXNlci1pZCI6ImRpZDpldGhyOjB4NEM1ZjU4OUU2NUM1OWRDMmExN2ZDQkM0NUZkMkU1MzQyZjU4ZTY3NyJ9fQ.Xmh4Is350aYIIhNj4q1164-nBeTHCENqu0kwjktGRVY"
	const watchItAgainVideos = await getWatchItAgainVideos(userId, token);
	// console.log({ watchItAgainVideos });

	const disneyVideos = await getVideos("disney trailer");
	const productivityVideos = await getVideos("productivity");
	const travelVideos = await getVideos("indie music");
	const popularVideos = await getPopularVideos();
	return {
		props: {
			disneyVideos,
			travelVideos,
			productivityVideos,
			popularVideos,
			watchItAgainVideos,
		},
	};
}

export default function Home({
	disneyVideos,
	travelVideos,
	productivityVideos,
	popularVideos,
	watchItAgainVideos,
}) {
	return (
		<div className={styles.container}>
			<Head>
				<title>Netflix</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className={styles.main}>
				<Navbar username="thisisboa@working.com" />
				<Banner
					videoId="4zH5iYM4wJo"
					title="Chingu the Black dog"
					subTitle="a very cute dog"
					imgUrl="/static/chingu.webp"
				/>

				<div className={styles.sectionWrapper}>
					<SectionCards title="Disney" videos={disneyVideos} size="large" />
					<SectionCards
						title="Watch it again"
						videos={watchItAgainVideos}
						size="small"
					/>
					<SectionCards title="Travel" videos={travelVideos} size="small" />
					<SectionCards
						title="Productivity"
						videos={productivityVideos}
						size="medium"
					/>
					<SectionCards title="Popular" videos={popularVideos} size="small" />
				</div>
			</div>
		</div>
	);
}
