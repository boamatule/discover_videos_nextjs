import { useState } from 'react';
import Image from 'next/image';
import styles from './card.module.css';

const Card = (props) => {
	const { imgUrl = "/static/chingu.webp", size = "medium"} = props;

	const [imgSrc, setImgSrc] = useState(imgUrl);
	
	const classMap = {
		'large': styles.lgItem,
		'medium': styles.mdItem,
		'small': styles.smItem,
	}

	const handleOnError = () => {
		setImgSrc("/static/chingu.webp");
	};

	return (
		<div className={styles.container}> 
			<div className={classMap[size]}>
			<Image 
				src={imgSrc}
				alt="image"
				layout="fill"
				onError={handleOnError}
				className={styles.cardImg}
				/>
			</div>
		</div>
	)
};

export default Card;