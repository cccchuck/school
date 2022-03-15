const { setStorage, getStorage } = require("../../utils/main");

// miniprogram/pages/index-qingjia/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    tabs: ['请假记录', '提交请假'],
    formData: null,
    pickerData: null,
    minDate: new Date(2022, 1, 1).getTime(),
    maxDate: new Date(2023, 10, 3).getTime(),
    uploadFileList: [],
    leaveData: [],
    insetLeaveData: []
  },

  /**
   * 格式化时间 YYYY-MM-DD HH:MM
   */
  getFormatTime(time) {
    const date = time ? new Date(time) : new Date();
    const formateFilter = (item) => item.toString().length > 1 ? item.toString() : `0${item}`;
    const unformatedDate = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
    const unformatedTime = [date.getHours(), date.getMinutes()];
    return unformatedDate.map(formateFilter).join('-')
           + ' ' 
           + unformatedTime.map(formateFilter).join(':');
  },

  /**
   * Tab切换
   */
  switchTab(e) {
    const { index } = e.detail;
    this.setData({ current: index })
  },

  /**
   * 用户手动滑动swiper
   */
  swiperChange(e) {
    const { current } = e.detail;
    this.setData({ current });
  },

  /**
   * 请假类型选择响应
   * @param {*} e 
   */
  onTypeChange(e) {
    const { value } = e.detail;
    const formData = this.data.formData;
    const pickerData = this.data.pickerData;

    formData.type = value;
    pickerData.typeShow = false;
    this.setData({ formData, pickerData });
  },

  /**
   * 请假类型选择器开启
   */
  typeShow() {
    const pickerData = this.data.pickerData;

    pickerData.typeShow = true;
    this.setData({ pickerData });
  },

  /**
   * 请假类型选择器关闭
   */
  typeShowClose() {
    const pickerData = this.data.pickerData;

    pickerData.typeShow = false;
    this.setData({ pickerData });
  },

  /**
   * 是否离校选择响应
   * @param {*} e 
   */
  onLeaveChange(e) {
    const { value } = e.detail;
    const formData = this.data.formData;
    const pickerData = this.data.pickerData;

    formData.leave = value;
    pickerData.leaveShow = false;
    this.setData({ formData, pickerData });
  },

  /**
   * 是否离校选择器开启
   */
  leaveShow() {
    const pickerData = this.data.pickerData;

    pickerData.leaveShow = true;
    this.setData({ pickerData });
  },

  /**
   * 是否离校选择器关闭
   */
  leaveShowClose() {
    const pickerData = this.data.pickerData;

    pickerData.leaveShow = false;
    this.setData({ pickerData });
  },

  /**
   * 开始时间选择器响应
   */
  onBeginTimeConfirm(e) {
    const formData = this.data.formData;
    const pickerData = this.data.pickerData;

    formData.beginTime = this.getFormatTime(e.detail);
    pickerData.beginTimeShow = false;

    this.setData({ formData, pickerData })
  },

  /**
   * 开始时间选择器开启
   */
  beginTimeShow() {
    const pickerData = this.data.pickerData;
    pickerData.beginTimeShow = true;
    this.setData({ pickerData });
  },

  /**
   * 开始时间选择器关闭
   */
  beginTimeShowClose() {
    const pickerData = this.data.pickerData;
    pickerData.beginTimeShow = false;
    this.setData({ pickerData });
  },

  /**
   * 结束时间选择器响应
   */
  onEndTimeConfirm(e) {
    const formData = this.data.formData;
    const pickerData = this.data.pickerData;

    formData.endTime = this.getFormatTime(e.detail);
    pickerData.endTimeShow = false;
    this.setData({ formData, pickerData });
  },

  /**
   * 结束时间选择器开启
   */
  endTimeShow() {
    const pickerData = this.data.pickerData;
    pickerData.endTimeShow = true;
    this.setData({ pickerData });
  },

  /**
   * 结束时间选择器关闭
   */
  endTimeShowClose() {
    const pickerData = this.data.pickerData;
    pickerData.endTimeShow = false;
    this.setData({ pickerData });
  },

  /**
   * 销假地点选择器响应
   * @param {*} e 
   */
  onLocationChange(e) {
    const { value } = e.detail;
    const formData = this.data.formData;
    const pickerData = this.data.pickerData;

    formData.location = value;
    pickerData.locationShow = false;
    this.setData({ formData, pickerData });
  },

  /**
   * 销假地点选择器开启
   */
  locationShow() {
    const pickerData = this.data.pickerData;

    pickerData.locationShow = true;
    this.setData({ pickerData });
  },

  /**
   * 销假地点选择器关闭
   */
  locationShowClose() {
    const pickerData = this.data.pickerData;

    pickerData.locationShow = false;
    this.setData({ pickerData });
  },

  /**
   * 外出地点获取值
   */
  enterLocation(e) {
    const { value } = e.detail;
    this.data.formData.leaveLocation = value;
  },

  /**
   * 紧急联系人获取值
   */
  enterEmergencyContact(e) {
    const { value } = e.detail;
    this.data.formData.emergencyContact = value;
  },

  /**
   * 请假原因获取值
   */
  enterReason(e) {
    const { value } = e.detail;
    this.data.formData.reason = value;
  },

  /**
   * 本地持久化存储，返回持久化后的请假记录
   */
  saveData(data) {
    const leaveData = this.data.leaveData;

    // 生成ID
    data.ID = +new Date()
    // 是否销假
    data.destroied = false
    // 插入请假记录
    leaveData.unshift(data)

    return new Promise((resolve, reject) => {
      setStorage('leaveData', leaveData)
        .then(res => {
          resolve(leaveData)
        })
        .catch(err => {
          reject()
        })
    })
    
  },

  /**
   * 请假
   */
  enter() {
    // 表单验证
    if (this.data.formData.location === '请选择销假地点') {
      wx.showToast({
        title: '请填写销假地点',
      })
      return
    }

    if (!this.data.formData.emergencyContact) {
      wx.showToast({
        title: '请填写紧急联系人',
      })
      return
    }

    if (!this.data.formData.reason) {
      wx.showToast({
        title: '请填写请假事由',
      })
      return
    }

    // 本地持久化存储
    this.saveData(this.data.formData)
      .then(leaveData => {
        // 应用内数据更新
        this.setData({ leaveData })
        wx.showToast({
          title: '请假成功',
        })
      })
      .catch(error => {
        // setStorage 出错
        console.log('setStorage Error: ', error)
      })
  },

  /**
   * 销假
   * @param {Object} e 
   */
  destroy(e) {
    const ID = e.detail
    const leaveData = this.data.leaveData
    for (let item of leaveData) {
      if (item.ID === ID) item.destroied = true
    }
    
    setStorage('leaveData', leaveData)
  },

  /**
   * 初始化表单数据
   */
  initFormData() {
    const formData = {
      type: '事假',
      leave: '否',
      beginTime: this.getFormatTime(),
      endTime: this.getFormatTime(),
      leaveLocation: '',
      location: '请选择销假地点',
      emergencyContact: '',
      reason: ''
    }
    this.setData({ formData })
  },

  /**
   * 初始化选择器数据
   */
  initPickerData() {
    const pickerData = {
      type: ['事假', '病假', '实习', '科研', '回家', '出差', '其他'],
      leave: ['否', '是'],
      location: ['龙子湖校区', '象湖校区'],
      typeShow: false,
      leaveShow: false,
      locationShow: false,
      beginTimeShow: false,
      endTimeShow: false
    }
    this.setData({ pickerData })
  },

  /**
   * 初始化请假列表
   */
  initLeaveData() {
    const insetLeaveData = [{
      type: '事假',
      leave: '是',
      beginTime: '2021-04-30 09:30',
      endTime: '2021-05-03 19:00',
      leaveLocation: '郑州市二七区',
      location: '龙子湖校区',
      emergencyContact: '18838083809',
      reason: '回家',
      ID: 1600000000000,
      destroied: true
    }, {
      type: '病假',
      leave: '是',
      beginTime: '2021-05-24 12:30',
      endTime: '2021-05-24 19:00',
      leaveLocation: '姚桥社区',
      location: '龙子湖校区',
      emergencyContact: '18838083809',
      reason: '出去看病',
      ID: 1600000000001,
      destroied: true
    }, {
      type: '事假',
      leave: '是',
      beginTime: '2021-05-27 10:30',
      endTime: '2021-05-27 17:00',
      leaveLocation: '太格茂',
      location: '龙子湖校区',
      emergencyContact: '18838083809',
      reason: '好朋友来找我，出去吃饭',
      ID: 1600000000002,
      destroied: true
    }, {
      type: '事假',
      leave: '是',
      beginTime: '2021-06-05 08:30',
      endTime: '2021-06-05 19:00',
      leaveLocation: '银基王朝中国银行支行',
      location: '龙子湖校区',
      emergencyContact: '18838083809',
      reason: '银行卡出问题',
      ID: 1600000000003,
      destroied: true
    }]
    insetLeaveData.reverse()
    getStorage('leaveData')
      .then(leaveData => {
        this.setData({ leaveData })
      })
      .catch(error => {
        // 暂无存储
      })
    this.setData({ insetLeaveData })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initFormData()
    this.initPickerData()
    this.initLeaveData()
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