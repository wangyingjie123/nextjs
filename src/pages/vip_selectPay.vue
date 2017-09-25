<template>
  <div class="pay-flex">
    <p class="col-hui pay-title">选择支付方式</p>
    <div class="pay-mode flex-1">
      <div class="pay-weixin font-size16" @click="selectPay(1)" :class="{'pay-model-selected': paymodeId === 1 }">
        <div class="pay-icon">
          <div class="weixin-icon"></div>
        </div>
        <p class="pay-text flex-1">微信支付</p>
        <div class="pay-selected">
          <svg class="icon icon-selected" aria-hidden="true">
            <use xlink:href="#icon-xuanzhong"></use>
          </svg>
        </div>
      </div>
      <div class="pay-weixin mar-top20 font-size16" @click="selectPay(2)"
           :class="{'pay-model-selected': paymodeId === 2 }">
        <div class="pay-icon">
          <div class="zsyh-icon"></div>
        </div>
        <p class="pay-text flex-1">招商银行一网通支付</p>
        <div class="pay-selected">
          <svg class="icon icon-selected" aria-hidden="true">
            <use xlink:href="#icon-xuanzhong"></use>
          </svg>
        </div>
      </div>
      <div class="submit-sure font-size16">
        <div class="btn-sure" @click="goSuccess()">确认支付  ￥{{vipPrice}}</div>
      </div>
    </div>
    <div class="weui-footer font-size12 text-align">
      Copyright © 2015-2017 www.kuangjifix.com
    </div>
    <form v-bind:action="action" method="post" ref="submit">
      <input type="hidden" name="jsonRequestData" v-bind:value="value">
    </form>
    <vip-loading v-show="loadingshow"></vip-loading>
    <vip-dialog v-show="dialogs" :message="msg" v-on:father="dialogFalse"></vip-dialog>
  </div>
</template>

