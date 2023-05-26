import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <Script
        src="https://launch.rbx.ae/widgetari/arbitor.js"
        strategy="beforeInteractive"
        onLoad={() =>
          console.log(`arbitor.js loaded`)
        }
      />
        
      </Head>
      <body className=" bg-black font-inter  scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-black">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
