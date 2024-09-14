import Head from 'next/head';
import Script from 'next/script';
import Nav from '@/components/nav';
import './layout.sass';

export default (props) => <html>
  <Head>
    {/* Google tag (gtag.js) */}
    <Script async src="https://www.googletagmanager.com/gtag/js?id=G-M1S3S6YXJ1" />
    <Script src='/gtag.js'></Script>
    <link rel='icon' href='/favicon.svg' sizes='any' type='image/svg+xml' />
  </Head>

  <body>
    <Nav />
    {props.children}
  </body>
</html>;
