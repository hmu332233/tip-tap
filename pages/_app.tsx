import 'styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { SettingProvier } from 'contexts/SettingContext';
import GA from 'components/GA';
import SEO from 'components/SEO';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SEO />
      <SettingProvier>
        <Component {...pageProps} />
        <GA />
      </SettingProvier>
    </>
  );
}

export default MyApp;
