<template>
  <div class="pay-success">
    <div class="success-top">
      <div class="vip-phone font-size16 font-weight">
        {{userphone}}
      </div>
      <div class="vip-info-date">
        <h1>超级会员</h1>
        <p>{{vipdata}}<span class="col-red">{{surplusDays}}</span></p>
      </div>
      <div class="vip-info-name font-size16 font-weight">碎屏险</div>
    </div>
    <div class="order-top order-content" @click="queryInfo">
      <div class="order-top-img">
        <img v-bind:src="dataimg" alt="">
      </div>
      <div class="order-top-text font-size12">
        <h3 class="font-size16">苹果 {{ phoneModel }}</h3>
        <p class="mar-top10">服务城市：{{ sercity }}</p>
        <p class="mar-top10">提供上门服务</p>
        <p class="order-top-price mar-top10">会员换屏(碎屏险权益)：<span class="col-red">￥{{vipPrice}}</span></p>
        <div class="btn-sm-jihuo text-align mar-top20 font-size12" @click.stop="goEquity"
             v-bind:class="{shenhezhong:shenhezhong,chuxian:chuxian, equityUsed:equityUsed}">{{status}}
        </div>
      </div>
      <div class="jiantou-right posoition" v-show="jiantou"></div>
    </div>
    <div class="special-Offer" @click="createOrder">
      <div class="flex-1">
        <div class="special-title">
          <span class="font-size16 font-weight mar-right20">维修特价</span><span class="col-hui">不参与其他特惠活动</span>
        </div>
        <p class="col-red mar-top10 font-size12">维修下单立减20元（不限故障）</p>
      </div>
      <div class="jiantou-right"></div>
    </div>
    <div class="vip-gift mar-top20" @click="linktoGift">
      <div class="flex-1">
        <div class="vip-gift-text">
          <span class="font-size16 font-weight mar-right20">神秘好礼</span><span class="col-hui">敬请期待</span>
        </div>
        <p class="mar-top10 font-size12">热门电影票、电影周边礼品</p>
      </div>
      <div class="vip-gift-img">
        <img src="/static/img/gift-success.png" alt="">
      </div>
    </div>
    <div class="weui-footer font-size12 text-align">
      Copyright © 2015-2017 www.kuangjifix.com
    </div>
    <vip-chuxian v-show="chuxianshow" :cancel="cancel" :btntext="btntext"
                 v-on:fachuxianFalse="fachuxianFalse" v-on:fachuxianTrue="fachuxianTrue"></vip-chuxian>
    <vip-shenhe v-show="shenheshow" v-on:faShenhe="faShenhe"></vip-shenhe>
    <vip-chuxianSelect v-show="chuxianSelect" v-on:cxSelectFalse="cxSelectFalse" v-on:cxSelectTrue="cxSelectTrue"></vip-chuxianSelect>
    <vip-checkoutFail :failreason="failreason" v-show="checkoutFail" v-on:faCheckoutFalse="faCheckoutFalse" v-on:faCheckoutHide="checkoutFail=false"></vip-checkoutFail>
    <vip-checkoutSuccess :imei="phoneImei" :youxiaoqi="instureEndate" v-on:faChckoutSuccess="chckoutSuccess=false" v-show="chckoutSuccess"></vip-checkoutSuccess>
    <vip-chuxianzhong v-show="chuxianzhong" v-on:faChuxianzhong="faChuxianzhong" v-on:faChuxianzhongHide="chuxianzhong=false"></vip-chuxianzhong>
    <vip-equityUsed buttonText="我知道了" :equitytext="equitytext" v-show="equityUsedShow" v-on:faEquityUsedHide="equityUsedShow=false" v-on:faEquityUsedCustom="equityUsedShow=false"></vip-equityUsed>
    <vip-dialog v-show="dialogs" :message="msg" v-on:father="dialogFalse"></vip-dialog>
  </div>
</template>

