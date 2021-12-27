import { useRouter } from "next/router";
import Modal from "react-modal";
import styles from "../../styles/Video.module.css";
import clsx  from "classnames";

Modal.setAppElement("#__next");

const Video = () => {
  const router = useRouter();

	const  video = {
		title: "Hi cute dog",
		publishTime: "1990-01-01",
		description: "A big red dog that is super cute. Can he get any longer",
		channelTitle: "Paramount Pictures",
		viewCount: "1000000"
	}

	const {title, publishTime, description, channelTitle, viewCount  } = video;


  return (
    <div>
      <Modal
        isOpen={true}
        contentLabel="Watch the video"
        onRequestClose={() => router.back()}
				className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <iframe
          className={styles.videoPlayer}
          id="player"
          type="text/html"
          width="100%"
          height="390"
          src={`http://www.youtube.com/embed/${router.query.videoId}?autoplay=0&origin=http://example.com&controls=0&rel=0`}
          frameBorder="0"
        ></iframe>
				
				<div className={styles.modalBody}>
					<div className={styles.modalBodyContent}>
						<div className={styles.col1}>
							<p className={styles.publishTime}>{publishTime}</p>
							<p className={styles.title}>{title}</p>
							<p className={styles.description}>{description}</p>
						</div>
						<div className={styles.col2}>
							<p className={clsx(styles.subText, styles.subTextWrapper)}>
								<span className={styles.textColor}>Cast:</span>
								<span className={styles.channelTitle}>{channelTitle}</span>
							</p>
							<p className={styles.subText}>
								<span className={styles.textColor}>View Count:</span>
								<span className={styles.channelTitle}>{viewCount}</span>
							</p>
						</div>
					</div>
				</div>
      </Modal>
    </div>
  );
};

export default Video;
