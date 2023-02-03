const cookieMap = document.cookie.split('; ').reduce((prev, item) => {
  const splitItem = item.split('=')
  prev[splitItem[0]] = splitItem[1]
  return prev
}, {})
const ajsId = cookieMap['ajs_user_id'] || cookieMap['ajs_anonymous_id']

const throttle = (callback, limit) => {
  let inTrhottle;
  return (...args) => {
    if (!inTrhottle) {
      inTrhottle = true;
      setTimeout(() => {
        inTrhottle = false;
        callback(...args);
      }, limit);
    }
  };
};

const changeClickhouseCloudLinks = throttle(() => {
  const anchors = document.getElementsByTagName("a");
  for (let i = 0; i < anchors.length; i++) {
    if (anchors[i].href.includes("clickhouse.cloud")) {
      const url = new URL(anchors[i].href);

      url.searchParams.set("ajs_aid", ajsId);
      anchors[i].href = url.href;
    }
  }
}, 100);

window.addEventListener("DOMContentLoaded", function () {
  const htmlNode = document.querySelector("html");

  const observer = new MutationObserver(changeClickhouseCloudLinks);

  const config = {
    childList: true,
    subtree: true,
    attributes: false,
  };

  observer.observe(htmlNode, config);
});
