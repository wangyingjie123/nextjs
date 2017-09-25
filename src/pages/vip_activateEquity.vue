<template>
  <div class="vip-equity">
    <div class="order-top order-content">
      <div class="order-top-img">
        <img v-bind:src="'/static/img/model2/iphonelg'+modelid+'.jpg'" alt="">
      </div>
      <div class="order-top-text">
        <h3 class="font-size16">苹果 {{ $store.state.model }}</h3>
        <p class="font-size12 mar-top10">服务城市：{{ $store.state.city }}</p>
        <p class="font-size12 mar-top10">提供上门服务</p>
        <p class="order-top-price font-size12">会员换屏(碎屏险权益)：<span class="font-size16 col-red">￥60</span></p>
        <router-link to="/model/?ghm=true" class="replace-model font-size12 mar-top10">更换型号</router-link>
      </div>
    </div>
    <div class="equity-user-info">
       <p class="equity-info-title col-hui">请填写投保人信息</p>
    </div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label for="" class="weui-label widthgx">投保人姓名</label>
        </div>
        <div class="weui-cell__bd">
          <input type="text" class="weui-input" placeholder="" v-model="userName">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label for="" class="weui-label widthgx">投保人身份证号</label>
        </div>
        <div class="weui-cell__bd">
          <input type="text" class="weui-input" placeholder="" v-model="useridCard">
        </div>
      </div>
    </div>
    <div class="equity-user-info">
      <p class="equity-info-title col-hui">请填写投保手机信息</p>
    </div>
    <div class="weui-cells">
      <div class="weui-cell weui-cell_access">
        <div class="weui-cell__hd">
          <label for="" class="weui-label widthgx">手机颜色</label>
        </div>
        <div class="weui-cell__bd">
          <select name="" class="weui-select" style="height: 20px;line-height: 20px;">
            <option value="">黑色</option>
            <option value="">白色</option>
            <option value="">银色</option>
          </select>
        </div>
        <div class="weui-cell__ft"></div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd flex-1">
          <label for="" class="weui-label">手机照片</label>
        </div>
        <div class="weui-cell__bd flex-1 text-right" @click="showImgUpload(true,false)">
          <svg class="icon icon-selected" aria-hidden="true" >
            <use xlink:href="#icon-wenhao"></use>
          </svg>
          照片要求
        </div>
      </div>
      <div class="weui-img">
        <div class="weui-uploader__input-box" id="tupian" @click="showImgUpload(true,true)">
          <div class="uploadimg" v-bind:style="{backgroundImage:'url('+dataimg+')'}"></div>
        </div>
      </div>
    </div>
    <div class="equity-careful col-hui">
      <p class="careful-title">注意事项</p>
      <p class="mar-top10">1.请认真填写正确的投保信息，以确保出险成功。如因填写信息错误导致无法出险，用户承担后果。</p>
      <p>2.如填写信息被发现造假，哐叽将删除此用户会员身份不退还购买会员的费用。</p>
      <p>3.激活成功后，投保信息不予更改，如造成出险问题用户自行承担后果。</p>
    </div>
    <div class="submit-sure font-size16">
      <p class="font-size12 col-red">{{errorMsg}}</p>
      <div class="btn-sure mar-top10" @click="application">申请激活</div>
    </div>
    <!--上传照片插件-->
    <div class="image-require" v-show="show" @click="show=false">
      <div class="image-require-inner message-inner" @click.stop>
        <div class="btn-close" @click="show=false">
          <svg class="icon" aria-hidden="true" >
            <use xlink:href="#icon-guanbi"></use>
          </svg>
        </div>
        <p class="font-size16 text-align">上传照片要求</p>
        <div class="swiper-container gallery-top mar-top20">
          <div class="swiper-wrapper">
            <div v-for="(value, index) in lbt" class="swiper-slide">
              <img v-bind:src="value.imgs" alt="">
              <p class="require-text font-size-12"><span class="text-align">{{ index+1}}</span>{{value.text}}</p>
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
        <div class="image-require-text">
          <span class="col-red">要求：</span>
          拍摄时拍摄手机要与被保手机平行，在灯光明亮的环境下，拍出手机完整屏幕（能清晰看出屏幕是否完好）。
        </div>
        <div class="image-upload text-align" v-show="btnshow">
          上传照片
          <input type="file" class="image-uploader__input" accept="image/*" multiple @change="onFileChange($event)">
        </div>
      </div>
    </div>
    <vip-prompt v-show="promptshow" v-on:faPrompt="promptFalse"></vip-prompt>
    <vip-promptsure v-show="promptsureshow" v-on:faPromptsure="promptsureFalse" v-on:faPromptsureTrue="faPromptsureTrue"></vip-promptsure>
  </div>
