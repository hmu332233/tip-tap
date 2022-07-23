import Script from 'next/script';

type Props = {};

function GA({}: Props) {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-TBK065BWXQ"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
  
          gtag('config', 'G-TBK065BWXQ');
        `}
      </Script>
    </>
  );
}

export default GA;
