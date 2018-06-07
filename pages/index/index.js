//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    judgments: [
      { topic: "题目题目题目题目", selects: ["正确", "错误"], answers: "A" },
      { topic: "题目题目题目", selects: ["正确", "错误"], answers: "A" },
      { topic: "题目题目", selects: ["正确", "错误"], answers: "A" }
    ],
    test: ""
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  radioChange: function (e) {
    //console.info(e.detail.value)
    var arr = e.detail.value.split("|");
    this.setData({ ["judgments[" + arr[0] + "].choose"]: String.fromCharCode(parseInt(arr[1]) + 65) });
  },

  submit: function (){
    var length = this.data.judgments.length;
    for (var i = 0; i < length; i++) {
      var question = this.data.judgments[i];
      if (question.answers !== question.choose)
        this.setData({ ["judgments[" + i + "].color"]:"coral"});
      else
        this.setData({ ["judgments[" + i + "].color"]: "white" });
    }
    this.setData({submit:true});
  },

  onLoad: function () {
    var page = this;
    wx.request({
      url: 'https://questionbank-1256876619.cos.ap-shanghai.myqcloud.com/Bank2.txt',
      headers: { 'Content-Type': 'application/json' },
      success: function (res) {
        if (res.statusCode === 200)
        {
          page.setData({ judgments: res.data.judgments });
          var length = page.data.judgments.length;
          for (var i = 0; i < length; i++) {
            page.setData({ ["judgments[" + i + "].id"]: i });
          }
        }
      }
    })
  },
})
