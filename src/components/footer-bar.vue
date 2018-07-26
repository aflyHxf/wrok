<template>
  <div class="footer-container">
    <ul>
      <li v-for="(item,index) in footerList"
          :key="index"
      @click="tabIndex(index)">
        <span :class="footerIndex === index ?(item.icon + '-active'):item.icon"></span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'footer-bar',
  data () {
    return {
      footerList: [
        {icon: 'home-icon'},
        {icon: 'wallet-icon'},
        {icon: 'promotion-icon'},
        {icon: 'cs-icon'},
        {icon: 'profile-icon'}
      ],
      footerIndex: 0
    }
  },
  methods: {
    tabIndex (index) {
      if (this.footerIndex === index) return false
      this.footerIndex = index
    }
  }
}
</script>

<style scoped lang="less">
.footer-container{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1.46rem;
  background: #fff;
  ul {
    display: flex;
    height: 100%;
    overflow: hidden;
    li {
      flex: 1;
      span{
        display: block;
        width: 1.14rem;
        height: 1.05rem;
        margin: 0.16rem auto;
        /*首页 */
        &.home-icon {
          background: url("../assets/img/icon/footer_tab_home.png") no-repeat center / 100% 100%;
        }
        &.home-icon-active {
          background: url("../assets/img/icon/footer_tab_home_selected.png") no-repeat center / 100% 100%;
        }
        /* 钱包*/
        &.wallet-icon {
          background: url("../assets/img/icon/footer_tab_wallet.png") no-repeat center / 100% 100%;
        }
        &.wallet-icon-active {
          background: url("../assets/img/icon/footer_tab_wallet_selected.png") no-repeat center / 100% 100%;
        }
        /* 优惠*/
        &.promotion-icon {
          background: url("../assets/img/icon/footer_tab_promotion.png") no-repeat center / 100% 100%;
        }
        &.promotion-icon-active {
          background: url("../assets/img/icon/footer_tab_promotion_selected.png") no-repeat center / 100% 100%;
        }
        /* 公告客服*/
        &.cs-icon{
          background: url("../assets/img/icon/footer_tab_cs.png") no-repeat center / 100% 100%;
        }
        &.cs-icon-active{
          background: url("../assets/img/icon/footer_tab_cs_selected.png") no-repeat center / 100% 100%;
        }
        /* 我的 */
        &.profile-icon {
          background: url("../assets/img/icon/footer_tab_profile.png") no-repeat center / 100% 100%;
        }
        &.profile-icon-active {
          background: url("../assets/img/icon/footer_tab_profile_selected.png") no-repeat center / 100% 100%;
        }
      }
    }
  }
}
</style>
