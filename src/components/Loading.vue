<template>
    <div class="loading-container" v-if="loading">
      <div class="loading">
        <span></span>
      </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'loading'
    ])
  }
}
</script>

<style scoped lang="less">
  .loading-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, .5);
    z-index: 9999;
    .loading {
      position: absolute;
      top: 45%;
      left: 50%;
      width: 2.96rem;
      height: 2.39rem;
      transform: translate3d(-50%, -50%, 0);
      span {
        display: block;
        width: 100%;
        height: 100%;
        background: url("../assets/img/xbet_load_anim_trim.gif") no-repeat center / 100% 100%;
      }
    }
  }
</style>
