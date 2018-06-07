//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    judgments: [
      { topic: "题目题目题目1", selects: ["正确", "错误"], answers: "A" },
      { topic: "题目题目题目2", selects: ["正确", "错误"], answers: "A" },
      { topic: "题目题目题目3", selects: ["正确", "错误"], answers: "A" },
      { topic: "题目题目题目4", selects: ["正确", "错误"], answers: "A" },
      { topic: "题目题目题目5", selects: ["正确", "错误"], answers: "A" },
      { topic: "题目题目题目6", selects: ["正确", "错误"], answers: "A" },
      { topic: "题目题目题目7", selects: ["正确", "错误"], answers: "A" },
      { topic: "题目题目题目8", selects: ["正确", "错误"], answers: "A" },
      { topic: "题目题目题目9", selects: ["正确", "错误"], answers: "A" },
      { topic: "题目题目题目10", selects: ["正确", "错误"], answers: "A" }
    ],
    exam: []
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
    this.setData({ ["exam[" + arr[0] + "].choose"]: String.fromCharCode(parseInt(arr[1]) + 65) });
  },

  reload: function () {
    var page = this;
    wx.showModal({
      title: '提示',
      content: '确定要重新开始考试吗？',
      success: function (res) {
        if (res.confirm) {
          page.setData({ submit: false });
          page.setData({ exam: page.shuffle(page.data.judgments) });
          var length = page.data.exam.length;
          for (var i = 0; i < length; i++) {
            page.setData({ ["exam[" + i + "].id"]: i });
          }
        }
      }
    })
  },

  shuffle: function (v) {
    for (var j, x, i = v.length; i; j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x);
    return v;
  },

  submit: function () {
    var length = this.data.exam.length;
    for (var i = 0; i < length; i++) {
      var question = this.data.exam[i];
      if (question.answers !== question.choose)
        this.setData({ ["exam[" + i + "].color"]: "coral" });
      else
        this.setData({ ["exam[" + i + "].color"]: "white" });
    }
    this.setData({ submit: true });
  },

  onLoad: function () {
    var page = this;
    wx.request({
      url: 'https://questionbank-1256876619.cos.ap-shanghai.myqcloud.com/Bank2.txt',
      headers: { 'Content-Type': 'application/json' },
      success: function (res) {
        if (res.statusCode === 200) {
          page.setData({ judgments: res.data.judgments });
        }
        else
          wx.showToast({
            icon: "none",
            title: "错误码:"+res.statusCode,
          })
      }
    })
  },
})
