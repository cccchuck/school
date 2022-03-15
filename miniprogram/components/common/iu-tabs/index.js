// components/common/iu-tabs/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs: {
      type: Array,
      value: ['请假记录', '提交请假']
    },
    index: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e) {
      const { index } = e.currentTarget.dataset;
      this.setData({ index });
      this.triggerEvent('SwitchTab', { index });
    }
  }
})