<script>
  import vipChuxian from '../components/chuxian.vue'
  import vipChuxianSelect from '../components/chuxianselect.vue'
  import vipShenhe from '../components/shenhezhong.vue'
  import vipCheckoutFail from '../components/checkoutFail.vue'
  import vipCheckoutSuccess from '../components/checkoutSuccess.vue'
  import vipChuxianzhong from '../components/chuxianzhong.vue'
  import vipEquityUsed from '../components/equityUsed.vue'
  import vipDialog from '../components/dialog.vue'
  export default {
    name: 'pay_success',
    data: function () {
      return {
        phoneModel: '', // 用户手机型号
        dialogs: false, // 弹窗
        msg: '', // 弹窗文字
        interUrl: '', // 跳转地址
        userphone: '', // 用户手机
        vipPrice: 0, // 会员价格
        vipdata: '', // 会员到期日期
        orderDate: '', // 下单日期
        surplusDays: '', // 距离激活日期
        instureEndate: '', // 碎屏险有效期
        checkoutFail: false, // 激活失败弹窗
        failreason: '', // 激活失败原因
        dataimg: '', // 图片
        phoneImei: '', // 设备imei
        shenhezhong: false, // 审核中样式
        shenheshow: false, // 审核中弹窗
        chckoutSuccess: false, // 审核通过弹窗
        chuxian: false, // 出险按钮样式
        equityUsed: false, // 权益已使用按钮样式
        chuxianzhong: false, // 出险中弹窗
        equitytext: '', // 权益已使用弹窗文字
        equityUsedShow: false, // 权益已使用弹窗文字
        jiantou: false, // 箭头，可查看详情
        chuxianshow: false, // 出险弹窗
        cancel: false, // 取消按钮
        chuxianSelect: false, // 我要出险
        btntext: '我知道了', // 按钮文字
        status: '', // 权益激活状态
        sercity: '' // 用户城市
      }
    },
    beforeCreate () {
      this.$http.post('list/svip_buy/getMemberOrder').then(function (res) {
        console.log(res)
        if (res.body.code === 0) {
          if (!res.body.data.isPaid) {
            this.$router.push('/payFail')
          }
          this.phoneModel = res.body.data.userPhoneModel
          this.userphone = res.body.data.userPhone
          this.orderNo = res.body.data.orderNo
          this.orderDate = res.body.data.paymentTime
          this.dataimg = '/static/img/model2/iphonelg' + res.body.data.userPhoneModelId + '.jpg'
          this.sercity = res.body.data.userCity
          this.vipPrice = res.body.data.priceDifference / 100
//          let payDate = res.body.data.paymentTime.substring(0, 10)
          switch (res.body.data.orderStatus) {
            case '未验机':
              this.status = '激活权益'
              this.interUrl = this.url + '/svip_index/goto_checkout'
              if (!jihuoDate(this.orderDate)) {
                this.vipdata = '在16天内未激活，权益已失效'
                this.surplusDays = ''
              } else {
                this.vipdata = '距离激活碎屏险最后期限：'
                this.surplusDays = jihuoDate(this.orderDate)
              }
              break
            case '验机中' :
              this.status = '审核中'
              this.shenhezhong = true
              this.jiantou = true
              if (!jihuoDate(this.orderDate)) {
                this.vipdata = '在16天内未激活，权益已失效'
                this.surplusDays = ''
              } else {
                this.vipdata = '距离激活碎屏险最后期限：'
                this.surplusDays = jihuoDate(this.orderDate)
              }
              break
            case '验机成功' :
              this.status = '我要出险报修'
              this.chuxian = true
              this.phoneImei = res.body.data.insurerIMEI
              this.jiantou = true
              if (!sessionStorage.getItem('checkoutSucshow')) {
                this.chckoutSuccess = true
                sessionStorage.setItem('checkoutSucshow', true)
              }
              this.vipdata = '有效期至'
              this.surplusDays = res.body.data.endDate.substring(0, 10)
              this.instureEndate = res.body.data.insuranceEndDate.substring(0, 10)
              this.interUrl = this.url + '/svip_index/goto_repairs'
              break
            case '验机失败' :
              this.status = '重新激活权益'
              this.interUrl = this.url + '/svip_index/goto_checkout_re'
              this.checkoutFail = true
              if (!jihuoDate(this.orderDate)) {
                this.vipdata = '在16天内未激活，权益已失效'
                this.surplusDays = ''
              } else {
                this.vipdata = '距离激活碎屏险最后期限：'
                this.surplusDays = jihuoDate(this.orderDate)
              }
              this.failreason = res.body.data.failureReason
              break
            case '已报险' :
              this.status = '等待出险'
              this.vipdata = '有效期至'
              this.surplusDays = res.body.data.endDate.substring(0, 10)
              if (!sessionStorage.getItem('chuxianshow')) {
                this.chuxianshow = true
                sessionStorage.setItem('chuxianshow', true)
              }
              this.chuxian = true
              this.jiantou = true
              break
            case '出险中' :
              this.status = '出险中'
              this.interUrl = this.url + '/repair/myorder'
              this.shenhezhong = true
              this.vipdata = '有效期至'
              this.surplusDays = res.body.data.endDate.substring(0, 10)
              this.jiantou = true
              break
            case '权益已使用' :
              this.status = '权益已使用'
              this.equitytext = '您已在' + res.body.data.insuranceEndDate.substring(0, 10) + '维修屏幕并使用了此项权益。'
              this.equityUsed = true
              this.vipdata = '有效期至'
              this.surplusDays = res.body.data.endDate.substring(0, 10)
              this.jiantou = true
              break
            case '权益已放弃' :
              this.status = '权益已放弃'
              this.equitytext = '您超期未验机，权益已放弃'
              this.equityUsed = true
              this.vipdata = '有效期至'
              this.surplusDays = res.body.data.endDate.substring(0, 10)
              this.jiantou = true
              break
            case '权益已终止' :
              this.status = '权益已终止'
              this.equitytext = '终止原因：' + res.body.data.failureReason
              this.equityUsed = true
              this.vipdata = '有效期至'
              this.surplusDays = res.body.data.endDate.substring(0, 10)
              this.jiantou = true
              break
            default:
              return
          }
        } else {
          if (res.data.error === '鉴权失败') {
            this.msg = '系统已进入无人区，请重新登陆'
            this.dialogs = true
          } else if (res.data.error === '系统错误') {
            window.location.href = this.url + '/svip_index/error?error=系统跑路了,&msg=请联系客服去逮捕它'
          } else if (res.data.error === '系统错误') {
            window.location.href = this.url + '/svip_index/error?error=系统跑路了,&msg=请联系客服去逮捕它'
          }
        }
      })
    },
    methods: {
      goEquity () {
        if (this.status === '激活权益' || this.status === '重新激活权益') {
//          window.location.href = this.interUrl
          this.$router.push('/vipEquity')
        } else if (this.status === '审核中') {
          this.shenheshow = true
        } else if (this.status === '我要出险报修') {
          this.chuxianSelect = true
        } else if (this.status === '等待出险') {
          this.chuxianshow = true
        } else if (this.status === '出险中') {
          this.chuxianzhong = true
        } else if (this.status === '权益已使用') {
          this.equityUsedShow = true
        } else if (this.status === '权益已放弃') {
          this.equityUsedShow = true
        } else if (this.status === '权益已终止') {
          this.equityUsedShow = true
        }
      },
      queryInfo () {
        if (this.jiantou) {
          this.$router.push('/equityRead')
        }
      },
      faShenhe () {
        this.shenheshow = false
      },
      fachuxianFalse () {
        this.chuxianshow = false
      },
      fachuxianTrue () {
        this.chuxianshow = true
      },
      cxSelectFalse () {
        this.chuxianSelect = false
      },
      cxSelectTrue () {
        this.chuxianSelect = false
        window.location.href = this.interUrl
      },
      faCheckoutFalse () {
        window.location.href = this.interUrl
        this.checkoutFail = false
      },  // 激活失败弹窗按钮
      faChuxianzhong () {
        window.location.href = this.interUrl
        this.checkoutFail = false
      }, // 出险中点击跳到订单详情
      linktoGift () {
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe6f1c233f9b1cc7c&redirect_uri=http%3A%2F%2Fplay8.beetobees.com%2Fplay%2Ftpl_maliao%2Fsh4AfyFn%2F&response_type=code&scope=snsapi_userinfo#wechat_redirect'
      },
      createOrder () {
        window.location.href = this.url
      },
      dialogFalse () {
        this.dialogs = false
        window.location.href = this.url + '/svip_index/login'
      }
    },
    components: {
      vipChuxian,
      vipShenhe,
      vipChuxianSelect,
      vipCheckoutFail,
      vipCheckoutSuccess,
      vipChuxianzhong,
      vipEquityUsed,
      vipDialog
    }
  }
  // 距离激活剩余天数
  function jihuoDate (vipOrderDate) {
    if (vipOrderDate) {
      let date = new Date()
      let orderDate = new Date(vipOrderDate.substring(0, 10))
      let jihuo = Number.parseInt((date - orderDate) / 1000 / 3600 / 24)
      if ((16 - jihuo) < 0) {
        return false
      } else {
        return '剩余' + (16 - jihuo) + '天'
      }
    }
  }
  // 会员到期日
