<template>
  <transiton name="fade">
    <div class="confirm-container" v-show="show">
      <transition name="confirm">
        <div class="confirm-content">
          <div class="title" v-html="title" :style="{color:typeColor}"></div>
          <div class="text-content">
            <div class="text" v-html="text"></div>
          </div>
          <ul class="footer-btn">
            <li class="cancel" @click="cancel">取消</li>
            <li class="confirm">确定</li>
          </ul>
        </div>
      </transition>
    </div>
  </transiton>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '提示'
    },
    type: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  },
  computed: {
    typeColor () {
      switch (this.type) {
      case 'success':
        return '#00c391'
      default :
        return ''
      }
    }
  },
  data () {
    return {
      show: true
    }
  },
  methods: {
    cancel () {
      this.show = false
    }
  }
}
</script>

<style scoped lang="less">
  .confirm-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .3);
    z-index: 9999;
    .confirm-content {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 8.56rem;
      height: 4.12rem;
      border-radius: 0.08rem;
      border: 0.02rem solid @borderColor;
      overflow: hidden;
      background: #fff;
      .title{
        height: 1.05rem;
        line-height: 1.05rem;
        padding: 0 0.5rem;
      }
      .text-content{
        width: 100%;
        height: 1.95rem;
        padding: 0 .22rem;
        .text{
          height: 100%;
          border-top: 0.01rem solid @borderColor;
        }
      }
      .footer-btn{
        display: flex;
        height: 1.12rem;
        line-height: 1.12rem;
        li{
          flex: 1;
          color: #fff;
          text-align: center;
          &.cancel{
            background: #7f7f7f;
          }
          &.confirm{
            background: @themeColor;
          }
        }
      }
    }
  }

  .confirm-enter-active, .confirm-leave-active {
    transition: .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .confirm-enter {
    opacity: 0;
    transform: translate3d(0, 0, 0);
  }

  .confirm-leave-active {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
</style>
