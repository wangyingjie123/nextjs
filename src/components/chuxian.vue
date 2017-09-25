<template>
  <transition name="fade">
    <div class="image-require">
      <div class="image-require-inner message-inner">
        <div class="guanbi col-hui" v-on:click="chuxianFalse">
          <svg class="icon icon-selected" aria-hidden="true">
            <use xlink:href="#icon-guanbi"></use>
          </svg>
        </div>
        <div class="vip-chuxian">
          <h2 class="prompt-title text-align">出险报案</h2>
          <div class="padding-sx">
            <div class="chuxian-img">
              <img src="/static/img/chuxian.jpg" alt="">
            </div>
            <div class="col-normal vip-chuxian_text">
              <p>1.请拨打400-6070-259出险报案。</p>
              <p>2.出险报案成功后，3-5个工作日哐叽客服将联系您并为您安排工程师进行维修。</p>
              <p>3.请关注“哐叽”公众号，查看出险状况。</p>
            </div>
          </div>
          <div class="text-align mar-top20 btn-list">
            <div class="btncancel" v-on:click="chuxianFalse" v-show="cancel">取消</div>
            <div class="btnkonw" v-on:click="chuxianTrue">{{ btntext }}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    name: 'vipChuxian',
    props: ['cancel', 'btntext'],
    methods: {
      chuxianFalse () {
        this.$emit('fachuxianFalse')
      },
      chuxianTrue () {
        this.$emit('fachuxianFalse')
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../assets/css/global.scss';
  .vip-chuxian{
    width: rem(630);
    box-sizing: border-box;
  }
  .chuxian-img{
    @include width-height(rem(421),rem(130));
    margin: 0 auto;
    img{
      @include width-height(100%,100%)
    }
  }
  .vip-chuxian_text{
    padding: rem(40) rem(40) 0;
    line-height: 1.7;
  }
</style>
