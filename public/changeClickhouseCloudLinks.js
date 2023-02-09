const cookieMap = document.cookie.split('; ').reduce((prev, item) => {
  const splitItem = item.split('=')
  prev[splitItem[0]] = splitItem[1]
  return prev
}, {})
const ajsId = cookieMap['ajs_user_id'] || cookieMap['ajs_anonymous_id']

const changeClickhouseCloudLinks = (ajsId) => {
  const anchors = document.getElementsByTagName("a");
  for (let i = 0; i < anchors.length; i++) {
    if (anchors[i].href.includes("clickhouse.cloud")) {
      const url = new URL(anchors[i].href);

      url.searchParams.set("ajs_aid", ajsId);
      anchors[i].href = url.href;
    }
  }
};

window.addEventListener("pageAnalytics", function (e) {
  console.log("Clickhouse cloud link triggered")
  changeClickhouseCloudLinks(e.detail.name)
});
