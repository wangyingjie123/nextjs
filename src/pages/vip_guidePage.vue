<template>
  <div class="vip-guide">
    <div class="guide-no1">
      <img src="/static/img/guide/guide1.jpg" alt="">
    </div>
    <div class="guide-no2">
      <img src="/static/img/guide/guide2.jpg" alt="">
    </div>
    <div class="guide-no3">
      <img src="/static/img/guide/guide3.jpg" alt="">
    </div>
    <div class="guide-server">
      <div class="guide-text font-size12 ">
        <p class="guide-read flex-1">我已阅读并接受<span @click="readed">《碎屏保服务条款》</span></p>
        <div class="vip-sign" @click="vipsign" v-show="isLogin">会员登录</div>
      </div>
      <div class="vip-buybtn">
        <router-link to="/vip_selectcity">
          <img src="/static/img/guide/guide-btn.png" alt="">
        </router-link>
      </div>
    </div>
    <div class="guide-no4">
      <img src="/static/img/guide/guide4.jpg" alt="">
    </div>
    <div class="guide-rule">
      <h2 class="font-size-18">超级会员规则</h2>
      <p class="mar-top10">1.超级会员期间用户享有维修下单立减20元的特享优惠，不限维修次数，不限故障(超级会员特享优惠不参与其他哐叽优惠活动)。</p>
      <p>2.碎屏险提供的服务必须是使用两年以内屏幕完好的手机，验机完成后此权益生效。权益将提供一份屏幕维修300元维修补贴。</p>
      <p>3.哐叽不定期举办神秘好礼活动，礼品免费发送。</p>
      <p>4.本产品一经售出概不退换。</p>
      <p>5.本次会员活动最终解释权归哐叽所有。</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'vip-guidePage',
    data: function () {
      return {
        isLogin: true
      }
    },
    mounted () {
      this.vipLogin()
    },
    methods: {
      vipsign () {
        window.location.href = this.url + '/svip_index/login'
      },
      readed () {
        window.location.href = this.url + '/member_buy/word'
      },
      vipLogin () {
        this.$http.get('list/svip_index/isLogin').then((res) => {
          console.log(res)
          if (res.body.code === 0) {
            if (res.body.data.isLogin) {
              this.isLogin = false
            }
          } else {
            alert(res.body.data.error)
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../assets/css/global.scss';
  .guide-no1{
    @include width-height(rem(750),rem(738));
    img{
      @include width-height(100%,100%);
    }
  }
  .guide-no2{
    @include width-height(rem(750),rem(535));
    img{
      @include width-height(100%,100%);
    }
  }
  .guide-no3{
    @include width-height(rem(750),rem(493));
    img{
      @include width-height(100%,100%);
    }
  }
  .guide-no4{
    @include width-height(rem(750),rem(735));
    img{
      @include width-height(100%,100%);
    }
  }
  .guide-read{
    padding: 0 rem(30);
    span{
      color: #001ab9;
    }
  }
  .guide-server{
    background-color: #fff;
    padding-bottom: rem(20);
  }
  .guide-text{
    display: flex;
    padding: rem(10) 0;
  }
  .vip-sign{
    padding-right: rem(30);
    display: flex;
    font-size: 14px;
    align-items: center;
    &:before{
      content: '';
      display: inline-block;
      width: rem(32);
      height: rem(32);
      margin-right: rem(7);
      background: url("/static/img/guide/guide-icon.png")no-repeat;
      background-size: 100% 100%;
    }
  }
  .vip-buybtn{
    @include width-height(rem(691),rem(97));
    margin: rem(20) auto 0;
    img{
      @include width-height(100%,100%);
    }
  }
  .guide-rule{
    padding: rem(35) rem(30);
    background-color: #f2f2f2;
    color: #6b6a61;
    line-height: 1.8;
  }
</style>
