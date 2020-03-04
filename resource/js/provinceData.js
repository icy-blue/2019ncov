let result = [],
  provinceChartData = [], itemA, itemB;

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
document.write("<script type='text/javascript' src='/resource/js/map/" +
  linkENName + ".js'></script>");
getJSONArray("http://cdn.icys.club/" + linkENName + "-all.json",
  "province-all-data");

function compare(property, increase) {
  return function(a, b) {
    let value1 = a[property];
    let value2 = b[property];
    // console.log((value1 - value2), (value1 - value2) * increase ? -1 : 1);
    return (value1 - value2) * increase ? -1 : 1;
  };
}

function processData() {
  let allData = ajaxArray["province-all-data"];
  let array = allData.results;
  array.sort(compare("updateTime", true));
  let map = [];
  for (let i = 0; i < array.length; i++) {
    let item = array[i];
    let date = new Date(item.updateTime);
    if (i != array.length - 1) {
      let nxtDate = new Date(array[i + 1].updateTime);
      if (date.toDateString() === nxtDate.toDateString()) {
        continue;
      }
    }
    item.日期 = "" + date.getFullYear() + "/" +
      (date.getMonth() + 1) + "/" + date.getDate();
    item.累计确诊 = item.confirmedCount;
    item.现有确诊 = item.currentConfirmedCount;
    item.现有疑似 = item.suspectedCount;
    item.累计死亡 = item.deadCount;
    item.现有重症 = 0;
    item.累计治愈 = item.curedCount;
    item["累计确诊+现有疑似"] = item.confirmedCount + item.suspectedCount;
    // console.log(i, array.length - 1);
    item.新增确诊 = result.length == 0 ? item.confirmedCount :
      item.confirmedCount - result[result.length - 1].confirmedCount;
    item.新增疑似 = result.length == 0 ? item.suspectedCount :
      item.suspectedCount - result[result.length - 1].suspectedCount;
    item["新增(疑似+确诊)"] = item.新增确诊 + item.新增疑似;
    item["死亡/确诊"] = item.confirmedCount == 0 ? 0 :
      item.deadCount / item.confirmedCount;
    item.观察中 = 0;
    result.push(item);
  }
  result.sort(compare("updateTime", false));
  itemA = result[result.length -1], itemB = result[result.length - 2];
  dataArray.push(new Province(itemA.provinceName, itemA.provinceName,
    itemA.confirmedCount, itemA.currentConfirmedCount,
    itemA.suspectedCount, itemA.curedCount, itemA.deadCount));
  for (let i = 0; i < itemA.cities.length; i++) {
    let item = itemA.cities[i];
    // console.log(item);
    item.provinceName = itemA.provinceName;
    dataArray.push(new Province(itemA.provinceName, item.cityName,
      item.confirmedCount, item.currentConfirmedCount, item.suspectedCount,
      item.curedCount, item.deadCount));
    provinceChartData.push({
      name: getRealName(item.cityName, item.provinceName),
      value: item.currentConfirmedCount
    });
    // console.log(item.cityName, getRealName(item.cityName, item.provinceName));
  }
  // console.log(provinceChartData);
  datapack = itemA;
  datapack.seriousCount = datapack.seriousIncr = 0;
  datapack.currentConfirmedIncr = itemA.currentConfirmedCount -
    itemB.currentConfirmedCount;
  datapack.suspectedIncr = itemA.suspectedCount - itemB.suspectedCount;
  datapack.curedIncr = itemA.curedCount - itemB.curedCount;
  datapack.confirmedIncr = itemA.confirmedCount - itemB.confirmedCount;
  datapack.deadIncr = itemA.deadCount - itemB.deadCount;
}

function processProvince() {
  let chartProvince = echarts.init(
    document.getElementById('chartA'), 'white', {
      renderer: 'canvas'
    });
  let optionProvince = {
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
      map: "" + itemA.provinceShortName,
      mapType: "province",
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
      text: itemA.provinceName + "疫情情况",
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
  chartLine = echarts.init(document.getElementById('chartLine'));
  dimensions = ['日期', '累计确诊', '现有确诊（含重症）', '现有疑似', '现有重症', '累计死亡', '累计治愈',
    '累计确诊+现有疑似', '新增确诊', '新增疑似', '新增(疑似+确诊)', '观察中', '死亡/确诊'
  ];
  optionLine = {
    title: {
      text: itemA.provinceName + '新型肺炎疫情趋势',
      x: 'center',
      y: 'top',
      top: '25px',
      textStyle: {
        fontSize: 25
      }
    },
    legend: {
      type: 'scroll',
      x: 'center',
      y: 'bottom',
      padding: [0, 20],
      itemGap: 3,
      selected: {}
    },
    grid: {
      left: '15%',
      bottom: '40px'
    },
    tooltip: {},
    dataset: {
      dimensions: dimensions,
      source: result,
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {},
    dataZoom: [{
      type: 'inside',
      throttle: '50',
      minValueSpan: 7,
      start: 100,
      end: 100
    }],
    series: [{
        type: 'bar'
      },
      {
        type: 'bar'
      },
      {
        type: 'bar'
      },
      {
        type: 'bar'
      },
      {
        type: 'bar'
      },
      {
        type: 'bar'
      },
      {
        type: 'line',
        label: {
          normal: {
            show: true,
            position: 'top',
          },
        }
      },
      {
        type: 'line',
        label: {
          normal: {
            show: true,
            position: 'top',
          },
        }
      },
      {
        type: 'line',
        label: {
          normal: {
            show: true,
            position: 'top',
          },
        }
      },
      {
        type: 'line',
        label: {
          normal: {
            show: true,
            position: 'top',
          }
        }
      },
      {
        type: 'line',
        label: {
          normal: {
            show: true,
            position: 'top',
          }
        }
      },
      {
        type: 'line',
        label: {
          normal: {
            show: true,
            position: 'top',
            formatter: function(params) {
              str = params.data['死亡/确诊'] + '%';
              return str;
            }
          }
        },
        tooltip: {
          formatter: function(item) {
            str = item.seriesName + "<br>" +
              item.marker + ' ' + item.data['日期'] + ' : ' + item.data['死亡/确诊'] + '%';
            return str;
          }

        }
      }
    ]
  };
  optionLine.legend.selected['观察中'] = false;
  optionLine.legend.selected['死亡/确诊'] = false;
  chartProvince.setOption(optionProvince);
  chartLine.setOption(optionLine);
}

$(document).ready(function() {
  setTimeout(function() {
    processData();
    $('pro_text').text(itemA.provinceName + "疫情");
    table = $('#table_province').DataTable({
      data: dataArray,
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
      rowGroup: {
        dataSrc: 'provinceName'
      },
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
