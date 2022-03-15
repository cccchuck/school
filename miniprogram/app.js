import { getMiniProgramIconAssets } from './utils/main'
App({
  globalData: {
    teacher: null
  },
  onLaunch: function () {
    // 加载首页图片和图标 OSS Url
    this.globalData.iconAssets = getMiniProgramIconAssets();
  }
})
