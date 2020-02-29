import requests
import json
import time
proCN = ["浙江省", "山东省", "四川省", "河南省", "湖南省", "广西壮族自治区",
"福建省", "陕西省", "河北省", "海南省", "广东省", "江苏省", "吉林省",
"新疆维吾尔自治区", "内蒙古自治区", "山西省", "云南省", "上海市", "重庆市",
"黑龙江省", "安徽省", "甘肃省", "北京市", "江西省", "湖北省", "天津市", "辽宁省",
"宁夏回族自治区", "贵州省", "青海省", "西藏自治区", "澳门"]
proEN = ["Zhejiang", "Shandong", "Sichuan", "Henan", "Hunan", "Guangxi",
"Fujian", "Shaanxi", "Hebei", "Hainan", "Guangdong", "Jiangsu", "Jilin",
"Xinjiang", "Neimenggu", "Shanxi", "Yunnan", "Shanghai", "Chongqing",
"Heilongjiang", "Anhui", "Gansu", "Beijing", "Jiangxi", "Hubei", "Tianjin",
"Liaoning", "Ningxia", "Guizhou", "Qinghai", "Xizang", "Macao"]
def getAPI(url, dataname):
    response = requests.get(url, "")
    txt = response.text.encode("gb2312").decode("gb2312").encode("utf-8")
    # txt = response.text.encode("gb2312").decode("utf-8") by yyx
    content = json.loads(txt)
    print(dataname + ": " + str(len(txt)))
    if len(response.text) > 200:
        data = open(dataname,"w+")
        print(content, file = data)
        data.close()
        print("done")
def process():
    dxyURL = "http://dxy.icys.club/release/dingxiangyuan"
    dxyName = "dingxiangyuan.json"
    getAPI(dxyURL, dxyname)
    #
    elseURL = "https://lab.isaaclin.cn/nCoV/api/area?latest="
    overall = "all.json"
    getAPI(elseURL, overall)

    i = 0
    while i < len(proCN):
        proURL = elseURL + "0&province=" + proCN[i]
        name = proEN[i] + "-all.json"
        getAPI(proURL, name)
        time.sleep(5)
        i = i + 1
    i = 0
    while i < len(proCN):
        proURL = elseURL + "1&province=" + proCN[i]
        name = proEN[i] + "-latest.json"
        getAPI(proURL, name)
        time.sleep(5)
        i = i + 1
if __name__=='__main__':
    i = 1
    while True:
        print(i)
        i = i + 1
        process()
        time.sleep(60*60)