</template>

<script>
  import vipPrompt from '../components/prompt.vue'
  import vipPromptsure from '../components/promptSure.vue'
  import Swiper from '../../static/js/swiper-3.4.2.min.js'
  export default {
    name: 'vip-equity',
    data: function () {
      return {
        lbt: [
          {
            'imgs': '/static/img/swiper1.jpg', 'text': '请在被保手机拨号页面点击*#06#'
          }, {
            'imgs': '/static/img/swiper1.jpg', 'text': '请在被保手机拨号页面点击*#06#'
          }, {
            'imgs': '/static/img/swiper1.jpg', 'text': '请在被保手机拨号页面点击*#06#'
          }
        ],
        btnshow: true, // 上传照片按钮
        show: false, // 出现上传照片
        errorMsg: '', // 错误信息提示
        dataimg: '',  // 上传图片
        userName: '', // 投保人姓名
        useridCard: '', // 投保人身份证
        promptshow: false, // 弹出框1
        promptsureshow: false,  // 弹出框2
        accessid: '',
        modelid: sessionStorage.getItem('modelId'),
        callback: '',
        dir: '',
        expire: 0,
        host: '',
        policy: '',
        signature: ''
      }
    },
    mounted () {
      this.swiper()
      this.getimgData()
    },
    methods: {
      swiper () {
        this.mySwiper = new Swiper('.gallery-top', {
          observer: true,
          observeParents: true,
          direction: 'horizontal',
          autoplay: 3000,
          autoplayDisableOnInteraction: false,
          loop: true,
          pagination: '.swiper-pagination',
          paginationClickable: true
        })
      },
      onFileChange (e) {
        let src
        let url = window.URL || window.webkitURL || window.mozURL
        let files = e.target.files
        this.file = files[0]
        for (let i = 0, len = files.length; i < len; ++i) {
          let file = files[i]
          if (url) {
            src = url.createObjectURL(file)
          } else {
            src = e.target.result
          }
          this.fileName = getSuffix(file.name)
          this.show = false
          this.dataimg = src
        }
      }, //  上传照片
      showImgUpload (flag1, flag2) {
        this.show = flag1
        this.btnshow = flag2
      },
      application () {
        this.uploadOss()
//        if (!this.userName) {
//          this.errorMsg = '请填写投保人姓名'
//          return
//        }
//        if (!this.useridCard) {
//          this.errorMsg = '请填写投保人身份证号'
//          return
//        } else {
//          let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
//          if (reg.test(this.useridCard) === false) {
//            this.errorMsg = '身份证号格式不正确'
//            return
//          }
//        }
//        if (!this.dataimg) {
//          this.errorMsg = '请选择要上传的照片'
//          return
//        }
//        this.errorMsg = ''
//        this.promptsureshow = true
      },
      promptsureFalse () {
        this.promptsureshow = false
      },
      faPromptsureTrue () {
        this.promptsureshow = false
        this.promptshow = true
      },
      promptFalse () {
        this.promptshow = false
        this.dataimg = ''
        this.userName = ''
        this.useridCard = ''
      },
      getimgData () {
        this.$http.get('list/svip_checkout/getSign?orderNo=1234567890').then(function (res) {
//          console.log(res)
          if (res.ok) {
            this.accessid = res.body.accessid
            this.callback = res.body.callback
            this.dir = res.body.dir
            this.expire = res.body.expire
            this.host = res.body.host
            this.policy = res.body.policy
            this.signature = res.body.signature
          }
        })
      },
      uploadOss () {
        let formData = new FormData()
        formData.append('key', this.dir + randomString(32) + this.fileName)
        formData.append('policy', this.policy)
        formData.append('OSSAccessKeyId', this.accessid)
        formData.append('success_action_status', 200)
        formData.append('callback', this.callback)
        formData.append('signature', this.signature)
        formData.append('file', this.file)
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        this.$http.post(this.host, {
          'multipart_params': formData
        }, config).then(function (res) {
          console.log(res)
        })
        console.log(formData)
      }
    },
    components: {
      vipPrompt,
      vipPromptsure
    }
  }
  function randomString (len) {
    len = len || 32
    let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
    let maxPos = chars.length
    let pwd = ''
    for (let i = 0; i < len; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * maxPos))
    }
    return pwd
  }

  function getSuffix (filename) {
    let pos = filename.lastIndexOf('.')
    let suffix = ''
    if (pos !== -1) {
      suffix = filename.substring(pos)
    }
    return suffix
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import url("../assets/css/swiper-3.4.2.min.css");
  @import '../assets/css/global.scss';
  .order-top{
    padding: rem(30);
    background-color: #fff;
    display: flex;
    align-items: flex-end;
  }
  .order-top-img{
    width: rem(212);
    height: rem(280);
    img{
      width: 100%;
      height: 100%;
    }
  }
  .order-top-text{
    padding-left:rem(40);
    overflow: hidden;
    flex: 1;
  }
  .order-top-price{
    margin-top: rem(20);
  }
  .replace-model{
    background-color: #f3c91f;
    padding: rem(10) rem(30);
    border-radius: 20px;
    float: right;
  }
  .equity-info-title{
    padding: rem(20) rem(30);
  }
  .weui-cells{
    margin-top: 0;
    font-size: 14px;
  }
  .weui-img{
    padding: 0 rem(30) rem(10);
    overflow: hidden;
  }
  .equity-careful{
    padding: rem(30);
  }
  .careful-title{
    &:before{
      content: '';
      display: inline-block;
      width: 8px;
      height: 8px;
      margin-right: rem(15);
      background-color: #e33232;
      border-radius: 50%;
    }
  }
  .submit-sure {
    padding: rem(30) rem(30) rem(45);
    p{
      padding: 0 rem(20);
    }
  }
  .btn-sure {
    background-color: #f3c91f;
    border-radius: 25px;
    text-align: center;
    padding: rem(20) 0;
    box-shadow: 0 5px 2px #ccc;
  }
  .swiper-wrapper{
  width: rem(650);
  height: rem(440);
  .swiper-slide{
    height: 100%;
    img{
      @include width-height(100%,rem(350));
    }
  }
}
  .require-text{
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    span{
      display: inline-block;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: #f3c91f;
      line-height: 20px;
      margin-right: 5px;
    }
  }
  .swiper-container-horizontal>.swiper-pagination-bullets, .swiper-pagination-custom, .swiper-pagination-fraction{
    bottom: rem(40);
  }
  .image-require-text{
    padding: rem(30);
  }
  .image-upload{
    width: rem(335);
    padding: rem(20) 0;
    background-color: #f3c91f;
    border-radius: 20px;
    margin: 0 auto;
    position: relative;
    .image-uploader__input{
      position: absolute;
      top:0;
      left: 0;
      display: inline-block;
      opacity: 0;
      @include width-height(100%,100%);
    }
  }
  .uploadimg{
    @include width-height(100%,100%);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
    background-repeat: no-repeat;
    background-size:100% 100% ;
  }
  .btn-close{
    float: right;
    font-weight: 700;
    line-height: 1;
    margin-right: 10px;
    color: #000;
    text-shadow: 0 1px 0 #fff;
    filter: alpha(opacity=20);
    opacity: .2;
  }
</style>