//  function getNewDay (dateTemp, days) {
//    if (dateTemp) {
//      dateTemp = dateTemp.split('-')
//      let nDate = new Date(dateTemp[1] + '-' + dateTemp[2] + '-' + dateTemp[0]) // 转换为MM-DD-YYYY格式
//      let millSeconds = Math.abs(nDate) + (days * 24 * 60 * 60 * 1000)
//      let rDate = new Date(millSeconds)
//      let year = rDate.getFullYear()
//      let month = rDate.getMonth() + 1
//      if (month < 10) month = '0' + month
//      let date = rDate.getDate()
//      if (date < 10) {
//        date = '0' + date
//      }
//      return (year + '-' + month + '-' + date)
//    }
//  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../assets/css/global.scss';

  .success-top {
    @include width-height(rem(750), rem(458));
    background: url("/static/img/success-bg.jpg") no-repeat;
    background-size: 100% 100%;
    position: relative;
  }

  .vip-phone {
    position: absolute;
    @include width-height(rem(282), rem(67));
    background: url("/static/img/tel-bg.png") no-repeat;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    color: #fff;
    top: rem(30);
    left: 0;
    line-height: rem(67);
    box-sizing: border-box;
    padding-left: rem(25);
  }

  .vip-info-date {
    position: absolute;
    top: rem(145);
    left: rem(110);
    h1 {
      font-size: 42px;
      color: #591f7d;
    }
  }

  .vip-info-name {
    position: absolute;
    bottom: rem(20);
    left: rem(35);
  }

  .order-top {
    padding: 0 rem(30) rem(30);
    background-color: #fff;
    display: flex;
    align-items: flex-end;
    position: relative;
  }

  .order-top-img {
    width: rem(212);
    height: rem(280);
    img {
      width: 100%;
      height: 100%;
    }
  }

  .order-top-text {
    padding-left: rem(40);
    flex: 1;
  }
  .btn-sm-jihuo {
    width: 100%;
    padding: rem(15) 0;
    background-color: #e91919;
    border-radius: 20px;
    color: #fff;
  }

  .special-Offer {
    padding: rem(30);
    display: flex;
    background-color: #fff;
    align-items: center;
    position: relative;
    &:before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      left: rem(30);
      border-top: 1px solid #f2f2f2;
      transform: scaleY(0.5);
    }
  }

  .vip-gift {
    background-color: #fff;
    padding: 0 rem(30);
    height: rem(157);
    display: flex;
    align-items: center;
    position: relative;
  }

  .vip-gift-img {
    @include width-height(rem(178), rem(127));
    position: absolute;
    right: rem(50);
    top: 50%;
    transform: translateY(-50%);
    img {
      @include width-height(100%, 100%);
    }
  }
  .shenhezhong {
    color: #e91919;
    background-color: #f2f2f2;
  }
  .equityUsed{
    background-color: #f2f2f2;
    color: #3b3b41;
  }
  .chuxian {
    background-color: #f3c91f;
    color: #3b3b41;
  }
</style>
