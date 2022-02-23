import Head from "next/head";
import SectionCards from "../../components/Card/section-cards";
import Navbar from "../../components/nav/navbar";

import styles from "../../styles/MyList.module.css";

const MyList = () => {
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
						videos={[]}
						size="small"
					/>
				</div>
			</main>
		</div>
	);
};

export default MyList;
