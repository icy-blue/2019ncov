let dataArray, table, dataDetail, provinceNameArray, lineArray, cityArray, datapack;
let ajaxArray = [];

let waiting = 4000;

let tableArray = [],
  chinaChartArray = [],
  worldChartArray = [],
  nameArray = [];

function getJSONArray(url, name) {
  // console.log(3);
  let data = $.ajax({
    url: url,
    async: true,
    type: "GET",
    dataType: 'json',
    success: function () {
      console.log(name, data);
      ajaxArray[name] = data.responseJSON;
    },
    error: function (arg) {
      let text = data.responseText;
      text = text.replace("True", "true");
      text = text.replace(/'/g, '"');
      let json = JSON.parse(text);
      ajaxArray[name] = json;
    }
  });
}

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

function updateNumber(target, increaseNum, newNum) {
  target
    .prop('number', newNum - increaseNum)
    .animateNumber({
      number: newNum
    }, 3000);
}

function getCNByEN(enName) {
  for (let j = 0; j < nameArray.length; j++) {
    if (nameArray[j].en == enName) {
      return nameArray[j].cn;
    }
  }
}

function getENByCN(cnName) {
  for (let j = 0; j < nameArray.length; j++) {
    if (nameArray[j].cn == cnName) {
      return nameArray[j].en;
    }
  }
}

function updateNumbers(datapack) {
  let currentConfirmedCount = datapack.currentConfirmedCount;
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

  updateNumber($("#currentConfirmedCount"), currentConfirmedIncr, currentConfirmedCount);
  updateNumber($("#seriousCount"), seriousIncr, seriousCount);
  updateNumber($("#suspectedCount"), suspectedIncr, suspectedCount);
  updateNumber($("#confirmedCount"), confirmedIncr, confirmedCount);
  updateNumber($("#deadCount"), deadIncr, deadCount);
  updateNumber($("#curedCount"), curedIncr, curedCount);

  updateNumber($("#currentConfirmedIncr"), currentConfirmedIncr, currentConfirmedIncr);
  updateNumber($("#seriousIncr"), seriousIncr, seriousIncr);
  updateNumber($("#suspectedIncr"), suspectedIncr, suspectedIncr);
  updateNumber($("#confirmedIncr"), confirmedIncr, confirmedIncr);
  updateNumber($("#deadIncr"), deadIncr, deadIncr);
  updateNumber($("#curedIncr"), curedIncr, curedIncr);
}

function getArrays() {
  console.log(2);
  getJSONArray("/resource/data/country-code.json", "nameArray");
  getJSONArray("http://data.icys.club/git.json", "lineArray");
  getJSONArray("/resource/data/city.json", "cityArray");
  getJSONArray("/resource/data/province.json", "provinceNameArray");
  getJSONArray("http://data.icys.club/dingxiangyuan.json", "dataArray");
  setTimeout(function () {
    nameArray = ajaxArray.nameArray;
    lineArray = ajaxArray.lineArray;
    cityArray = ajaxArray.cityArray;
    provinceNameArray = ajaxArray.provinceNameArray;
    dataArray = ajaxArray.dataArray;
  }, waiting - 200);
}

function makeOverallTable() {
  console.log(dataArray);
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
}

function processGlobal() {
  let globalPack = dataArray.data.getListByCountryTypeService2;
  console.log(globalPack);
  for (let i = 0; i < globalPack.length; i++) {
    let cnName = globalPack[i].provinceName;
    let enName = getENByCN(cnName);
    // console.log(cnName, enName);
    worldChartArray.push({
      "name": enName,
      "value": globalPack[i].currentConfirmedCount
    });
  }
  worldChartArray.push({
    "name": "China",
    "value": datapack.currentConfirmedCount
  });
}

function processChina() {
  for (let i = 0; i < dataDetail.length; i++) {
    chinaChartArray.push({
      "name": dataDetail[i].provinceShortName,
      "value": dataDetail[i].currentConfirmedCount
    });
  }
}

$(document).ready(function() {
  console.log(1);
  getArrays();
  setTimeout(function() {
    makeOverallTable();
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
