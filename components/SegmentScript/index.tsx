import React, { useEffect } from 'react'
import Script from 'next/script'
import { AnalyticsSnippet } from '@segment/analytics-next'
import { useRouter } from 'next/router'

declare global {
  interface Window {
    analytics: AnalyticsSnippet
  }
}

type UTMs = {
  [key: string]: string
}

const segmentKey =
  process.env.NEXT_PUBLIC_SEGEMENT ?? 'N60KaTd2DBTDYKUfGThvzkrcPZFj9hEu'

const SegmentScript = () => {
  const router = useRouter()

  const updateLinks = () => {
    const links = Array.from(document.querySelectorAll('a'))
    for (const link of links) {
      if (link.hostname.includes('.cloud')) {
        const updatedURL = appendUTMsToLink(link.href)
        link.href = updatedURL
      }
    }
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const utmValues: UTMs = {}

    // Convert iterator to array
    const entries = Array.from(urlParams.entries())
    for (const [key, value] of entries) {
      if (key.startsWith('utm_') || key === 'gclid') {
        utmValues[key] = value
      }
    }

    if (Object.keys(utmValues).length > 0) {
      storeUTMsInStorage(utmValues)
    }

    updateLinks()

    const handleRouteChange = () => {
      updateLinks()
      window.analytics.page()
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

  const inlineScript = `
  function assignUserToCloud() {
      const ajsId = window.analytics.user()?.anonymousId();
      const anchors = document.getElementsByTagName("a");
      for (let i = 0; i < anchors.length; i++) {
        if (anchors[i].href.includes("clickhouse.cloud")) {
          const url = new URL(anchors[i].href);
          url.searchParams.set("ajs_aid", ajsId);
          anchors[i].href = url.href;
        }
      }
    }
  (function(){
    // Create a queue, but don't obliterate an existing one!
    var analytics = window.analytics = window.analytics || [];
    // If the real analytics.js is already on the page return.
    if (analytics.initialize) return;
    // If the snippet was invoked already show an error.
    if (analytics.invoked) {
      if (window.console && console.error) {
        console.error('Segment snippet included twice.');
      }
      return;
    }
    // Invoked flag, to make sure the snippet
    // is never invoked twice.
    analytics.invoked = true;
    // A list of the methods in Analytics.js to stub.
    analytics.methods = [
      'trackSubmit',
      'trackClick',
      'trackLink',
      'trackForm',
      'pageview',
      'identify',
      'reset',
      'group',
      'track',
      'ready',
      'alias',
      'debug',
      'page',
      'once',
      'off',
      'on',
      'addSourceMiddleware',
      'addIntegrationMiddleware',
      'setAnonymousId',
      'addDestinationMiddleware'
    ];
    // Define a factory to create stubs. These are placeholders
    // for methods in Analytics.js so that you never have to wait
    // for it to load to actually record data. The "method" is
    // stored as the first argument, so we can replay the data.
    analytics.factory = function(method){
      return function(){
        var args = Array.prototype.slice.call(arguments);
        args.unshift(method);
        analytics.push(args);
        return analytics;
      };
    };
    // For each of our methods, generate a queueing stub.
    for (var i = 0; i < analytics.methods.length; i++) {
      var key = analytics.methods[i];
      analytics[key] = analytics.factory(key);
    }
    // Define a method to load Analytics.js from our CDN,
    // and that will be sure to only ever load it once.
    analytics.load = function(key, options){
      // Create an async script element based on your key.
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = 'https://cdn.segment.com/analytics.js/v1/'
          + key + '/analytics.min.js';
      // Insert our script next to the first script element.
      var first = document.getElementsByTagName('script')[0];
      first.parentNode.insertBefore(script, first);
      analytics._loadOptions = options;
    };
    analytics._writeKey = '${segmentKey}'
    // Add a version to keep track of what's in the wild.
    analytics.SNIPPET_VERSION = '4.15.2';
    // Load Analytics.js with your key, which will automatically
    // load the tools you've enabled for your account. Boosh!
    analytics.load("${segmentKey}");
    // Make the first page call to load the integrations. If
    // you'd like to manually name or tag the page, edit or
    // move this call however you'd like.
    analytics.page();
    analytics.ready(() => {
        const htmlNode = document.querySelector("html");

        const observer = new MutationObserver(assignUserToCloud);

        const config = {
          childList: true,
          subtree: true,
          attributes: false,
        };

        observer.observe(htmlNode, config);
    });
  })();
  `
  return (
    <Script
      id='segmentScript'
      type='text/javascript'
      strategy='lazyOnload'
      dangerouslySetInnerHTML={{
        __html: inlineScript
      }}></Script>
  )
}

export default React.memo(SegmentScript)

// Utility function to append UTMs to a link
export function appendUTMsToLink(url: string): string {
  const utms = getUTMsFromStorage()
  const urlObject = new URL(url)

  // Append UTMs to links that contain ".cloud"
  if (utms) {
    for (const [key, value] of Object.entries(utms)) {
      urlObject.searchParams.set(key, value)
    }
  }

  return urlObject.toString()
}

// Utility function to retrieve UTMs from localStorage
function getUTMsFromStorage(): UTMs | null {
  const utms = localStorage.getItem('ch-utms')
  if (utms) {
    const { data, timestamp } = JSON.parse(utms)
    const convertedTimestamp = new Date(parseInt(timestamp))
    const dateNow = new Date()

    if (dateNow.getTime() > convertedTimestamp.getTime()) {
      // Date has expired, remove it from localStorage
      localStorage.removeItem('ch-utms')
      return null
    }

    return data
  }

  return null
}

// Utility function to store UTMs in localStorage
function storeUTMsInStorage(utms: UTMs) {
  const expirationTime = new Date()
  expirationTime.setDate(expirationTime.getDate() + 14) // Set expiration to 14 days from now

  const data = {
    data: utms,
    timestamp: expirationTime.getTime()
  }
  localStorage.setItem('ch-utms', JSON.stringify(data))
}
