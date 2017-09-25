<template>
  <transition name="fade">
    <div class="image-require">
      <div class="image-require-inner message-inner">
        <div class="guanbi col-hui" v-on:click="cxSelectFalse">
          <svg class="icon icon-selected" aria-hidden="true">
            <use xlink:href="#icon-guanbi"></use>
          </svg>
        </div>
        <div class="prompt-inner">
          <p class="prompt-title text-align">提示</p>
          <p class="font-size-18 padding-sx text-align col-red">您确定要出险报修吗？</p>
          <div class="text-align mar-top20 btn-list">
            <div class="btncancel" v-on:click="cxSelectFalse">取消</div>
            <div class="btncancel bg-yellow" v-on:click="cxSelectTrue">确定出险</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    name: 'vipChuxianSelect',
    data: function () {
      return {}
    },
    methods: {
      cxSelectFalse () {
        this.$emit('cxSelectFalse')
      },
      cxSelectTrue () {
        this.$emit('cxSelectTrue')
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../assets/css/global.scss';
  .prompt-inner{
    width: rem(580);
  }
  .bg-yellow{
    background-color: #f3c91f;
  }
</style>
