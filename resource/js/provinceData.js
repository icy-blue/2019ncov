function getRequest() {
  let url = location.search;
  let theRequest = {};
  if (url.indexOf("?") != -1) {
    let str = url.substr(1);
    strs = str.split("&");
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}
let linkNameArray = getRequest();
let linkENName = linkNameArray.province;
document.write("<script type='text/javascript' src='/js/map/" + linkENName + ".js'></script>");
let allData = getJSONArray("http://data.icys.club/" + linkENName + "-all.json");
setTimeout(function() {
  console.log(allData);
}, waiting);
