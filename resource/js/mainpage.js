let chartChina, optionChina, chartWorld, optionWorld, chartLine, dimensions, optionLine;
function renderInit (){
  chartChina = echarts.init(
    document.getElementById('chartA'), 'white', {
      renderer: 'canvas'
    });
  optionChina = {
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
      mapType: "china",
      data: chinaChartArray,
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
      text: "国内疫情情况(加载失败请刷新)",
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
  chartWorld = echarts.init(
    document.getElementById('chartB'), 'white', {
      renderer: 'canvas'
    });
  optionWorld = {
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
        show: false,
        position: "top",
        margin: 8
      },
      mapType: "world",
      data: worldChartArray,
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
      text: "国际疫情情况(加载失败请刷新)",
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
      text: '全国新型肺炎疫情趋势',
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
      source: lineArray,
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
}
setTimeout(function() {
  optionLine.dataset.source = lineArray;
  chartChina.setOption(optionChina);
  chartWorld.setOption(optionWorld);
  chartLine.setOption(optionLine);
}, waiting + 200);

function getArrays() {
  getJSONArray("resource/data/country-code.json", "nameArray");
  getJSONArray("http://cdn.icys.club/git.json", "lineArray");
  getJSONArray("resource/data/city.json", "cityArray");
  getJSONArray("resource/data/province.json", "provinceNameArray");
  getJSONArray("http://cdn.icys.club/dingxiangyuan.json", "dataArray");
  setTimeout(function () {
    nameArray = ajaxArray.nameArray;
    lineArray = ajaxArray.lineArray;
    cityArray = ajaxArray.cityArray;
    provinceNameArray = ajaxArray.provinceNameArray;
    dataArray = ajaxArray.dataArray;
  }, waiting - 200);
}

$(document).ready(function() {
  getArrays();
  renderInit();
  setTimeout(function() {
    dataDetail = dataArray.data.getAreaStat;
    makeOverallTable(dataDetail);
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
    datapack = dataArray.data.getStatisticsService;
    updateNumbers(datapack);
    processGlobal();
    processChina();
  }, waiting);
});
