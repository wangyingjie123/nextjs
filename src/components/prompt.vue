<template>
  <transition name="fade">
    <div class="image-require" v-show="prompt">
      <div class="image-require-inner message-inner">
        <div class="prompt-inner">
          <h2 class="prompt-title text-align">提示</h2>
          <p class="font-size-18 text-align">您填写的信息已提交</p>
          <div class="col-hui text-align">工作人员将在<span class="col-red">1-2工作日</span><br>内判断是否激活成功！</div>
          <div class="text-align col-hui guanzhuxx">请密切关注哐叽公众号，查看激活信息</div>
          <div class="btnkonw text-align" v-on:click="promtFalse">我知道了</div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    name: 'vipPrompt',
    data: function () {
      return {
        prompt: false
      }
    },
    methods: {
      promtFalse () {
        this.prompt = false
        this.$emit('faPrompt')
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
    padding: rem(20) 0 rem(50);
  }
  .guanzhuxx{
    padding: rem(30) 0;
  }
</style>
