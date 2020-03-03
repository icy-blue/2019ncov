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

function makeOverallTable(dataDetail) {
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
