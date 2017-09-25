<template>
  <transition name="fade">
    <div class="image-require">
      <div class="image-require-inner message-inner">
        <div class="guanbi col-hui" @click="chuxianzhongHide">
          <svg class="icon icon-selected" aria-hidden="true">
            <use xlink:href="#icon-guanbi"></use>
          </svg>
        </div>
        <div class="prompt-inner">
          <div class="col-3b guanzhuxx">
            <p>亲爱的超级会员:</p>
            <p class="col-red mar-top20">您的碎屏险权益已经生成，工程师会准时前往指定地点维修，请耐心等待哦！</p>
          </div>
          <div class="btnkonw text-align" @click="chuxianzhong">查看订单</div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    name: 'vipChuxianzhong',
    methods: {
      chuxianzhong () {
        this.$emit('faChuxianzhong')
      },
      chuxianzhongHide () {
        this.$emit('faChuxianzhongHide')
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../assets/css/global.scss';
  .prompt-inner{
    width: rem(580);
  }
  .prompt-title{
    padding: rem(20) 0 rem(40);
  }
  .guanzhuxx{
    padding: 0 rem(30) rem(40);
  }
</style>
