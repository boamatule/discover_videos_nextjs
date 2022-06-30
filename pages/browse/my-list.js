import Head from "next/head";
import NavBar from "../../components/nav/navbar";

import SectionCards from "../../components/card/section-cards";
import useRedirectUser from "../../utils/redirectUser";
import { getMyList } from "../../lib/videos";

export async function getServerSideProps(context) {
  const { userId, token } = await useRedirectUser(context);

  // if (!userId) {
	// 	return {
	// 		props: {},
	// 		redirect: {
	// 			destination: "/login",
	// 			permanent: false,
	// 		},
	// 	};
	// }
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
        <styles />
      </Head>
      <main className={styles.main}>
        <NavBar />
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