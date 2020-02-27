setTimeout(function() {
  let qarr = [];
  console.log(detail);
  for (let i = 0; i < detail.length; i++) {
    qarr.push({
      "name": detail[i].provinceShortName,
      "value": detail[i].currentConfirmedCount
    });
  }
  console.log(qarr);
  var chart_chartA = echarts.init(
    document.getElementById('chartA'), 'white', {
      renderer: 'canvas'
    });
    var option_chartA = {
      "animation": true,
      "animationThreshold": 2000,
      "animationDuration": 1000,
      "animationEasing": "cubicOut",
      "animationDelay": 0,
      "animationDurationUpdate": 300,
      "animationEasingUpdate": "cubicOut",
      "animationDelayUpdate": 0,
      "color": [
        "#320303",
        "#40190f",
        "#3f1414",
        "#451410"
      ],
      "series": [{
        "type": "map",
        "name": "\u786e\u8bca",
        "label": {
          "show": true,
          "position": "top",
          "margin": 8
        },
        "mapType": "china",
        "data": qarr,
        "roam": true,
        "zoom": 1,
        "showLegendSymbol": true,
        "emphasis": {}
      }],
      "legend": [{
        "data": [
          "确诊"
        ],
        "selected": {
          "确诊": true
        },
        "show": false,
        "padding": 5,
        "itemGap": 10,
        "itemWidth": 25,
        "itemHeight": 14
      }],
      "tooltip": {
        "show": true,
        "trigger": "item",
        "triggerOn": "mousemove|click",
        "axisPointer": {
          "type": "line"
        },
        "textStyle": {
          "fontSize": 16
        },
        "borderWidth": 0
      },
      "title": [{
        "text": "国内疫情情况",
        "left": "center",
        "padding": 5,
        "itemGap": 10,
        "textStyle": {
          "fontSize": 25
        }
      }],
      "visualMap": {
        "show": true,
        "type": "continuous",
        "min": 0,
        "max": 1396.0,
        "inRange": {
          "color": [
            "#69d94f",
            "#f65004",
            "#7d1f2a"
          ]
        },
        "calculable": true,
        "inverse": false,
        "splitNumber": 5,
        "orient": "vertical",
        "showLabel": true,
        "itemWidth": 20,
        "itemHeight": 140,
        "borderWidth": 0
      }
    };
    chart_chartA.setOption(option_chartA);
},3000);
