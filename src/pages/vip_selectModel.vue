<template>
  <div id="selectModel">
    <vip-header borderActive=true borderActive2=true address="/Vip_selectcity" v-show="step==='下一步'"></vip-header>
    <div class="vip-model" :class="{'padding50':step==='下一步'}">
      <div class="model-inner">
        <p class="font-weight font-size16 padd-10">激活碎屏险权益—请选择手机型号</p>
        <p class="mar-top10 padd-10">购买两年以内的手机（暂支持iPhone机型）</p>
        <ul class="model-list">
          <li class="text-align" v-for="model in models">
            <div class="model-item-inner" @click="modelClick(model.modelName,model.modelId,model.memberPrice)"
                 :class="{'border-color': model.modelId === modelid }">
              <i class="weui-icon-success selected-icon"></i>
              <div class="model-img">
                <img v-bind:src="'/static/img/model1/iphonesm'+model.modelId+'.jpg'" alt="">
              </div>
              <h3 class="model-name">{{model.modelName}}</h3>
              <p class="font-size12 mar-top10">会员屏幕维修价</p>
              <p class="font-size12 col-hui">(碎屏险权益)</p>
              <div class="model-price mar-top10">
                <span class="col-red font-weight">￥{{model.memberPrice}}</span>
                <span class="shanchuxian col-hui">￥{{model.unmemberPrice}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="btn-next" @click="goOrder()">
      {{step}}
    </div>
    <vip-dialog v-show="dialogs" :message="msg" v-on:father="dialogFalse"></vip-dialog>
  </div>
</template>
<script>
  import vipDialog from '../components/dialog.vue'
  import vipHeader from '../components/header.vue'
  export default {
    name: 'model',
    data: function () {
      return {
        models: [],
        dialogs: false,
        msg: '请选择机型',
        modelid: sessionStorage.getItem('modelId') ? Number(sessionStorage.getItem('modelId')) : 0,
        step: '下一步'
      }
    },
    created () {
      this.getModel()
    },
    mounted () {
      const isReplace = this.$route.query.ghm
      if (isReplace === 'true') {
        this.step = '确定更换'
      } else {
        this.step = '下一步'
      }
//      this.wxShare()
    },
    components: {
      vipHeader,
      vipDialog
    },
    methods: {
      modelClick (c, id, price) {
        this.$store.state.model = c
        if (this.modelid === 0) {
          this.modelid = id
        } else {
          this.modelid = id
        }
        this.$store.state.vipPrice = price
        sessionStorage.setItem('model', c)
        sessionStorage.setItem('modelId', id)
      },
      getModel () {
        this.$http.get('list/svip_buy/getPhoneModels').then(function (res) {
//          console.log(res)
          if (res.body.code === 0) {
            this.models = res.body.data
          }
        })
      }, // 获取型号
      goOrder () {
        if (this.modelid === 0) {
          this.dialogs = true
        } else {
          const isReplace = this.$route.query.ghm
          if (isReplace === 'true') {
            this.$http.post('list/svip_checkout/updateOrder', {
              userCity: this.$store.state.city,
              userPhoneModel: this.$store.state.model
            }).then((res) => {
              console.log(res)
              if (res.body.code === 0) {
                window.location.href = this.url + '/svip_index/goto_insurerInfo'
              } else {
                if (res.data.error === '鉴权失败') {
                  this.msg = '系统已进入无人区，请重新登陆'
                  this.dialogs = true
                } else if (res.data.error === '系统错误') {
                  window.location.href = this.url + '/svip_index/error?error=系统跑路了,&msg=请联系客服去逮捕它'
                } else if (res.data.error === '参数错误') {
                  window.location.href = this.url + '/svip_index/error?error=系统跑路了,&msg=请联系客服去逮捕它'
                }
              }
            })
          } else {
            this.$router.push('/viporder')
          }
        }
      },
      dialogFalse: function () {
        this.dialogs = false
        if (this.msg === '系统已进入无人区，请重新登陆') {
          window.location.href = this.url + '/svip_index/login'
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  @import '../assets/css/global.scss';
  .vip-model{
     padding-top: 0;
   }
  .padding50{
    padding-top: 50px;
  }
  .model-inner{
    padding: rem(20) rem(10) 55px;
  }
  .model-list{
    /*display: flex;*/
    /*flex-wrap: wrap;*/
    overflow: hidden;
    margin-top: rem(20);
    li{
      padding: 0 rem(10);
      box-sizing: border-box;
      float: left;
      width: 50%;
      margin-bottom: rem(20);
    }
    .border-color{
      border-color: #f3c91f;
      box-shadow: 0 0 2px 0 #f3c91f;
      .selected-icon{
        color: #f3c91f;
      }
    }
  }
  .model-item-inner{
    padding: rem(35) 0;
    background-color: #fff;
    border-radius: 8px;
    border:1px solid rgba(150, 150, 150, 0.313725);
    position: relative;
  }
  .selected-icon{
    color: transparent;
    position: absolute;
    top:rem(20);
    font-size: 18px;
    left: rem(20);
  }
  .model-name{
    font-size: 14px;
  }
  .model-img{
    width: rem(155);
    height: rem(190);
    margin: 0 auto rem(35);
    img{
      width: 100%;
      height: 100%;
    }
  }
  .shanchuxian{
    margin-left: rem(10);
  }
</style>
