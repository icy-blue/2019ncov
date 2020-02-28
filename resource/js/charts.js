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
    text: "国内疫情情况",
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
var chartWorld = echarts.init(
  document.getElementById('chartB'), 'white', {
    renderer: 'canvas'
  });
var optionWorld = {
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
    text: "国际疫情情况",
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
var chartLine = echarts.init(document.getElementById('chartLine'));
var dimensions = ['日期', '累计确诊', '现有确诊（含重症）', '现有疑似', '现有重症', '累计死亡', '累计治愈',
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
    source: lineData.responseJSON,
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
setTimeout(function() {
  optionLine.dataset.source = lineData.responseJSON;
  chartChina.setOption(optionChina);
  chartWorld.setOption(optionWorld);
  console.log(optionLine);
  chartLine.setOption(optionLine);
}, 3200);
