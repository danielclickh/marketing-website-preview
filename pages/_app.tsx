import '../styles/globals.scss'
import '../styles/highlightjs.scss'
import React from 'react'
import { Inconsolata, Inter } from 'next/font/google'
import { SnackbarContextProvider } from '../components/sui'
import { AppProps } from 'next/app'
import Script from 'next/script'
import SegmentScript from '../components/SegmentScript'
import Head from 'next/head'

const gtmId = process.env.NEXT_PUBLIC_GTM ?? 'GTM-P52RCTZ'

const inter = Inter({
  subsets: [],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
  adjustFontFallback: false,
  fallback: ['sans-serif']
})

const inconsolata = Inconsolata({
  subsets: [],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inconsolata',
  adjustFontFallback: false,
  fallback: []
})
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <base href='/' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <link href='favicon.ico' rel='icon' type='image/x-icon' />
      </Head>
      <main className={`${inter.variable} font-inter ${inconsolata.variable}`}>
        <SnackbarContextProvider>
          <div className='flex min-h-screen flex-col'>
            <Component {...pageProps} />
          </div>
        </SnackbarContextProvider>
      </main>
      <SegmentScript />
      {/* CookiePro Cookies Consent Notice start for clickhouse.com */}
      <Script
        id='otSdkStub-script'
        src='https://cookie-cdn.cookiepro.com/scripttemplates/otSDKStub.js'
        charSet='UTF-8'
        type='text/javascript'
        data-domain-script={`dedccc4b-7ab2-47de-935c-073b23b1d9b7${
          process.env.NEXT_IS_PROD === 'true' ? '' : '-test'
        }`}
        strategy='lazyOnload'
      />
      <Script
        id='cookie-consent'
        type='text/javascript'>{`function OptanonWrapper() {}`}</Script>

      {/* CookiePro Cookies Consent Notice start for clickhouse.com */}
      <Script
        id='stripmkttok-script'
        src='https://discover.clickhouse.com/js/stripmkttok.js'
        type='text/javascript'
        async
      />

      {/* Google Analytics for clickhouse.com */}
      <Script id='google-tag-manager' strategy='lazyOnload'>
        {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer', '${gtmId}');
      `}
      </Script>

      {/* Drift */}
      <Script id='show-banner'>
        {`
          "use strict";

          !function() {
            var t = window.driftt = window.drift = window.driftt || [];
            if (!t.init) {
              if (t.invoked) return void (window.console && console.error && console.error("Drift snippet included twice."));
              t.invoked = !0, t.methods = [ "identify", "config", "track", "reset", "debug", "show", "ping", "page", "hide", "off", "on" ],
              t.factory = function(e) {
                return function() {
                  var n = Array.prototype.slice.call(arguments);
                  return n.unshift(e), t.push(n), t;
                };
              }, t.methods.forEach(function(e) {
                t[e] = t.factory(e);
              }), t.load = function(t) {
                var e = 3e5, n = Math.ceil(new Date() / e) * e, o = document.createElement("script");
                o.type = "text/javascript", o.async = !0, o.crossorigin = "anonymous", o.src = "https://js.driftt.com/include/" + n + "/" + t + ".js";
                var i = document.getElementsByTagName("script")[0];
                i.parentNode.insertBefore(o, i);
              };
            }
          }();
          drift.SNIPPET_VERSION = '0.3.1';
          drift.load('bhbc5tszm6xi');`}
      </Script>
    </>
  )
}

export default MyApp
