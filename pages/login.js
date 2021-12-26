import { useState } from 'react';
import Head from "next/head";
import Image from "next/image";

import styles from "../styles/Login.module.css";

const Login = () => {
	const [userMsg, setUserMsg] = useState('');
	const [email, setEmail] = useState('');

	const handleOnChangeEmail = (e) => {
		setUserMsg();
		console.log("event", e);
		const email = e.target.value;
		setEmail(email);
		e.preventDefault();
	};

	const handleLoginWithEmail = (e) => {
		console.log("Hi button");
		e.preventDefault();
		if (email) {
			// route to dashboard
		} else {
			// show user message
			setUserMsg('Enter a valid email address')
		}
	};
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix SignIn</title>
      </Head>
			<header className={styles.header}>
				<div className={styles.headerWrapper}>
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
			</div>
			</header>

			<main className={styles.main}>
				<div className={styles.mainWrapper}>
				<h2 className={styles.signinHeader}>Sign In</h2>
				<input 
					type="text" 
					placeholder="Email address"
					className={styles.emailInput}
					onChange={handleOnChangeEmail}
					/>
				<p className={styles.userMsg}>{userMsg}</p>
				<button
					onClick={handleLoginWithEmail}
					className={styles.loginBtn}
				>
					Sign In
				</button>
				</div>
			</main>
    </div>
  );
};

export default Login;
