<template>
  <div class="vip-equity">
    <div class="order-top order-content">
      <div class="order-top-img">
        <img v-bind:src="datasrc" alt="">
      </div>
      <div class="order-top-text font-size12">
        <h3 class="font-size16">苹果 {{ phoneModel }}</h3>
        <p class=" mar-top10">服务城市：{{ sercity }}</p>
        <p class="mar-top10">提供上门服务</p>
        <p class="order-top-price mar-top10 font-size12">会员换屏(碎屏险权益)：<span class="  col-red">￥{{vipPrice}}</span></p>
        <p class="mar-top10">保险到期时间：<span>{{insuranceEndDate}}</span></p>
      </div>
    </div>
    <div class="equity-user-info">
      <p class="equity-info-title col-hui">请填写投保人信息</p>
    </div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label for="" class="weui-label widthgx">投保人姓名</label>
        </div>
        <div class="weui-cell__bd">
          <p class="text-right">{{userName}}</p>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label for="" class="weui-label widthgx">投保人身份证号</label>
        </div>
        <div class="weui-cell__bd">
          <p class="text-right">{{userIdcard}}</p>
        </div>
      </div>
    </div>
    <div class="equity-user-info">
      <p class="equity-info-title col-hui">请填写投保手机信息</p>
    </div>
    <div class="weui-cells">
      <div class="weui-cell weui-cell_access">
        <div class="weui-cell__hd">
          <label for="" class="weui-label widthgx">手机颜色</label>
        </div>
        <div class="weui-cell__bd">
          <p class="text-right">{{userPhoneColor}}</p>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd flex-1">
          <label for="" class="weui-label">手机照片</label>
        </div>
      </div>
      <div class="weui-img">
        <div class="weui-uploader__input-box" @click="imgshow=true">
          <div class="uploadimg" v-bind:style="{backgroundImage:'url('+dataimg+')'}"></div>
        </div>
      </div>
    </div>
    <div class="equity-careful col-hui">
      <p class="careful-title">注意事项</p>
      <p class="mar-top10">1.请认真填写正确的投保信息，以确保出险成功。如因填写信息错误导致无法出险，用户承担后果。</p>
      <p>2.如填写信息被发现造假，哐叽将删除此用户会员身份不退还购买会员的费用。</p>
      <p>3.激活成功后，投保信息不予更改，如造成出险问题用户自行承担后果。</p>
    </div>
    <!--上传照片插件-->
    <transition name="fade">
      <div class="weui-gallery" v-show="imgshow" @click="imgshow=false">
        <span class="weui-gallery__img" v-bind:style="{backgroundImage:'url('+dataimg+')'}"  @click.stop></span>
      </div>
    </transition>
    <vip-dialog v-show="dialogs" :message="msg" v-on:father="dialogFalse"></vip-dialog>
  </div>
</template>

<script>
  import vipDialog from '../components/dialog.vue'
  export default {
    name: 'vip-equity',
    data: function () {
      return {
        userName: '',
        phoneModel: '',
        sercity: '',
        dialogs: false,
        msg: '',
        imgshow: false,
        userIdcard: '',
        vipPrice: '',
        userPhoneColor: '',
        datasrc: '',
        insuranceEndDate: '', // 保险到期时间
        dataimg: ''
      }
    },
    beforeCreate () {
      this.$http.post('list/svip_buy/getMemberOrder').then(function (res) {
        console.log(res)
        if (res.body.code === 0) {
          this.phoneModel = res.body.data.userPhoneModel
          this.userphone = res.body.data.userPhone
          this.datasrc = '/static/img/model2/iphonelg' + res.body.data.userPhoneModelId + '.jpg'
          this.sercity = res.body.data.userCity
          this.userName = res.body.data.insurerName
          this.userPhoneColor = res.body.data.insurerPhoneColor
          this.userIdcard = res.body.data.insurerPID
          this.vipPrice = res.body.data.priceDifference / 100
          this.dataimg = res.body.data.insurerIMG
          if (res.body.data.orderStatus === '权益已使用') {
            this.insuranceEndDate = '权益已使用'
          } else {
            this.insuranceEndDate = res.body.data.insuranceEndDate.substring(0, 10)
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
    methods: {
      dialogFalse () {
        this.dialogs = false
        window.location.href = this.url + '/svip_index/login'
      }
    },
    components: {
      vipDialog
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import url("../assets/css/swiper-3.4.2.min.css");
  @import '../assets/css/global.scss';
  .order-top{
    padding: rem(30);
    background-color: #fff;
    display: flex;
    align-items: center;
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
    overflow: hidden;
    flex: 1;
  }
  .replace-model{
    background-color: #f3c91f;
    padding: rem(10) rem(30);
    border-radius: 20px;
    float: right;
  }
  .equity-info-title{
    padding: rem(20) rem(30);
  }
  .weui-cells{
    margin-top: 0;
    font-size: 14px;
  }
  .weui-img{
    padding: 0 rem(30) rem(10);
    overflow: hidden;
  }
  .equity-careful{
    padding: rem(30);
  }
  .careful-title{
    &:before{
      content: '';
      display: inline-block;
      width: 8px;
      height: 8px;
      margin-right: rem(15);
      background-color: #e33232;
      border-radius: 50%;
    }
  }
  .submit-sure {
    padding: rem(30) rem(30) rem(45);
    p{
      padding: 0 rem(20);
    }
  }
  .btn-sure {
    background-color: #f3c91f;
    border-radius: 25px;
    text-align: center;
    padding: rem(20) 0;
    box-shadow: 0 5px 2px #ccc;
  }
  .weui-gallery{
    display: block;
  }
  .uploadimg{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .weui-gallery__img{
    top:50%;
    transform:translate3d(0,-50%,0);
  }
</style>
