<template>
  <div class="select-city">
    <vip-header borderActive=true v-show="cxcity"></vip-header>
    <div class="select-bg">
      <h2 class="select-title">{{message}}</h2>
      <h3 class="select-title2 text-align">暂时只开放北京上海，其他城市暂缓开放</h3>
      <div class="city-list">
        <div class="city-item" v-bind:class="{ selectactive: $store.state.cityActive }" @click="classObject1" id="city1">
          <p class="dq-city" id="beijing">
            <svg class="icon" aria-hidden="true" id="beijing">
              <use xlink:href="#icon-dingwei"></use>
            </svg>
            当前城市
          </p>
          <div class="city-img">
            <img src="/static/img/beijing.png" alt="" class="beijing">
          </div>
          <h4 class="city-inner-title text-align">北京</h4>
          <p class="text-align col-aee city-text-bottom">五环内提供上门服务</p>
        </div>
        <div class="city-item" v-bind:class="{ selectactive: !$store.state.cityActive }" @click="classObject" id="city2">
          <p class="dq-city" id="shanghai">
            <svg class="icon" aria-hidden="true" >
              <use xlink:href="#icon-dingwei"></use>
            </svg>
            当前城市
          </p>
          <div class="city-img">
            <img src="/static/img/shanghai.png" alt="" class="shanghai">
          </div>
          <h4 class="city-inner-title text-align">上海</h4>
          <p class="text-align col-aee city-text-bottom">中环内提供上门服务</p>
        </div>
      </div>
      <div class="kuangji-text"></div>
    </div>
    <router-link v-bind:to="link" class="btn-next">
      下一步
    </router-link>
    <el-amap vid="amapDemo" :plugin="plugin"></el-amap>
  </div>
</template>

<script>
  import vipHeader from '../components/header.vue'
export default {
    name: 'vip_selectcity',
    data: function () {
      let that = this
      return {
        message: '请选择我们为您服务的城市',
        cxcity: true,
        dqcity: false,
        plugin: [{
          pName: 'CitySearch',
          events: {
            init (instance) {
              instance.getLocalCity(function (status, result) {
                if (status === 'complete' && result.info === 'OK') {
                  if (result && result.city && result.bounds) {
                    let cityinfo = result.city.substring(0, result.city.length - 1)
                    console.log(cityinfo)
                    if (cityinfo === '上海') {
                      document.getElementById('shanghai').style.opacity = 1
                      that.$store.state.cityActive = false
                      that.$store.state.city = '上海'
                      sessionStorage.setItem('city', '上海')
                    } else {
                      document.getElementById('beijing').style.opacity = 1
                      that.$store.state.cityActive = true
                      that.$store.state.city = '北京'
                      sessionStorage.setItem('city', '北京')
                    }
                  }
                }
              })
            }
          }
        }],
        link: '/model'
      }
    },
    mounted () {
      const isReplace = this.$route.query.city
      if (isReplace === 'true') {
        this.cxcity = false
        this.link = '/model?ghm=true'
      } else {
        this.cxcity = true
        this.link = '/model'
      }
    },
    components: {
      vipHeader
    },
    methods: {
      classObject: function () {
        sessionStorage.setItem('city', '上海')
        this.$store.state.city = '上海'
        this.$store.state.cityActive = false
      },
      classObject1: function () {
        sessionStorage.setItem('city', '北京')
        this.$store.state.city = '北京'
        this.$store.state.cityActive = true
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../assets/css/global';
  .scss-node{
    width: rem(300);
    height: rem(300);
    background-color: #42b983;
    display: block;
  }
  .select-bg{
    background-color: #f2f2f2;
    padding-top: 50px;
    min-height: calc(100vh - 50px);
    padding-bottom: rem(60);
    box-sizing: border-box;
  }
  .select-title{
    padding-top:rem(60);
    margin: 0;
    text-align: center;
    font-size: 22px;
  }
  .select-title2{
    color: #aeaeb7;
    padding: rem(25) 0 rem(70);
    font-size: 15px;
  }
  .city-list{
    padding: 0 rem(30);
    display: flex;
    /*grid-template-columns: repeat(2, 1fr);*/
    /*grid-column-gap:rem(20);*/
    box-sizing: border-box;
    >div:first-child{
      margin-right: rem(30);
    }
  }
  .dq-city{
    opacity: 0;
    margin: 0;
    font-size: 12px;
    color: #aeaeb7;
    padding: rem(15);
  }
  .city-item{
     background-color: #fff;
     border-radius: 6px;
     flex: 1;
    /*box-sizing: border-box;*/
    border: 1px solid transparent;
    box-shadow: 0 0 2px 0 transparent;
  }
  .selectactive{
    border-color:  #f3c91f;
    box-shadow: 0 0 2px 0 #f3c91f;
  }
  .city-img{
    height: rem(210);
    position: relative;
    img{
     display: block;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .beijing{
    width: rem(294);
    height: rem(125);
  }
  .shanghai{
    width: rem(167);
    height: rem(164);
  }
  .city-inner-title{
    margin: rem(55) 0 rem(25);
    font-size: 16px;
  }
  .city-text-bottom{
    font-size: 12px;
    margin-bottom: rem(40);
  }
  .kuangji-text{
    width: rem(609);
    height: rem(127);
    background: url("/static/img/kuangjitext.png")no-repeat;
    background-size:100% 100%;
    margin: rem(60) auto;
  }
</style>
