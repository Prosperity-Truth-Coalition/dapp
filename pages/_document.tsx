import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        
      </Head>
      <body className=" bg-black font-inter  scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-black">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