<script>
  import vipLoading from '../components/loading.vue'
  import vipDialog from '../components/dialog.vue'
  export default {
    name: 'vip_selectPay',
    data: function () {
      return {
        paymodeId: 1,
        loadingshow: false,
        prepayOrderNo: '',
        dialogs: false,
        msg: '',
        isWeixin: '',
        orderNo: '', // 订单号
        userIp: sessionStorage.getItem('userIp'), // 用户ip
        wepayParam: {}, // 微信支付参数
        action: '',
        vipPrice: '',
        value: ''
      }
    },
    beforeCreate () {
      this.$http.post('list/svip_buy/getMemberOrder').then(function (res) {
        console.log(res)
        if (res.body.code === 0) {
          this.orderNo = res.body.data.orderNo
          if (res.body.data.isPaid) {
            this.$router.push('/memberInfo')
          }
          this.vipPrice = res.body.data.orderPrice / 100
        } else {
          if (res.data.error === '鉴权失败') {
            this.msg = '系统已进入无人区，请重新登陆'
            this.dialogs = true
          } else if (res.data.error === '系统错误') {
            window.location.href = this.url + '/svip_index/error?error=系统跑路了,&msg=请联系客服去逮捕它'
          } else if (res.data.error === '参数错误') {
            window.location.href = this.url + '/svip_index/error?error=系统跑路了,&msg=请联系客服去逮捕它'
          }
        }
      })
    },
    methods: {
      selectPay (id) {
        this.paymodeId = id
      },
      goSuccess () {
        this.loadingshow = true
        if (this.paymodeId === 2) {
          this.zsPay()
        } else if (this.paymodeId === 1) {
          if (isWeixin()) {
            this.isWeixin = 'JSAPI'
          } else {
            this.isWeixin = 'MWEB'
          }
          this.weiPay()
//          console.log(userIp)
        }
      },
      weiPay () {
        this.$http.post('list/svip_buy/payment_WXPay', {
          wxPayType: this.isWeixin,
          userIP: this.userIp
        }).then((res) => {
          console.log(res)
          if (res.body.code === 0) {
            if (res.body.data.mweb_url) {
              window.location.href = res.body.data.mweb_url
            } else {
              this.wepayParam.appId = res.body.data.appId
              this.wepayParam.timeStamp = res.body.data.timeStamp
              this.wepayParam.nonceStr = res.body.data.nonceStr
              this.wepayParam.package = res.body.data.package
              this.wepayParam.signType = res.body.data.signType
              this.wepayParam.paySign = res.body.data.paySign
              alert(JSON.stringify(this.wepayParam))
              this.onBridgeReady()
            }
          } else {
            this.loadingshow = false
            this.msg = res.body.error
            this.dialogs = true
          }
        })
      },
//      onBridgeReady () {
//        let vm = this.wepayParam
//        WeixinJSBridge.invoke(
//          'getBrandWCPayRequest', {
//            'appId': vm.appId,     // 公众号名称，由商户传入
//            'timeStamp': vm.timeStamp, // 时间戳，自1970年以来的秒数
//            'nonceStr': vm.nonceStr, // 随机串
//            'package': vm.package,
//            'signType': vm.signType, // 微信签名方式：
//            'paySign': vm.paySign // 微信签名
//          },
//          function (res) {
//            // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
//            if (res.err_msg === 'get_brand_wcpay_request：ok') {
//              alert('支付成功')
//            } else {
//              alert('支付失败,请跳转页面' + res.err_msg)
//            }
//          }
//        )
//      },
      zsPay () {
        this.$http.post('list/svip_buy/createCMBPrepayOrder').then((res) => {
          console.log(res)
          if (res.body.code === 0) {
            this.prepayOrderNo = res.body.data.prepayOrderNo
            this.startPay()
          } else {
            alert(res.body.data.error)
          }
        })
      },
      startPay () {
//        let orderNo = this.$route.query.orderNo
        this.$http.post('list/cmb_payments/loadPaymentParameters', {
          orderNo: this.orderNo + '',
          prepayOrderNo: this.prepayOrderNo + '',
          lon: '1.1',
          lat: '1.2',
          clientIP: '192.168.1.176',
          returnURL: this.url + '/svip_index/goto_transition'
        }).then((res) => {
          console.log(res)
          if (res.body.code === 0) {
            this.loadingshow = false
            this.action = res.body.url
            this.value = res.body.data
            this.$nextTick(function () {
              this.$refs.submit.submit()
            })
          } else {
            this.loadingshow = false
            this.msg = res.body.msg
            this.dialogs = true
          }
        })
      },
      dialogFalse () {
        this.dialogs = false
        if (this.msg === '系统已进入无人区，请重新登陆') {
          window.location.href = this.url + '/svip_index/login'
        }
      }
    },
    components: {
      vipLoading,
      vipDialog
    }
  }
  function isWeixin () {
    let ua = window.navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) && ua.match(/MicroMessenger/i)[0] === 'micromessenger') {
      return true
    } else {
      return false
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../assets/css/global.scss';

  .pay-flex {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  .pay-title {
    padding: rem(20) rem(30);
    font-size: 16px;
  }

  .pay-weixin {
    background-color: #fff;
    padding: 0 rem(30);
    display: flex;
    height: 48px;
    align-items: center;
  }

  .pay-icon {
    width: 53px;
  }

  .weixin-icon {
    width: 26px;
    height: 23px;
    background-image: url("/static/img/icon/wepay.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .pay-selected {
    border-radius: 50%;
    border: 1px solid #f2f2f2;
    box-sizing: border-box;
    @include width-height(16px, 16px);
    position: relative;
  }

  .pay-model-selected {
    .icon-selected {
      opacity: 1;
    }
  }

  .icon-selected {
    opacity: 0;
    position: absolute;
    top: -1px;
    left: 0;
  }

  .zsyh-icon {
    @include width-height(25px, 25px);
    background-image: url("/static/img/icon/zsyinhang.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .submit-sure {
    padding: rem(45) rem(30);
  }
</style>
