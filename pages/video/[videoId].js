import { route } from "next/dist/server/router";
import { useRouter } from "next/router";
import Modal from "react-modal";
import styles from "../../styles/Video.module.css";

Modal.setAppElement("#__next");

const Video = () => {
  const router = useRouter();
  console.log({ router });
  return (
    <div>
      Videos {router.query.videoId}
      <Modal 
				isOpen={true} 
				contentLabel="What the video"
				onRequestClose={() => router.back()}
				overlayClassName={styles.overlay}
				>
        <div>I am a modal</div>
      </Modal>
    </div>
  );
};

export default Video;
