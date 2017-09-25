<template>
  <transition name="fade">
    <div>
      <div class="weui-mask_transparent"></div>
      <div class="weui-toast">
        <i class="weui-icon-success-no-circle weui-icon_toast"></i>
         <p class="weui-toast__content">{{ message }}</p>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    name: 'vipToast',
    data: function () {
      return {}
    },
    props: ['message']
  }
</script>
<style>
</style>
