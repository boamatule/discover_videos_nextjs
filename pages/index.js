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

export async function getServerSideProps() {
	const userId = "did:ethr:0x4C5f589E65C59dC2a17fCBC45Fd2E5342f58e677";
	const token = "WyIweDYwZTc3ZjBjZTJjYzQ3NTc0OWM0MTk3OWU3ZjMyMWI1MzgzNDdlZDEzZmM1YzA1YmNmZjZjMWExMTI0NmE3ZmE2OThhM2VjMzM3YjhjMWI1MGI5MmYzNjZmMmZjNzQxMGM2ZDQ4OTNlNDk3ZTBjZTI0YjkwZmIyOTUzNWZlZmFmMWIiLCJ7XCJpYXRcIjoxNjQ1NjMzMjE4LFwiZXh0XCI6MTY0NTYzNDExOCxcImlzc1wiOlwiZGlkOmV0aHI6MHg0QzVmNTg5RTY1QzU5ZEMyYTE3ZkNCQzQ1RmQyRTUzNDJmNThlNjc3XCIsXCJzdWJcIjpcIjVRaXN0U0ZoQmxPUjhyYWdiS3R3VTZCUXZSRHFhbktoTURiZGQzRVNkblk9XCIsXCJhdWRcIjpcIkU2dG0ydWpYdVQwemtsXzBGOUxONXM4NGIzQm1JRlRpN3FYQVNZeVhaRGc9XCIsXCJuYmZcIjoxNjQ1NjMzMjE4LFwidGlkXCI6XCJhMDgwZTMyMi04ZTRlLTQ3NzUtYWMzZi1lNzBhZTgzMDQyNmNcIixcImFkZFwiOlwiMHg0YTRiM2VhN2E0ZThiNGVlZjRiYTAzNmMwYmY3ODU5MGJjNmM4Zjk2ODdkNGVjNTI3NDYyOTZkMGJjMzkzYWE5MDA4YTJiMzg3YzQwMDkwNGM0ODI3ZTlkMWIyYzdiMmQ5YjBjMzFkZGViN2I4ZWYzZmU4MzFhOGU5NWQ2N2RlYTFjXCJ9Il0=";
	const watchItAgainVideos = await getWatchItAgainVideos(userId, token);

	console.log({ watchItAgainVideos });
	const disneyVideos = await getVideos("disney trailer");
	const productivityVideos = await getVideos("productivity");
	const travelVideos = await getVideos("indie music");
	const popularVideos = await getPopularVideos();

	return {
		props: {
			// watchItAgainVideos,
			disneyVideos,
			productivityVideos,
			travelVideos,
			popularVideos,
		},
	};
}

export default function Home({
	disneyVideos,
	productivityVideos,
	travelVideos,
	popularVideos,
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
