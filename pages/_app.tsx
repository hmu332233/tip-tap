import 'styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { SettingOptionProvier } from 'contexts/SettingOptionContext';
import GA from 'components/GA';
import SEO from 'components/SEO';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SEO />
      <SettingOptionProvier>
        <Component {...pageProps} />
        <GA />
      </SettingOptionProvier>
    </>
  );
}

export default MyApp;
