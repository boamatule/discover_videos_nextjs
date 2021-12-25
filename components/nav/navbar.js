import { useState } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';
import Image from 'next/image';
import styles from './navbar.module.css';

const Navbar = (props) => {
	const {username} = props;

	const [showDropdown, setShowDropdown] = useState(false);
	const router = useRouter();

	const handleOnClickHome = (e) => {
		e.preventDefault();
    router.push('/');
	};
	const handleOnClickMyList = (e) => {
		e.preventDefault();
    router.push('browse/my-list/');
	};

	const handleShowDropdown = (e) => {
		e.preventDefault();
		setShowDropdown(!showDropdown);
	};

	return (
	<div className={styles.container}>
		<div className={styles.wrapper}>
			<a className={styles.logoLink}>
				<div className={styles.logoWrapper}>
					<Image 
						src="/static/netflix.svg"
						width="128"
						height="34"
						alt="Netflix logo" 
					/>
				</div>
			</a>
		
	
		<ul className={styles.navItems}>
			<li className={styles.navItem} onClick={handleOnClickHome}>
				Home
				</li>
				<li className={styles.navItem2} onClick={handleOnClickMyList}>
					My List
				</li>
		</ul>
		
		<nav className={styles.navContainer}>
			<div>
				<button className={styles.usernameBtn}
					onClick={handleShowDropdown}
				>
					<p className={styles.username}>{username}</p>
					<Image 
						src="/static/expand_more.svg"
						width="24"
						height="24"
						alt="Expand dropdown" 
					/>
				</button>
				{showDropdown && (
				<div className={styles.navDropdown}>
					<div>
						<Link href="/login">
							<a  className={styles.linkName}>Sign Out</a>
						</Link>
					<div className={styles.lineWrapper}></div>
				</div>
				</div>
				)}
			</div>
		</nav>
		</div>
	</div>)
}

export default Navbar;