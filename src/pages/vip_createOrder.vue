<template>
  <div>
    <vip-header :phoneModel=phoneModel borderActive=true borderActive2=true borderActive3=true address="/Vip_selectcity" address2="/model"></vip-header>
    <div class="create-order">
      <div class="order-top order-content">
        <div class="order-top-img">
          <img v-bind:src="'/static/img/model2/iphonelg'+modelid+'.jpg'" alt="">
        </div>
        <div class="order-top-text">
          <h3 class="font-size16">苹果 {{ $store.state.model }}</h3>
          <p class="mar-top10">服务城市：{{ $store.state.city }}</p>
          <p class="mar-top10">提供上门服务</p>
          <p class="order-top-price mar-top10">会员换屏(碎屏险权益)：<span class="font-weight col-red">￥{{$store.state.vipPrice}}</span></p>
        </div>
      </div>
      <div class="vip-rights">
        <p class="font-weight">超级会员权益</p>
        <ul class="vip-interest-list mar-top20">
          <li class="mar-top20">
            <div class="vip-interest-img">
              <img src="/static/img/icon/rights-icon1.png" alt="" class="rights-icon1">
            </div>
            <div class="vip-interest-text flex-1">
              <p>碎屏险</p>
              <p class="col-hui font-size12">享受300元维修补贴</p>
            </div>
            <p class="col-hui font-size12 mar-right20">x1</p>
          </li>
          <li class="mar-top20">
            <div class="vip-interest-img">
              <img src="/static/img/icon/rights-icon2.png" alt="" class="rights-icon2">
            </div>
            <div class="vip-interest-text flex-1">
              <p>维修优惠</p>
              <p class="col-hui font-size12">会员期间不限次数、不限故障</p>
            </div>
            <p class="col-red font-size12 mar-right20">立减 20元/次</p>
          </li>
          <li class="mar-top20">
            <div class="vip-interest-img">
              <img src="/static/img/icon/rights-icon3.png" alt="" class="rights-icon3">
            </div>
            <div class="vip-interest-text flex-1">
              <p>神秘好礼</p>
              <p class="col-hui font-size12">热门电影票，电影周边</p>
            </div>
            <p class="col-hui font-size12 mar-right20"><span class="col-hui">不定期发放</span></p>
          </li>
        </ul>
      </div>
      <div class="order-middle mar-top20">
        <div class="font-normal">
          超级会员价（一年）：
          <span class="col-red font-size24">39</span>
          元
        </div>
      </div>
      <div class="login-vip">
        <svg class="icon" aria-hidden="true" >
          <use xlink:href="#icon-shouji"></use>
        </svg>
        请填写开通会员手机号
      </div>
      <div class="vip-form">
        <div class="input-phone">
          <div class="weui-cell__bd">
            <input type="tel" placeholder="输入手机号" class="weui-input" maxlength="11" v-model="phone">
          </div>
        </div>
        <div class="input-phone">
          <div class="weui-cell__bd">
            <input type="tel" placeholder="输入验证码" class="weui-input" maxlength="6" v-model="yzm">
          </div>
          <div class="weui-cell__ft">
            <div class="sendcode" v-bind:class="{'disabled':disabled}">
              <div class="duanxinyzm" v-bind:class="{'yzmActive':shortMessageactive}" @click="sendcodeSM">{{shortMessage}}</div>
              <div class="yuyinyzm" v-bind:class="{'yzmActive':voiceactive}" @click="sendcodeVo">{{voice}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="submit-sure">
        <div class="btn-sure font-size16" v-bind:class="{'orderDisabled': orderDisabled}" @click="createOrder">确认提交</div>
      </div>
    </div>
    <div class="weui-footer font-size12 text-align">
        Copyright © 2015-2017 www.kuangjifix.com
    </div>
    <vip-dialog v-show="dialogs" :message="msg" v-on:father="dialogFalse"></vip-dialog>
    <vip-toast v-show="toast" message="订单已创建"></vip-toast>
    <vip-olduser v-show="olduser" v-on:faOlduserFalse="faOlduserFalse" v-on:faOlduserTrue="faOlduserTrue"></vip-olduser>
  </div>
</template>
<script>
  import vipHeader from '../components/header.vue'
  import vipDialog from '../components/dialog.vue'
  import vipToast from '../components/toast.vue'
  import vipOlduser from '../components/olduser.vue'
  export default {
    name: 'model',
    data: function () {
      return {
        dialogs: false,
        toast: false,
        msg: '请选择机型',
        countdownNum: 60,
        phone: '',
        phoneModel: sessionStorage.getItem('model'),
        modelid: sessionStorage.getItem('modelId'),
        yzm: '',
        time: null,
        olduser: false, // 老用户弹窗
        disabled: false, // 验证码按钮是否可点
        shortMessageactive: true, // 短信验证码
        voiceactive: false, // 语音验证码
        orderDisabled: false, // 提交订单按钮
        voice: '语音',
        shortMessage: '短信验证码'
      }
    },
    components: {
      vipHeader,
      vipDialog,
      vipToast,
      vipOlduser
    },
    methods: {
      sendCode () {
        if (this.phone) {
          if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.phone))) {
            this.dialogs = true
            this.msg = '手机号有误'
            return false
          } else {
            return true
          }
        } else {
          this.dialogs = true
          this.msg = '请输入手机号'
          return false
        }
      }, // 验证手机号
      sendcodeSM () {
        let $that = this
        if (this.disabled) {
          return
        }
        if (!this.sendCode()) {
          return
        }
        if (this.voiceactive) {
          this.shortMessageactive = true
          this.shortMessage = '短信验证码'
          this.voiceactive = false
          this.voice = '语音'
        }
        $that.disabled = true
        this.getCode('shortMessage', 'sms')
      }, // 短信验证码
      sendcodeVo () {
        if (this.disabled) {
          return
        }
        if (!this.sendCode()) {
          return
        }
        if (this.shortMessageactive) {
          this.shortMessageactive = false
          this.shortMessage = '短信'
          this.voiceactive = true
          this.voice = '语音验证码'
        }
        this.disabled = true
        this.getCode('voice', 'voice')
      }, // 语音验证码
      countdown (text) {
        if (this.countdownNum <= 0) {
          clearInterval(this.time)
          this.disabled = false
          this[text] = '短信验证码'
          this.countdownNum = 60
        } else {
          this[text] = `${this.countdownNum}秒后重发`
          this.countdownNum--
        }
      }, // 倒计时
      getCode (codeType, smsType) {
        let $that = this
        this.$http.post('list/repair/requestSms4PC', {phone: this.phone, smsType: smsType}).then(function (res) {
//          console.log(res)
          let dataBody = res.body
          if (dataBody.res) {
            $that.time = setInterval(() => {
              $that.countdown(codeType)
            }, 1000)
          } else {
            $that.msg = dataBody.msg
            $that.dialogs = true
            $that.disabled = false
          }
        })
      },
      createOrder () {
        if (this.orderDisabled) {
          return
        }
        if (!this.sendCode()) {
          return
        }
        if (!this.yzm) {
          this.msg = '请输入验证码'
          this.dialogs = true
          return
        }
        this.orderDisabled = true
        this.submit()
      },
      faOlduserFalse () {
        this.olduser = false
      },
      faOlduserTrue () {
        this.olduser = false
        window.location.href = this.url + '/svip_index/login'
      },
      submit () {
        this.$http.post('list/svip_buy/createMemberOrder',
          {userCity: this.$store.state.city,
            userPhoneModel: this.$store.state.model,
            userPhone: this.phone,
            userVerifyCode: this.yzm}).then(function (res) {
              console.log(res)
              if (res.body.code === 0) {
                this.toast = true
                setTimeout(() => {
                  this.toast = false
                  this.$router.push('/pay/vipPay')
                }, 1000)
              } else {
                if (res.body.error === '重复购买') {
                  this.olduser = true
                } else if (res.data.error === '短信验证失败') {
                  this.msg = '验证码有误，请重新输入'
                  this.dialogs = true
                } else if (res.body.error === '系统错误') {
                  window.location.href = this.url + '/svip_index/error?error=系统跑路了,&msg=请联系客服去逮捕它'
                } else if (res.data.error === '参数错误') {
                  window.location.href = this.url + '/svip_index/error?error=系统跑路了,&msg=请联系客服去逮捕它'
                }
                this.orderDisabled = false
              }
            })
      },
      dialogFalse () {
        this.dialogs = false
      }
    }
  }
