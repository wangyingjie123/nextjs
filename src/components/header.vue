<template>
  <div class="vip-gduide font-size-28 header">
    <div class="guide-step" v-bind:class="{ 'border-yellow': borderActive }" @click="goAddress(address)">
      <span>{{ $store.state.city }}</span>
      <svg class="icon" aria-hidden="true" >
        <use xlink:href="#icon-jiantou"></use>
      </svg>
    </div>
    <div class="guide-step col-hui" v-bind:class="{ 'border-yellow': borderActive2 }" @click="goAddress(address2)">
      <span>{{ $store.state.model }}</span>
      <svg class="icon" aria-hidden="true" >
        <use xlink:href="#icon-jiantou"></use>
      </svg>
    </div>
    <div class="guide-step col-hui" v-bind:class="{ 'border-yellow': borderActive3 }">提交支付</div>
  </div>
</template>
<script>
  export default {
    name: 'header',
    data: function () {
      return {}
    },
    props: ['borderActive', 'borderActive2', 'borderActive3', 'address', 'address2'],
    methods: {
      goAddress (path) {
        if (path) {
          this.$router.push(path)
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  /*样式代码*/
</style>
