<template>
  <transition name="fade">
    <div class="confirm-container" v-show="show">
      <div class="confirm-content" :class="animate">
        <div class="title" v-html="title" :style="{color:typeColor}"></div>
        <div class="text-content">
          <div class="text" v-html="text"></div>
        </div>
        <ul class="footer-btn">
          <li class="cancel" @click="cancel" v-if="cancelText">{{cancelText}}</li>
          <li class="confirm" @click="confirm">确定</li>
        </ul>
      </div>
    </div>
  </transition>
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
    },
    cancelText: {
      type: String,
      default: ''
    }
  },
  computed: {
    /* eslint-disable */
    typeColor() {
      switch (this.type) {
        case 'success':
          return '#00c391'
        default :
          return ''
      }
    }
  },
  data() {
    return {
      show: true,
      animate: 'animate-up'
    }
  },
  methods: {
    cancel() {
      this.animate = 'animate-down'
      setTimeout(() => {
        this.show = false
      }, 300)
    },
    confirm() {
      console.log(123)
    }
  },
  watch: {
    show(nv) {
      if (nv) {
        this.animate = 'animate-up'
      }
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
      &.animate-down {
        animation: siderDown 0.3s linear;
        animation-fill-mode: forwards;
      }
      &.animate-up {
        animation: siderUp 0.3s linear;
        animation-fill-mode: forwards;
      }
      .title {
        height: 1.05rem;
        line-height: 1.05rem;
        padding: 0 0.5rem;
      }
      .text-content {
        width: 100%;
        height: 1.95rem;
        padding: 0 .22rem;
        .text {
          height: 100%;
          border-top: 0.01rem solid @borderColor;
        }
      }
      .footer-btn {
        display: flex;
        height: 1.12rem;
        line-height: 1.12rem;
        li {
          flex: 1;
          color: #fff;
          text-align: center;
          &.cancel {
            background: #7f7f7f;
          }
          &.confirm {
            background: @themeColor;
          }
        }
      }
    }
  }

  @keyframes siderDown {
    from {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
    to {
      transform: translate3d(0, 200%, 0);
      opacity: 0;
    }
  }

  @keyframes siderUp {
    from {
      transform: translate3d(0, 200%, 0);
      opacity: 0;
    }
    to {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }


</style>
