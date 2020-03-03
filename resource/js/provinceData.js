let result = [],
  provinceChartData = [];

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
let linkCNName = getCNByEN(linkENName);
document.write("<script type='text/javascript' src='/js/map/" +
  linkENName + ".js'></script>");
let allData = getJSONArray("http://data.icys.club/" + linkENName + "-all.json");

function compare(property, increase) {
  return function(a, b) {
    var value1 = a[property];
    var value2 = b[property];
    return (value1 - value2) * increase ? 1 : -1;
  };
}

function processData() {
  let array = allData.results;
  array.sort(compare("updateTime", false));
  let map = [];
  for (let i = 0; i < array.length; i++) {
    let item = array[i];
    let date = new Date(item.updateTime);
    let str = date.toDateString();
    if (map[str] === true) continue;
    map[str] = true;
    item.日期 = "" + date.getFullYear() + "/" +
      date.getMonth() + "/" + date.getDate();
    item.累计确诊 = item.confirmedCount;
    item.现有确诊 = item.currentConfirmedCount;
    item.现有疑似 = item.suspectedCount;
    item.累计死亡 = item.deadCount;
    item.现有重症 = 0;
    item.累计治愈 = item.curedCount;
    item["累计确诊+现有疑似"] = item.confirmedCount + item.suspectedCount;
    item.新增确诊 = i == (array.length - 1) ? item.confirmedCount :
      item.confirmedCount - result[i + 1].confirmedCount;
    item.新增疑似 = i == (array.length - 1) ? item.suspectedCount :
      item.suspectedCount - result[i + 1].suspectedCount;
    item["新增(疑似+确诊)"] = item.新增确诊 + item.新增疑似;
    item["死亡/确诊"] = item.confirmedCount == 0 ? 0 :
      item.deadCount / item.confirmedCount;
    item.观察中 = 0;
    result.push(item);
  }
  datapack = result[0];
  datapack.seriousCount = datapack.seriousIncr = 0;
  datapack.currentConfirmedIncr = result[0].currentConfirmedCount -
    result[1].currentConfirmedCount;
  datapack.suspectedIncr = result[0].suspectedCount - result[1].suspectedCount;
  datapack.curedIncr = result[0].curedCount - result[1].curedCount;
  datapack.confirmedIncr = result[0].confirmedCount - result[1].confirmedCount;
  datapack.deadIncr = result[0].deadCount - result[1].deadCount;
  let it = result[0];
  dataArray.push(result[0]);
  for (let item in result.cities) {
    dataArray.push(item);
    provinceChartData.push({
      name: item.cityName + "市",
      value: item.currentConfirmedCount
    });
  }
  result.sort(compare(updateTime, true));
}

function processProvince() {
  var chartChina = echarts.init(
    document.getElementById('chartA'), 'white', {
      renderer: 'canvas'
    });
  var optionChina = {
    animation: true,
    animationThreshold: 2000,
    animationDuration: 1000,
    animationEasing: "cubicOut",
    animationDelay: 0,
    animationDurationUpdate: 300,
    animationEasingUpdate: "cubicOut",
    animationDelayUpdate: 0,
    color: [
      "#320303",
      "#40190f",
      "#3f1414",
      "#451410"
    ],
    series: [{
      type: "map",
      name: "\u786e\u8bca",
      label: {
        show: true,
        position: "top",
        margin: 8
      },
      mapType: "" + linkCNName,
      data: provinceChartData,
      roam: true,
      zoom: 1,
      showLegendSymbol: true,
      emphasis: {}
    }],
    legend: [{
      data: [
        "确诊"
      ],
      selected: {
        "确诊": true
      },
      show: false,
      padding: 5,
      itemGap: 10,
      itemWidth: 25,
      itemHeight: 14
    }],
    tooltip: {
      show: true,
      trigger: "item",
      triggerOn: "mousemove|click",
      axisPointer: {
        type: "line"
      },
      textStyle: {
        fontSize: 16
      },
      borderWidth: 0
    },
    title: [{
      text: linkCNName + "疫情情况",
      left: "center",
      padding: 5,
      itemGap: 10,
      textStyle: {
        fontSize: 25
      }
    }],
    visualMap: {
      show: true,
      type: "continuous",
      min: 0,
      max: 1396.0,
      inRange: {
        color: [
          "#69d94f",
          "#f65004",
          "#7d1f2a"
        ]
      },
      calculable: true,
      inverse: false,
      splitNumber: 5,
      orient: "vertical",
      showLabel: true,
      itemWidth: 20,
      itemHeight: 140,
      borderWidth: 0
    }
  };
}

$(document).ready(function() {
  setTimeout(function() {
    processData();
    table = $('#table_province').DataTable({
      data: tableArray,
      columns: [{
          data: 'provinceName'
        },
        {
          data: 'cityName'
        },
        {
          data: 'confirmedCount'
        },
        {
          data: 'currentConfirmedCount'
        },
        {
          data: 'curedCount'
        },
        {
          data: 'deadCount'
        }
      ],
      aaSorting: [
        [2, "desc"],
        [1, "desc"]
      ],
      order: [
        [0, 'asc']
      ],
      columnDefs: [{
        targets: [0],
        visible: false
      }],
      language: {
        "sProcessing": "处理中...",
        "sLengthMenu": "显示 _MENU_ 项结果",
        "sZeroRecords": "没有匹配结果",
        "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
        "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
        "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
        "sInfoPostFix": "",
        "sSearch": "搜索:",
        "sUrl": "",
        "sEmptyTable": "表中数据为空",
        "sLoadingRecords": "载入中...",
        "sInfoThousands": ",",
        "oPaginate": {
          "sFirst": "首页",
          "sPrevious": "上页",
          "sNext": "下页",
          "sLast": "末页"
        },
        "oAria": {
          "sSortAscending": ": 以升序排列此列",
          "sSortDescending": ": 以降序排列此列"
        }
      },
      colReorder: true,
      keys: true
    });
    updateNumbers(datapack);
    processProvince();
  }, waiting);
});
