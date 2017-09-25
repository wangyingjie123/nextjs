<template>
  <transition name="fade">
    <div>
      <div class="weui-mask_transparent"></div>
      <div class="weui-toast">
        <i class="weui-loading weui-icon_toast"></i>
        <p class="weui-toast__content">正在加载中</p>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    name: 'vipLoading',
    data: function () {
      return {}
    }
  }
</script>
