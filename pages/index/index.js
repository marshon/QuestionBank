//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    BankIndex: 0,
    Banks: [],
    judgments: [
      { topic: "判断题判断题1", selects: ["正确", "错误"], answers: "A" },
      { topic: "判断题判断题2", selects: ["正确", "错误"], answers: "A" },
      { topic: "判断题判断题3", selects: ["正确", "错误"], answers: "A" },
      { topic: "判断题判断题4", selects: ["正确", "错误"], answers: "A" },
      { topic: "判断题判断题5", selects: ["正确", "错误"], answers: "A" },
      { topic: "判断题判断题6", selects: ["正确", "错误"], answers: "A" },
      { topic: "判断题判断题7", selects: ["正确", "错误"], answers: "A" },
      { topic: "判断题判断题8", selects: ["正确", "错误"], answers: "A" },
      { topic: "判断题判断题9", selects: ["正确", "错误"], answers: "A" },
      { topic: "判断题判断题10", selects: ["正确", "错误"], answers: "A" }
    ],
    singles: [
      { topic: "单选题单选题1", selects: ["选项A", "选项B", "选项C", "选项D"], answers: "A" },
      { topic: "单选题单选题2", selects: ["选项A", "选项B", "选项C", "选项D"], answers: "A" },
      { topic: "单选题单选题3", selects: ["选项A", "选项B", "选项C"], answers: "A" },
      { topic: "单选题单选题4", selects: ["选项A", "选项B", "选项C"], answers: "A" },
      { topic: "单选题单选题5", selects: ["选项A", "选项B", "选项C", "选项D"], answers: "A" },
      { topic: "单选题单选题6", selects: ["选项A", "选项B", "选项C", "选项D"], answers: "A" },
      { topic: "单选题单选题7", selects: ["选项A", "选项B", "选项C", "选项D"], answers: "A" },
      { topic: "单选题单选题8", selects: ["选项A", "选项B", "选项C", "选项D"], answers: "A" },
      { topic: "单选题单选题9", selects: ["选项A", "选项B", "选项C", "选项D"], answers: "A" },
      { topic: "单选题单选题10", selects: ["选项A", "选项B", "选项C", "选项D"], answers: "A" },
    ],
    multi:[
      { topic: "多选题多选题1", selects: ["选项A", "选项B", "选项C", "选项D"], answers: "AB" },
      { topic: "多选题多选题2", selects: ["选项A", "选项B", "选项C", "选项D"], answers: "AB" },
      { topic: "多选题多选题3", selects: ["选项A", "选项B", "选项C"], answers: "AB" },
      { topic: "多选题多选题4", selects: ["选项A", "选项B", "选项C"], answers: "AB" },
      { topic: "多选题多选题5", selects: ["选项A", "选项B", "选项C", "选项D"], answers: "A" },
      { topic: "多选题多选题6", selects: ["选项A", "选项B", "选项C", "选项D"], answers: "AC" },
      { topic: "多选题多选题7", selects: ["选项A", "选项B", "选项C", "选项D", "选项E"], answers: "AD" },
      { topic: "多选题多选题8", selects: ["选项A", "选项B", "选项C", "选项D", "选项E"], answers: "C" },
      { topic: "多选题多选题9", selects: ["选项A", "选项B", "选项C", "选项D", "选项E"], answers: "AD" },
      { topic: "多选题多选题10", selects: ["选项A", "选项B", "选项C", "选项D", "选项E"], answers: "AE" },
    ],
    exam: {
      judgments:[],
      singles: [],
      multi: []
    }
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  bindPickerChange: function (e) {
    this.setData({
      BankIndex: e.detail.value
    })
  },

  radioChange: function (e) {
    //console.info(e.detail.value)
    var arr = e.detail.value.split("|");
    this.setData({ ["exam."+arr[2]+"[" + arr[0] + "].choose"]: String.fromCharCode(parseInt(arr[1]) + 65) });
  },

  checkboxChange: function (e) {
    //console.info(e.detail.value)
    if (e.detail.value.length == 0)
    {
      this.setData({ ["exam." + e.target.dataset.type + "[" + e.target.dataset.typeindex + "].choose"]: "" });
      return;
    }
    var choose = "";
    for (var i=0; i<e.detail.value.length; i++)
    {
      var arr = e.detail.value[i].split("|");
      choose += String.fromCharCode(parseInt(arr[1]) + 65);
    }
  
    var chooseArr = choose.split('');
    for (var i = 0; i < chooseArr.length; i++)
    {
      for (var j = i + 1; j < chooseArr.length; j++)
      {
        if (chooseArr[j] < chooseArr[i])
        {
          var tmp = chooseArr[j];
          chooseArr[j] = chooseArr[i];
          chooseArr[i] = tmp;
        }
      }
    }
    choose = chooseArr.join('');
    this.setData({ ["exam." + arr[2] + "[" + arr[0] + "].choose"]: choose });
  },

  reload: function () {
    var page = this;
    wx.showModal({
      title: '提示',
      content: '确定要重新开始考试吗？',
      success: function (res) {
        if (res.confirm) {
          page.setData({ submit: false });
          page.setData({ ["exam.judgments"]: page.shuffle(page.data.judgments, 5) });
          page.setData({ ["exam.singles"]: page.shuffle(page.data.singles, 5) });
          page.setData({ ["exam.multi"]: page.shuffle(page.data.multi, 5) });
          var num = 0;
          for (var i = 0; i < page.data.exam.judgments.length; i++ , num++) {
            page.setData({ ["exam.judgments[" + i + "].id"]: num });
            page.setData({ ["exam.judgments[" + i + "].typeIndex"]: i });
          }
          for (var i = 0; i < page.data.exam.singles.length; i++ , num++) {
            page.setData({ ["exam.singles[" + i + "].id"]: num });
            page.setData({ ["exam.singles[" + i + "].typeIndex"]: i });
          }
          for (var i = 0; i < page.data.exam.multi.length; i++ , num++) {
            page.setData({ ["exam.multi[" + i + "].id"]: num });
            page.setData({ ["exam.multi[" + i + "].typeIndex"]: i });
          }
        }
      }
    })
  },

  shuffle: function (arr, count) {
    for (var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
    return arr.slice(0, count);
  },

  submit: function () {
    for (var i = 0; i < this.data.exam.judgments.length; i++) {
      var question = this.data.exam.judgments[i];
      this.setData({ ["exam.judgments[" + i + "].color"]: question.answers !== question.choose ? "coral":"white" });
    }
    for (var i = 0; i < this.data.exam.singles.length; i++) {
      var question = this.data.exam.singles[i];
      this.setData({ ["exam.singles[" + i + "].color"]: question.answers !== question.choose ? "coral" : "white" });
    }
    for (var i = 0; i < this.data.exam.multi.length; i++) {
      var question = this.data.exam.multi[i];
      this.setData({ ["exam.multi[" + i + "].color"]: question.answers !== question.choose ? "coral" : "white" });
    }
    this.setData({ submit: true });
  },

  onLoad: function () {
    var page = this;
    wx.showLoading({
      title: '加载题库中...',
      mask: true
    })
    wx.request({
      url: 'https://questionbank-1256876619.cos.ap-shanghai.myqcloud.com/Banks.txt',
      headers: { 'Content-Type': 'application/json' },
      success: function (res) {
        page.setData({ Banks: res.data.Banks });

        var banksLength = page.data.Banks.length;
        var loadedBankCount = 0;
        if (banksLength == 0)
          wx.hideLoading();
        for (var i = 0; i < banksLength; i++) {
          wx.request({
            url: 'https://questionbank-1256876619.cos.ap-shanghai.myqcloud.com/' + page.data.Banks[i].fileName,
            headers: { 'Content-Type': 'application/json' },
            success: function (res) {
              if (res.statusCode === 200) {
                //page.setData({ judgments: res.data.judgments });
              }
              else
                wx.showToast({
                  icon: "none",
                  title: "错误码:" + res.statusCode,
                })
            },
            complete: function (res) {
              loadedBankCount++;
              if (loadedBankCount >= banksLength)
                wx.hideLoading();
            }
          })
        }
      }
    })




  },
})
