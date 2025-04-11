'use client';

import Script from 'next/script';

export default function GoogleAnalytics({ GA_MEASUREMENT_ID }) {
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-XJ6GXMENP6"
      />
      <Script
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-XJ6GXMENP6');
          `,
        }}
      />
    </>
  );
}