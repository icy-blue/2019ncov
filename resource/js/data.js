let dataArray, table, dataDetail;

let tableArray = [],
  chinaChartArray = [],
  worldChartArray = [],
  nameArray = [];

function Province(provinceName, cityName, confirmedCount, currentConfirmedCount,
  suspectedCount, curedCount, deadCount) {
  this.provinceName = provinceName;
  this.cityName = cityName;
  this.confirmedCount = confirmedCount;
  this.currentConfirmedCount = currentConfirmedCount;
  this.suspectedCount = suspectedCount;
  this.curedCount = curedCount;
  this.deadCount = deadCount;
}

let nameData = $.getJSON("/resource/data/country-code.json");

// let data = $.getJSON("https://service-0gg71fu4-1252957949.gz.apigw.tencentcs.com/release/dingxiangyuan", null, function(data, status, xhr) {
let data = $.getJSON("/resource/data/dingxiangyuan.json", null, function(data, status, xhr) {
  let json = JSON.stringify(data);
  dataArray = JSON.parse(json);
  dataDetail = dataArray.data.getAreaStat;
  for (let i = 0; i < dataDetail.length; i++) {
    let province = dataDetail[i];
    tableArray.push(new Province(province.provinceName, province.provinceName,
      province.confirmedCount, province.currentConfirmedCount,
      province.suspectedCount, province.curedCount, province.deadCount));
    let cities = province.cities;
    for (let j = 0; j < cities.length; j++) {
      let city = cities[j];
      tableArray.push(new Province(province.provinceName, city.cityName,
        city.confirmedCount, city.currentConfirmedCount, city.suspectedCount,
        city.curedCount, city.deadCount));
    }
  }
  for (let i = 0; i < dataDetail.length; i++) {
    chinaChartArray.push({
      "name": dataDetail[i].provinceShortName,
      "value": dataDetail[i].currentConfirmedCount
    });
  }
  console.log(chinaChartArray);
});

$(document).ready(function() {
  setTimeout(function() {
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
    let datapack = dataArray.data.getStatisticsService;

    let currentConfirmedCount = datapack.curedCount;
    let seriousCount = datapack.seriousCount;
    let suspectedCount = datapack.suspectedCount;
    let confirmedCount = datapack.confirmedCount;
    let deadCount = datapack.deadCount;
    let curedCount = datapack.curedCount;

    let currentConfirmedIncr = datapack.currentConfirmedIncr;
    let seriousIncr = datapack.seriousIncr;
    let suspectedIncr = datapack.suspectedIncr;
    let confirmedIncr = datapack.confirmedIncr;
    let deadIncr = datapack.deadIncr;
    let curedIncr = datapack.curedIncr;

    $("#currentConfirmedCount").text(currentConfirmedCount);
    $("#seriousCount").text(seriousCount);
    $("#suspectedCount").text(suspectedCount);
    $("#confirmedCount").text(confirmedCount);
    $("#deadCount").text(deadCount);
    $("#curedCount").text(curedCount);

    $("#currentConfirmedIncr").text(currentConfirmedIncr);
    $("#seriousIncr").text(seriousIncr);
    $("#suspectedIncr").text(suspectedIncr);
    $("#confirmedIncr").text(confirmedIncr);
    $("#deadIncr").text(deadIncr);
    $("#curedIncr").text(curedIncr);
  }, 3000);
});

setTimeout(function() {
  nameArray = nameData.responseJSON;
  let globalPack = dataArray.data.getListByCountryTypeService2;
  for (let i = 0; i < globalPack.length; i++) {
    let cnName = globalPack[i].provinceName,
      enName;
    for (let j = 0; j < nameArray.length; j++) {
      console.log(nameArray[j].cn);
      if (nameArray[j].cn == cnName) {
        enName = nameArray[j].en;
        console.log(enName);
      }
    }
    worldChartArray.push({
      "name": enName,
      "value": globalPack[i].currentConfirmedCount
    });
  }
  worldChartArray.push({
    "name": "China",
    "value": currentConfirmedCount
  });
  console.log(worldChartArray);
}, 200);
