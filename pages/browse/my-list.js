import Head from "next/head";
import Navbar from "../../components/nav/navbar";

import SectionCards from "../../components/Card/section-cards";
import useRedirectUser from "../../utils/redirectUser";

import { getMyList } from "../../lib/videos";
import styles from "../../styles/MyList.module.css";


export async function getServerSideProps(context) {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { userId, token } = await useRedirectUser(context);
	const videos = await getMyList(userId, token);

	return {
		props: {
			myListVideos: videos,
		},
	};
}

const MyList = ({ myListVideos }) => {
	return (
		<div>
			<Head>
				<title>MyList</title>
			</Head>
			<main className={styles.main}>
				<Navbar />
				<div className={styles.sectionWrapper}>
					<SectionCards 
            title="My List" 
            videos={myListVideos} 
            size="small"
						shouldWrap
						shouldScale={false}
          />
				</div>
			</main>
		</div>
	);
};

export default MyList;
