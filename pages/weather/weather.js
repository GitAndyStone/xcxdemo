// pages/weather/weather.js

const weatherMap = {
  'sunny': '晴天',
  'cloudy': '多云',
  'overcast': '阴',
  'lightrain': '小雨',
  'heavyrain': '大雨',
  'snow': '雪'
}

const weatherColorMap = {
  'sunny': '#cbeefd',
  'cloudy': '#deeef6',
  'overcast': '#c6ced2',
  'lightrain': '#bdd5e1',
  'heavyrain': '#c5ccd0',
  'snow': '#aae1fc'
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nowTemp: '14°',
    nowWeather: '阴天',
    nowWeatherBackground:"",
    hourlyWeather: [],
    todayTemp: "",
    todayDate: ""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getNow();
    this.setData({
      nowTemp: '30°',
      nowWeather: weatherMap['sunny'],
      nowWeatherBackground: '/images/weather/' + 'sunny' + '-bg.png'
    })

    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: weatherColorMap['sunny'],
    })
  },

  getNow:function(callback)
  {
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now',
      data: {
        city: '上海市'
      },
      success: res => {
        console.log(res)
        let result = res.data.result
        this.setNow(result);
        this.setHourlyWeather(result);
        this.setToday(result);

        //set forecast
        let forecast = result.forecast
        let hourlyWeather = []
        let nowHour = new Date().getHours()
        for (let i = 0; i < 8; i += 1) {
          hourlyWeather.push({
            time: (i * 3 + nowHour) % 24 + "时",
            iconPath: '/images/weather/' + forecast[i].weather + '-icon.png',
            temp: forecast[i].temp + '°'
          })
        }
        hourlyWeather[0].time = '现在'
        this.setData({
          hourlyWeather: hourlyWeather
        })

        //set today
        let date = new Date()
        this.setData({
          todayTemp: `${result.today.minTemp}° - ${result.today.maxTemp}°`,
          todayDate: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 今天`
        })        
      }
    })
    complete: () => {
      callback && callback()
    }
  },
  setNow: function (result){
  let temp = result.now.temp
  let weather = result.now.weather
  console.log(temp, weather)
  this.setData({
    nowTemp: temp + '°',
    nowWeather: weatherMap[weather],
    nowWeatherBackground: '/images/weather/' + weather + '-bg.png'
  })

  wx.setNavigationBarColor({
    frontColor: '#000000',
    backgroundColor: weatherColorMap[weather],
  })
},
  setHourlyWeather: function (result){
    //set forecast
    let forecast = result.forecast
    let hourlyWeather = []
    let nowHour = new Date().getHours()
    for (let i = 0; i < 8; i += 1) {
      hourlyWeather.push({
        time: (i * 3 + nowHour) % 24 + "时",
        iconPath: '/images/weather/' + forecast[i].weather + '-icon.png',
        temp: forecast[i].temp + '°'
      })
    }
    hourlyWeather[0].time = '现在'
    this.setData({
      hourlyWeather: hourlyWeather
    })
  },
  setToday(result) {
    let date = new Date()
    this.setData({
      todayTemp: `${result.today.minTemp}° - ${result.today.maxTemp}°`,
      todayDate: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 今天`
    })
  },
  onTapDayWeather:function() {
    // wx.showToast()
    wx.navigateTo({
      url: '/pages/list/list',
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
    console.log("refresh executed!")
    this.getNow(() => {
      wx.stopPullDownRefresh()
    });
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