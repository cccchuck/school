const { getStorage, setStorage } = require("../../utils/main")

// miniprogram/pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: null,
    tname: null,
    school: null,
    avatar: null
  },

  afterRead(e) {
    const imgURL = e.detail.file.url;
    const ext = imgURL.split('.').pop();
    const avatar = `data:image/${ ext };base64,` + wx.getFileSystemManager().readFileSync(imgURL, 'base64')
    this.setData({ avatar })
  },

  saveInfo() {
    let school = this.data.school
    if (school.length >= 6) school = school.slice(0, 6) + '...'

    const config = {
      name: this.data.name,
      tname: this.data.tname,
      school,
      avatar: this.data.avatar
    }
    
    setStorage('config', config)
      .then(_ => {
        wx.showToast({
          title: '保存成功！',
        })
      })
      .catch(_ => {})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getStorage('config')
      .then(config => {
        const { name, tname, school, avatar } = config
        this.setData({ name, tname, school, avatar })
      })
      .catch(error => {
        // 静默
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