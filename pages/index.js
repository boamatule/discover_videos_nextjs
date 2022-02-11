import Head from "next/head";
import Banner from "../components/banner/banner";
import Navbar from "../components/nav/navbar";
import SectionCards from "../components/Card/section-cards";

import styles from "../styles/Home.module.css";

import { getPopularVideos, getVideos } from "../lib/videos";

export async function getServerSideProps() {
  const disneyVideos = await getVideos("disney trailer");

  const productivityVideos = await getVideos("productivity");

  const travelVideos = await getVideos("indie music");

  const popularVideos = await getPopularVideos();

  return {
    props: {
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
