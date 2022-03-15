/**
 * 返回资源 OSS Url
 */
const getMiniProgramIconAssets = () => {
  const iconAssets = {
    // Bannar 图片
    bannerImg: 'https://jwoss1.wozaixiaoyuan.com/basicinfo/logo/49.jpg',
    // 学校 Logo
    schoolLogo: 'https://wzxy-img.oss-cn-beijing.aliyuncs.com/logo/100.jpg/s',
    // 日常管理 Icon
    qianDaoIcon: 'https://jwoss-static.wozaixiaoyuan.com/basicinfo/logo/105.png',
    tongZhiIcon: 'https://jwoss-static.wozaixiaoyuan.com/basicinfo/logo/111.png',
    qingJiaIcon: 'https://jwoss-static.wozaixiaoyuan.com/basicinfo/logo/23.png',
    wenJuanIcon: 'https://jwoss-static.wozaixiaoyuan.com/basicinfo/logo/114.png',
    // 疫情防控 Icon
    riJianIcon: 'https://jwoss-static.wozaixiaoyuan.com/basicinfo/logo/190.png',
    fanXiaoIcon: 'https://jwoss-static.wozaixiaoyuan.com/basicinfo/logo/029.png',
    jianKangIcon: 'https://jwoss-static.wozaixiaoyuan.com/basicinfo/logo/21.png',
    // 校园课程 Icon
    woDeKeChengIcon: 'https://jwoss-static.wozaixiaoyuan.com/basicinfo/logo/63.png',
    keChengTongZhiIcon: 'https://jwoss-static.wozaixiaoyuan.com/basicinfo/logo/482.png',
    keChengQianDaoIcon: 'https://jwoss-static.wozaixiaoyuan.com/basicinfo/logo/55.png'
  };
  return iconAssets;
}

/**
 * Promise版 setStorage
 * @param {string} key
 * @param {any} value 
 */
const setStorage = (key, value) => {
  return new Promise((resolve, reject) => {
    wx.setStorage({
      key,
      data: value,
      success() {
        resolve()
      },
      fail(err) {
        console.log('setStorage Error: ', err)
        reject()
      }
    })
  })
}


/**
 * Promise版 getStorage
 * @param {string} key 
 */
const getStorage = (key) => {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key,
      success(res) {
        resolve(res.data)
      },
      fail(err) {
        console.log('getStorage Error: ', err)
        reject()
      }
    })
  })
}

export { 
  getMiniProgramIconAssets,
  setStorage,
  getStorage
}