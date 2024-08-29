'use client';

import Head from 'next/head';
import Script from 'next/script';
import { DefaultSeo } from 'next-seo';
import Nav from '@/components/nav';
import './layout.sass';
import { usePathname, useRouter } from 'next/navigation';

const twitter = 'svartaz'
const title = 'inkwell'

export default (props) => {
  const router = useRouter();
  const path = usePathname();

  return <html>
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
  </html>
}
