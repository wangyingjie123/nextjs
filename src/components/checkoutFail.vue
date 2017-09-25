<template>
  <transition name="fade">
    <div class="image-require" >
      <div class="image-require-inner message-inner">
        <div class="guanbi col-hui" @click="checkoutFalse">
          <svg class="icon icon-selected" aria-hidden="true">
            <use xlink:href="#icon-guanbi"></use>
          </svg>
        </div>
        <div class="prompt-inner">
          <h2 class="prompt-title text-align font-size16 col-red">激活失败</h2>
          <div class="text-align col-3b padding-lr">{{failreason}}</div>
          <div class="btnkonw text-align" @click.stop="newUpload">重新提交</div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    name: 'vipChckoutFail',
    props: ['failreason'],
    methods: {
      newUpload () {
        this.$emit('faCheckoutFalse')
      },
      checkoutFalse () {
        this.$emit('faCheckoutHide')
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../assets/css/global.scss';
  .prompt-inner{
    width: rem(580);
  }
  .padding-lr{
    padding: rem(40) rem(30);
  }
</style>
