import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Image from 'next/image';
import styles from './navbar.module.css';
import { magic } from '../../lib/magic-client';

const Navbar = () => {
	const [showDropdown, setShowDropdown] = useState(false);

	const [username, setUsername] = useState('');

	const router = useRouter();

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(async () => {
		try {
			const { email } = await magic.user.getMetadata();
			const didToken = await magic.user.getIdToken();
			console.log({ didToken });
			if (email) {
				setUsername(email);
			}			
		} catch (error) {
			console.error('Error retrieving email', error);
		}
	}, []);

	function handleOnClickHome(e) {
		e.preventDefault();
		router.push('/');
	}
	const handleOnClickMyList = (e) => {
		e.preventDefault();
    router.push('browse/my-list/');
	};

	const handleShowDropdown = (e) => {
		e.preventDefault();
		setShowDropdown(!showDropdown);
	};

	const handleSignout = async (e) => {
		e.preventDefault();

		try {
			await magic.user.logout();
			console.log(await magic.user.isLoggedIn()); // => `false`
			router.push('/login');
		} catch (error) {
			// Handle errors if required!
			console.error("Error logging out", error);
			router.push('/login');
		};
	}

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
						<a 
							className={styles.linkName} 	
							onClick={handleSignout}
							>
								Sign Out
							</a>
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