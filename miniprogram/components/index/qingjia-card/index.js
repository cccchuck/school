// components/index/qingjia-card/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    content: {
      type: Object,
      value: {
        ID: '123456789',
        destroied: false,
        type: '事假',
        leave: '是',
        beginTime: '2021-05-19 13:00',
        endTime: '2021-05-19 21:00',
        location: '龙子湖校区',
        reason: '外出医院'
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    _destroied: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 跳转请假详情
    toDetail() {
      wx.navigateTo({
        url: '/pages/index-detail/index',
        success: (res) => {
          res.eventChannel.emit('postData', this.data.content)
        } 
      })
    },

    // 销假
    destroy() {
      wx.showModal({
        title: '提示',
        content: '是否要销假吗？',
        success: (res) => {
          if (res.confirm) {
            // 用户确定
            this.setData({ _destroied: true })
            this.properties.content.destroied = true
            this.triggerEvent('destroy', this.properties.content.ID)
          } else if (res.cancel) {
            // 用户取消
          }
        }
      })
    }
  },

  lifetimes: {
    attached() {
      this.setData({ _destroied: this.properties.content.destroied })
    }
  }
})
