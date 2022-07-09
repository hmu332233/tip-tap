import 'styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { MainProvider } from 'contexts/mainContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no"
        />
      </Head>
      <MainProvider>
        <Component {...pageProps} />
      </MainProvider>
    </>
  );
}

export default MyApp;
