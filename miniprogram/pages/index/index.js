const { setStorage, getStorage } = require("../../utils/main");

//index.js
const app = getApp()

Page({
  data: {
    iconAssets: null,
    dailyNavList: null,
    schoolNavList: null,
    epidemicNavList: null
  },
  /**
   * 生成日常管理导航
   */
  generateDailyNavList() {
    const result = [{
      'icon': this.data.iconAssets.qianDaoIcon,
      'text': '签到'
    }, {
      'icon': this.data.iconAssets.qingJiaIcon,
      'text': '请假',
      'path': '/pages/index-qingjia/index'
    }, {
      'icon': this.data.iconAssets.wenJuanIcon,
      'text': '问卷'
    }, {
      'icon': this.data.iconAssets.tongZhiIcon,
      'text': '通知'
    }]
    return result;
  },

  /**
   * 生成疫情防控导航
   */
  generateSchoolNavList() {
    const result = [{
      'icon': this.data.iconAssets.riJianIcon,
      'text': '日检日报'
    }, {
      'icon': this.data.iconAssets.fanXiaoIcon,
      'text': '返校申请'
    }, {
      'icon': this.data.iconAssets.jianKangIcon,
      'text': '健康打卡'
    }]
    return result;
  },

  /**
   * 生成校园课程导航
   */
  generateEpidemicNavList() {
    const result = [{
      'icon': this.data.iconAssets.woDeKeChengIcon,
      'text': '我的课程'
    }, {
      'icon': this.data.iconAssets.keChengTongZhiIcon,
      'text': '课程通知'
    }, {
      'icon': this.data.iconAssets.keChengQianDaoIcon,
      'text': '课程签到'
    }]
    return result;
  },

  /**
   * 初始化
   */
  initData() {
    this.setData({
      dailyNavList: this.generateDailyNavList(),
      schoolNavList: this.generateSchoolNavList(),
      epidemicNavList: this.generateEpidemicNavList()
    })
  },

  /**
   * 初始化老师信息
   */
  initTeacherInfo() {
  },

  /**
   * 跳转页面
   */
  toPage(e) {
    const { path } = e.currentTarget.dataset;

    if (path) {
      wx.navigateTo({
        url: path
      })
    }
  },

  /**
   * 页面加载
   */
  onLoad: function() {
    const app = getApp();
    this.setData({ iconAssets: app.globalData.iconAssets })
    this.initTeacherInfo();
    this.initData();
  }
})
