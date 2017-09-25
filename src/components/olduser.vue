<template>
  <transition name="fade">
    <div class="image-require">
      <div class="image-require-inner message-inner">
        <div class="guanbi col-hui" @click="olduserFalse">
          <svg class="icon icon-selected" aria-hidden="true">
            <use xlink:href="#icon-guanbi"></use>
          </svg>
        </div>
        <div class="prompt-inner">
          <p class="prompt-title text-align font-size-18">提示</p>
          <div class="padding-sx">
            <p class="text-align font-weight col-red font-size16">同一手机号只能购买一次会员！</p>
            <div class="text-align font-size16 mar-top10">您已是超级会员，是否登录？</div>
          </div>
          <div class="text-align mar-top20 btn-list">
            <div class="btncancel" v-on:click="olduserFalse">取消</div>
            <div class="btncancel bj-yellow" v-on:click="olduserTrue">登录</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    name: 'vipOlduser',
    data: function () {
      return {}
    },
    methods: {
      olduserFalse () {
        this.$emit('faOlduserFalse')
      },
      olduserTrue () {
        this.$emit('faOlduserTrue')
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../assets/css/global.scss';
  .prompt-inner{
    width: rem(580);
  }
  .bj-yellow{
    background-color: #f3c91f;
  }
</style>
