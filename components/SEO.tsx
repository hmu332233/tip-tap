import React from 'react';
import Head from 'next/head';

type Props = {};

function SEO({}: Props) {
  return (
    <Head>
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no"
      />
      <title>Tip Tap</title>
      <meta
        name="description"
        content="Select a mode, tap on the screen! Tip-Tap is a collection of simple games that can play with your fingers. Use it in a variety of situations, including simple bets with friends, teaming, and ordering!"
      />
      <meta name="keywords" content="tip,tap,game,random,picker" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Tip Tap" />
      <meta
        property="og:description"
        content="Select a mode, tap on the screen! Tip-Tap is a collection of simple games that can play with your fingers. Use it in a variety of situations, including simple bets with friends, teaming, and ordering!"
      />
      <meta property="og:url" content="https://tip-tap.minung.dev" />
      {/* <meta property="og:image" content=""/> */}
    </Head>
  );
}

export default SEO;
