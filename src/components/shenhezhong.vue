<template>
  <!--<transition name="fade">-->
    <div class="image-require">
      <div class="image-require-inner message-inner">
        <div class="guanbi col-hui" v-on:click="shenheFale">
          <svg class="icon icon-selected" aria-hidden="true">
            <use xlink:href="#icon-guanbi"></use>
          </svg>
        </div>
        <div class="prompt-inner">
          <p class="prompt-title text-align font-size-16">提示</p>
          <p class="text-align font-weight guanzhuxx">哐叽正在努力审核中，<br>请耐心等待</p>
          <div class="btnkonw text-align" v-on:click.stop="shenheFale">我知道了</div>
        </div>
      </div>
    </div>
  <!--</transition>-->
</template>
<script>
  export default {
    name: 'vipShenhe',
    data: function () {
      return {
      }
    },
    methods: {
      shenheFale () {
        this.$emit('faShenhe')
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
    padding: rem(40) 0 rem(50);
  }
</style>