</script>
<style scoped lang="scss">
  @import '../assets/css/global.scss';
  .create-order{
    padding-top: 50px;
  }
  .order-top{
    padding: rem(30);
    background-color: #fff;
    display: flex;
    align-items: flex-end;
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
    padding-left:rem(30);
    flex: 1;
    &:after{
      content: '';
      display: block;
      margin-top: rem(20);
      border-bottom: 1px solid #f2f2f2;
      transform:scaleY(0.5);
    }
  }
  .vip-rights{
    background-color: #fff;
    padding: 0 rem(30) rem(30);
  }
  .vip-interest-list{
    li{
      border: 1px solid #f2f2f2;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: rem(30) 0;
    }
  }
  .vip-interest-img {
    display: flex;
    align-items: center;
    justify-content: center;
    width: rem(117);
    box-sizing: border-box;
  }
  .rights-icon1{
    @include width-height(rem(56),rem(61))
  }
  .rights-icon2{
    @include width-height(rem(45),rem(64))
  }
  .rights-icon3{
    @include width-height(rem(71),rem(52))
  }
  .order-middle{
    background-color: #fff;
    padding: rem(30);
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .font-size24{
    font-size: 24px;
  }
  .login-vip{
    padding: rem(20) rem(30);
  }
  .vip-form{
    background-color: #fff;
  }
  .input-phone{
    display: flex;
    height: 45px;
    line-height: 45px;
    border-bottom: 1px solid #f2f2f2;
  }
  .weui-cell__bd {
    flex: 1;
    height: 100%;
    padding: 0 rem(30);
  }
  .weui-input {
    width: 100%;
    border: 0;
    outline: 0;
    -webkit-appearance: none;
    background-color: transparent;
    font-size: inherit;
    color: inherit;
    height: 1.41176471em;
    line-height: 1.41176471;
  }
  .weui-cell__hd, .weui-cell__ft {
    box-sizing: border-box;
    text-align: center;
    color: #000;
    height: 45px;
    padding: 5px 15px 5px 0;
  }
  .sendcode{
    border: 1px solid #591f7d;
    border-radius: 6px;
    display: flex;
    height: 100%;
    line-height: 35px;
    box-sizing: border-box;
    overflow: hidden;
  }
  .disabled{
    border-color: #b3b3b3;
    color: #b3b3b3;
    .yzmActive{
      background-color: #b3b3b3;
      color:#fff;
    }
  }
  .yzmActive{
    padding:0 rem(20);
    background-color: #591f7d;
    color:#fff;
  }
  .yuyinyzm,.duanxinyzm{
    padding: 0 rem(20);
    height: 100%;
    box-sizing: border-box;
    transition: background-color 0.1s, border 0.1s;
  }
  .submit-sure {
    padding: rem(45) rem(30);
  }
</style>
