<template>
  <transition name="fade">
    <div class="image-require">
      <div class="image-require-inner message-inner">
        <div class="guanbi col-hui" v-on:click="ChckoutSuccess">
          <svg class="icon icon-selected" aria-hidden="true">
            <use xlink:href="#icon-guanbi"></use>
          </svg>
        </div>
        <div class="prompt-inner">
          <h2 class="prompt-title text-align font-size16">激活成功</h2>
          <div class="col-3b guanzhuxx">
            <p>亲爱的超级会员，碎屏险权益激活成功！</p>
            <p>投保设备imei号：</p>
            <p class="col-red">{{imei}}</p>
            <p>有效期至：<span class="col-red">{{youxiaoqi}}</span></p>
            <p>如有疑问请联系哐叽客服</p>
            <p>400-6070-259</p>
          </div>
          <div class="btnkonw text-align" @click.stop="ChckoutSuccess">我知道了</div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    name: 'vipChckoutSuccess',
    props: ['imei', 'youxiaoqi'],
    methods: {
      ChckoutSuccess () {
        this.$emit('faChckoutSuccess')
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../assets/css/global.scss';
  .prompt-inner{
    width: rem(580);
  }
  .guanzhuxx{
    padding: rem(30) rem(30) rem(40);
  }
</style>
