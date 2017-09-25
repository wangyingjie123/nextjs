// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import VueWeui from 'vue-weui'
import weui from 'weui'
import VueResource from 'vue-resource'
import AMap from 'vue-amap'
import wx from 'weixin-js-sdk'

Vue.use(Vuex)
Vue.use(VueWeui)
Vue.use(weui)
Vue.use(VueResource)
Vue.use(AMap)
Vue.use(wx)
// 初始化vue-amap
AMap.initAMapApiLoader({
  // 申请的高德key
  key: '096a5df2b8da44c46731d84af3ca9df3',
  // 插件集合
  plugin: ['CitySearch']
})
import './assets/css/global.scss'
import './assets/css/style.css'

Vue.config.productionTip = false

const store = new Vuex.Store({
  // 存储状态值
  state: {
    city: sessionStorage.getItem('city') ? sessionStorage.getItem('city') : '北京',
    model: sessionStorage.getItem('model') ? sessionStorage.getItem('model') : '选择会员手机',   // 传递选择机型
    cityActive: true,  // 城市是否选中
    vipPrice: 0, // 价格
    modelSelected: sessionStorage.getItem('modelId') ? sessionStorage.getItem('modelId') : 0   //  机型id
  },
  // 状态值的改变方法,操作状态值
  // 提交mutations是更改Vuex状态的唯一方法
  mutations: {},
  // 在store中定义getters（可以认为是store的计算属性）。Getters接收state作为其第一个函数
  getters: {},
  actions: {}
})
// 要改变状态值只能通过提交mutations来完成

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store
})
function randomChar (l) {
  let x = '0123456789qwertyuioplkjhgfdsazxcvbnm'
  let tmp = ''
  for (let i = 0; i < l; i++) {
    tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length)
  }
  return tmp
}
let nonceStr = randomChar(8)
let myTimestamp = Date.parse(new Date()).toString().substr(0, 10)
// Vue.prototype.url = 'http://' + window.location.host
Vue.prototype.url = 'http://www.kuangjifix.com'
Vue.prototype.wxShare = function () {
// 请求获取微信签名信息
  this.$http.get('list/wxapi/sign', {
    url: window.location.href.split('#')[0],
    noncestr: nonceStr,
    timestamp: myTimestamp
  }).then(res => {
    // 获得签名配置
    console.log(res)
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: 'wx98dfa82a63d14ac9',   // 必填，公众号的唯一标识
      timestamp: myTimestamp, // 必填，生成签名的时间戳
      nonceStr: nonceStr,   // 必填，生成签名的随机串
      signature: res.signature, // 必填，签名，见附录1
      jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    })
  })
  wx.ready(() => {
    // 所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，
    // 则可以直接调用，不需要放在ready函数中。
    wx.onMenuShareAppMessage({ // 分享给朋友
      title: '哐叽超级会员', // 分享标题
      desc: '哐叽 - 爱回收旗下手机维修品牌',   // 分享描述
      link: 'http://wx.kuangjifix.com/svip_index',   // 分享链接 默认以当前链接
      imgUrl: 'https://wx.kuangjifix.com/img/round-logo.png', // 分享图标
      // 用户确认分享后执行的回调函数
      success: function () {
        // console.log('取消分享')
      },
      // 用户取消分享后执行的回调函数
      cancel: function () {
        console.log('分享到朋友取消')
      }
    })
    // 分享到朋友圈
    wx.onMenuShareTimeline({
      title: '哐叽超级会员', // 分享标题
      desc: '哐叽 - 爱回收旗下手机维修品牌',
      link: 'http://wx.kuangjifix.com/svip_index',
      imgUrl: 'https://wx.kuangjifix.com/img/round-logo.png',
      // 用户确认分享后执行的回调函数
      success: function () {
        // console.log('取消分享')
      },
      // 用户取消分享后执行的回调函数
      cancel: function () {
        console.log('分享到朋友圈取消')
      }
    })
  })

  wx.error(function (res) {
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，
    console.log(res)
  })
}

