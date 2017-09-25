<template>
  <div class="pay-success">
    <div class="success-top">
      <div class="vip-phone font-size16 font-weight">{{userphone}}</div>
      <router-link to="/vip_selectcity" class="new-buy" v-show="buyagain">重新购买></router-link>
      <div class="vip-info-date">
        <h1>超级会员</h1>
        <p class="mar-top10">{{payfailtext}}<span class="continue_pay" @click="continuePay">{{btntext}}</span></p>
        <p class="shuaxin font-size12 mar-top20">（如已支付完成，请点此<span class="padd-10" @click="refresh">刷新</span>）</p>
      </div>
      <div class="vip-info-name font-size16 font-weight col-8d">碎屏险</div>
    </div>
    <div class="order-top order-content">
      <div class="order-top-img">
        <img v-bind:src="dataimg" alt="">
      </div>
      <div class="order-top-text font-size12">
        <h3 class="font-size16">苹果 {{ phoneModel }}</h3>
        <p class="mar-top10">服务城市：{{ sercity }}</p>
        <p class="mar-top10">提供上门服务</p>
        <p class="order-top-price mar-top10">会员换屏(碎屏险权益)：<span>￥{{vipPrice}}</span></p>
        <div class="btn-sm-jihuo text-align mar-top20 font-size12">{{status}}</div>
      </div>
    </div>
    <div class="special-Offer">
      <div class="flex-1">
        <div class="special-title">
          <span class="font-size16 font-weight col-8d">维修特价</span>
        </div>
        <p class="col-8d mar-top10 font-size12">维修下单立减20元（不限故障）</p>
      </div>
      <div class="jiantou-right"></div>
    </div>
    <div class="vip-gift mar-top20">
      <div class="flex-1">
        <div class="vip-gift-text font-weight col-8d">
          神秘好礼
        </div>
        <p class="font-size12 mar-top10 col-8d">热门电影票、电影周边礼品</p>
      </div>
      <div class="vip-gift-img">
        <img src="/static/img/gift-fail.png" alt="">
      </div>
    </div>
    <div class="weui-footer font-size12 text-align">
      Copyright © 2015-2017 www.kuangjifix.com
    </div>
    <vip-equityUsed buttonText="重新购买":equitytext="equitytext" v-show="equityUsedShow" v-on:faEquityUsedCustom="buyagainBtn"
                    v-on:faEquityUsedHide="equityUsedShow=false"></vip-equityUsed>
    <vip-dialog v-show="dialogs" :message="msg" v-on:father="dialogFalse"></vip-dialog>
  </div>
</template>
<script>
  import vipEquityUsed from '../components/equityUsed.vue'
  import vipDialog from '../components/dialog.vue'
  export default {
    name: 'pay_success',
    data: function () {
      return {
        phoneModel: '',
        userphone: '',
        vipPrice: 0,
        dialogs: false,
        msg: '',
        dataimg: '',
        buyagain: true, // 顶部重新购买文字
        payfailtext: '支付出现问题，', //
        cancel: false, // 取消按钮
        equitytext: '您的超级会员已经到期，请重新购买并激活权益。', // 弹窗文字
        btntext: '继续支付', // 继续支付按钮文字
        status: '激活权益', // 按钮状态
        sercity: '',  // 用户城市
        equityUsedShow: false
      }
    },
    mounted () {
      this.renderData()
    },
    methods: {
      renderData () {
        this.$http.post('list/svip_buy/getMemberOrder').then(function (res) {
          console.log(res)
          if (res.body.code === 0) {
            if (res.body.data.isPaid) {
              this.$router.push('/memberInfo')
            }
            this.phoneModel = res.body.data.userPhoneModel
            this.userphone = res.body.data.userPhone
            this.dataimg = '/static/img/model2/iphonelg' + res.body.data.userPhoneModelId + '.jpg'
            this.sercity = res.body.data.userCity
            this.vipPrice = res.body.data.priceDifference / 100
            if (res.body.data.orderStatus === '权益已失效') {
              this.status = '权益已失效'
              this.payfailtext = '您的会员权益已到期，'
              this.btntext = '重新购买'
              this.buyagain = false
              this.payRouter = '/vip_selectcity'
              this.equityUsedShow = true
            }
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
      buyagainBtn () {
        this.$router.push('/vip_selectcity')
      },
      refresh () {
        window.location.reload()
      },
      dialogFalse () {
        this.dialogs = false
        window.location.href = this.url + '/svip_index/login'
      },
      continuePay () {
        window.location.href = this.url + '/svip_index/goto_selectPayment'
      }
    },
    components: {
      vipEquityUsed,
      vipDialog
    }
  }
</script>
<style lang="scss" scoped>
  @import '../assets/css/global.scss';
  .success-top{
  @include width-height(rem(750),rem(458));
    background: url("/static/img/payfail.jpg")no-repeat;
    background-size: 100% 100%;
    position: relative;
  }
  .col-8d{
    color: #8d8d8d;
  }
  .vip-phone{
    position: absolute;
  @include width-height(rem(282),rem(67));
    background-color: #bfbfbf;
    /*box-shadow: 0 3px 5px #a6a6a6;*/
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    color: #fff;
    top:rem(30);
    left: 0;
    line-height: rem(67);
    box-sizing: border-box;
    padding-left: rem(25);
  }
  .new-buy{
    position: absolute;
    top:rem(30);
    right: rem(20);
    color: #3b3b41;
  }
  .vip-info-date{
    position: absolute;
    top:rem(130);
    left: rem(110);
  h1{
    font-size: rem(70);
    color: #bfbfbf;
  }
  }
  .vip-info-name{
    position: absolute;
    bottom: rem(20);
    left: rem(35);
  }
  .order-top{
    padding: 0 rem(30) rem(30);
    background-color: #fff;
    display: flex;
    align-items: flex-end;
  }
  .continue_pay{
    background-color: #e91919;
    padding: rem(5) rem(30);
    color: #fff;
    border-radius: 15px;
  }
  .order-top-img{
    width: rem(212);
    height: rem(280);
  img{
    width: 100%;
    height: 100%;
  }
  }
  .order-top-text{
    padding-left:rem(40);
    flex: 1;
    h3{
      color:#8d8d8d;
    }
    p{
      color: #919199;
    }
  }
  .btn-sm-jihuo{
    width: 100%;
    padding: rem(15) 0;
    background-color: #bfbfbf;
    border-radius: 20px;
    color: #fff;
  }
  .special-Offer{
    padding: rem(30);
    display: flex;
    background-color: #fff;
    align-items: center;
    position: relative;
  &:before{
     content: '';
     display: block;
     position: absolute;
     top:0;
     right: 0;
     left: rem(30);
     border-top: 1px solid #f2f2f2;
     transform: scaleY(0.5);
   }
  }
  .vip-gift{
    background-color: #fff;
    padding: 0 rem(30);
    height: rem(157);
    display: flex;
    align-items: center;
    position: relative;
  }
  .vip-gift-img{
  @include width-height(rem(178),rem(127));
    position: absolute;
    right: rem(50);
    top: 50%;
    transform: translateY(-50%);
  img{
  @include width-height(100%,100%);
  }
  }
  .vip-gift-text{
    font-size: 16px;
  }
  .shuaxin{
    span{
      color: #f3c91f;
    }
  }
</style>
