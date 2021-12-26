import Head from "next/head";
import Image from "next/image";

import styles from "../styles/Login.module.css";

const Login = () => {
  return (
    <div>
      <Head>
        <title>Netflix SignIn</title>
      </Head>
			<header>
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
			</header>
    </div>
  );
};

export default Login;
