<template>
  <transition name="fade">
    <div class="image-require">
      <div class="image-require-inner message-inner">
        <div class="prompt-inner">
          <h2 class="prompt-title text-align">提示</h2>
          <p class="font-size-18 text-align col-red">您填写的信息提交后<br>将不予更改信息！</p>
          <div class="font-size-18 mar-top20 text-align">您确定要提交信息吗？</div>
          <div class="text-align mar-top20 btn-list">
            <div class="btncancel" v-on:click="promtsureFalse">取消</div>
            <div class="btnkonw" v-on:click="promtsureTrue">提交</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    name: 'vipPromptsure',
    data: function () {
      return {}
    },
    methods: {
      promtsureFalse () {
        this.$emit('faPromptsure')
      },
      promtsureTrue () {
        this.$emit('faPromptsureTrue')
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
</style>
