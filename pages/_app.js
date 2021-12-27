import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { magic } from '../lib/magic-client';

import Loading from '../components/loading/loading';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
	
  useEffect(async () => {
    // const isLoggedIn = await magic.user.isLoggedIn();
    // if (isLoggedIn) {
    //   // setIsLoading(false);
    //   // route to /
    //   router.push("/");
    // } else {
    //   setIsLoading(false);
    //   // route to /login
    //   router.push("/login");
    // }
  }, []);


	useEffect(() => {
		const handleComplete = () => {
			setIsLoading(false);
		}
		router.events.on('routeChangeComplete',
		handleComplete);
		router.events.on('routeChangeError',
		handleComplete);

		return () => {
			router.events.off('routeChangeComplete',
			handleComplete);
			router.events.off('routeChangeError',
			handleComplete);
		};
	},[router]);

  return isLoading ? <Loading /> : <Component {...pageProps} />
}

export default MyApp;
