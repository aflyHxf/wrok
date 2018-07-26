<template>
  <div class="home-container">
    <header-bar></header-bar>
    <!--这里是轮播-->
    <swiper auto loop :show-dots="false">
      <swiper-item v-for="(item,index) in swiperList" :key="index" class="swiper-content">
        <a :href="item.url">
          <img :src="item.img" alt="">
        </a>
        <div class="desc-text">
          <span>{{item.title}}</span>
          <span class="right">{{index+1}}/{{swiperList.length}}</span>
        </div>
      </swiper-item>
    </swiper>
    <ul class="nav-list">
      <li v-for="(item,index) in navList" :key="index">
        <img :src="item.img" alt="">
      </li>
    </ul>
    <div class="recommend">推荐内容</div>
    <!--四张推荐图-->
    <ul class="recommend-list">
        <li v-for="(item,index) in recommendList" :key="index">
          <img :src="item.img" alt="">
        </li>
    </ul>
    <div>
      <ul class="link-list">
        <li v-for="(item,index) in linkList" :key="index">
          <img :src="item.img" alt="">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import HeaderBar from 'components/header-bar'
import {Swiper, SwiperItem} from 'vux'

const swiperList = [
  {
    url: 'https://www.google.com.tw/',
    img: require('../../assets/img/home/banner1.jpg'),
    title: '中大奖了'
  },
  {
    url: 'https://www.google.com.tw/',
    img: require('../../assets/img/home/banner2.jpg'),
    title: '中大奖了'
  },
  {
    url: 'https://www.google.com.tw/',
    img: require('../../assets/img/home/banner3.jpg'),
    title: '中大奖了'
  }
]

const navList = [
  {img: require('../../assets/img/home/1_sports_all.png')},
  {img: require('../../assets/img/home/1_slots_all.png')},
  {img: require('../../assets/img/home/1_live casino_all.png')},
  {img: require('../../assets/img/home/1_fish_all.png')}
]

const recommendList = [
  {img: require('../../assets/img/home/recommended1.png')},
  {img: require('../../assets/img/home/recommended2.png')},
  {img: require('../../assets/img/home/recommended3.png')},
  {img: require('../../assets/img/home/recommended4.png')}
]

const linkList = [
  {img: require('../../assets/img/home/menu_btm_vip.png')},
  {img: require('../../assets/img/home/menu_btm_x_hero.png')},
  {img: require('../../assets/img/home/menu_btm_x_baby.png')},
  {img: require('../../assets/img/home/menu_btm_game_app.png')},
  {img: require('../../assets/img/home/menu_btm_af.png')}
]

export default {
  data () {
    return {
      swiperList,
      navList,
      recommendList,
      linkList
    }
  },
  components: {
    HeaderBar,
    Swiper,
    SwiperItem
  }
}
</script>

<style scoped lang="less">
  .home-container {
    width: 100%;
    height: 100%;
    padding-top: 1.12rem;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    .swiper-content{
      position: relative;
      height: 5.3rem;
      overflow: hidden;
      img{
        display: block;
        width: 100%;
        height: 100%;
      }
      .desc-text {
        position: absolute;
        display: flex;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        padding: 0 .32rem;
        color: #fff;
        background: rgba(0, 0, 0, .5);
        span {
          &:first-child {
            flex: 1;
            text-align: left;
            font-size: 16px;
          }
          &.right {
            width: 1rem;
            font-size: 12px;
            text-align: right;
          }
        }
      }
    }
    .nav-list{
      display: flex;
      height: 3.26rem;
      overflow: hidden;
      li{
        flex: 1;
        border-right: .09rem solid @borderColor;
        &:last-child{
          border: none;
        }
        img{
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
    .recommend {
      height: 1.43rem;
      line-height: 1.43rem;
      font-size: 16px;
      font-weight: bold;
      color: #3c3c3c;
      padding: 0 .48rem;
    }
    .recommend-list {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 50%;
        height: 3.05rem;
        border-bottom: 4px solid @borderColor;
        &:nth-of-type(odd) {
          border-right: 4px solid @borderColor;
        }
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
    .link-list {
      display: flex;
      height: 1.78rem;
      background: rgba(0, 0, 0, .3);
      box-shadow: 0 0 4px rgba(0, 0, 0, .3);
      li {
        flex: 1;
        img{
          display: block;
          width: 1.2rem;
          height: 1.3rem;
          margin: 0.24rem auto;
        }
      }
    }
  }
</style>
