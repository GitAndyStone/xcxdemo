const util = require('../../utils/util.js')
// const pha = require('../../utils/phaser.min.js')
//const ma = require('../../utils/main.js')

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    // this.setData({
    //   logs: (wx.getStorageSync('logs') || []).map(log => {
    //     return util.formatTime(new Date(log))
    //   })
    // })
    this.setData({test:"test"})
  }
})
