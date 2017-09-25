<template>
  <transition name="fade">
    <div class="js_dialog">
      <div class="weui-mask"></div>
      <div class="weui-dialog">
        <div class="weui-dialog__bd">{{message}}</div>
        <div class="weui-dialog__ft" v-on:click="dialogFalse">
          <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary">知道了</a>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    name: 'vipDialog',
    props: ['message'],
    methods: {
      dialogFalse () {
        this.$emit('father')
      }
    }
  }
</script>
<style>
</style>
