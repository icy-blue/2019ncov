
let url = "https://service-0gg71fu4-1252957949.gz.apigw.tencentcs.com/release/dingxiangyuan"
let dataJSON = $.ajax({url: url, aysnc: false});
let array = JSON.parse(dataJSON);
console.log(array);
