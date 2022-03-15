const { getStorage } = require("../../utils/main")

// miniprogram/pages/index-detail/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: null,
    config: null,
    time: null
  },

  /**
   * 初始化老师信息
   */
  initApprovalTime(content) {
    const splitTime = content.beginTime.split(' ')
    const beginDate = splitTime[0]
    const beginTime = splitTime[1]
    const month = beginDate.split('-')[1]
    const date = beginDate.split('-')[2]
    const minus = ['01', '03', '07', '09', '15', '17', '19', '31', '35', '47', '50']
    const random = Math.ceil(Math.random() * 10)
    const hour = beginTime.split(':')[0] - 1
    const minu = minus[random]
    const time = `${ month }.${ date } ${hour}:${minu}`
    this.setData({ time })
  },

  /**
   * 初始化用户姓名、学院名字、导员名字
   */
  initUserConfig() {
    getStorage('config')
      .then(config => {
        this.setData({ config })
      })
      .catch(_ => {})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel()
    const _this = this
    eventChannel.on('postData', function(content) {
      _this.initApprovalTime(content)
      _this.initUserConfig()
      _this.setData({ content })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.initUserConfig()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})