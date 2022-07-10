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

import { useRedirectUser } from "../utils/redirectUser";

export async function getServerSideProps(context) {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { userId, token } = await useRedirectUser(context);

	const disneyVideos = await getVideos("disney trailer");
	const productivityVideos = await getVideos("Productivity");
	const travelVideos = await getVideos("travel");

	const popularVideos = await getPopularVideos();
	
	const watchItAgainVideos = await getWatchItAgainVideos(userId, token);

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
