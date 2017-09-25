import Vue from 'vue'
import Router from 'vue-router'

const Vipselectcity = require('../pages/vip_selectcity')
const svip = require('../pages/vip_guidePage.vue')
const model = require('../pages/vip_selectModel.vue')
const viporder = require('../pages/vip_createOrder.vue')
const vipPay = require('../pages/vip_selectPay.vue')
const paySuccess = require('../pages/vip_paySuccess.vue')
const payFail = require('../pages/vip_payFailed.vue')
const vipEquity = require('../pages/vip_activateEquity.vue')
const equityRead = require('../pages/vip_equityRead.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', component: svip},
    {path: '/Vip_selectcity', name: 'Vip_selectcity', component: Vipselectcity},
    {path: '/model', component: model},
    {path: '/viporder', component: viporder},
    {path: '/pay/vipPay', component: vipPay},
    {path: '/memberInfo', component: paySuccess},
    {path: '/payFail', component: payFail},
    {path: '/vipEquity', component: vipEquity},
    {path: '/equityRead', component: equityRead}
  ]
})
