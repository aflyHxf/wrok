// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import polyfill from './tool/polyfill'
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'

import tool from './tool'
import api from './tool/api'

tool.router = router;

import UIcomponents from 'components/components'

Vue.use(UIcomponents);


// import ES6Promise from 'es6-promise'
import VueLazyload from 'vue-lazyload'
/***********全局组件************/
import LoadSmall from './components/LoadSmall'

import 'vue-swipe/dist/vue-swipe.css'
import { Swipe, SwipeItem } from 'vue-swipe'
/************移动端************/
import vueTouch from './tool/vue-touch';

/* eslint-disable*/
Vue.config.productionTip = false;

/**********************************为移动端设置*********************************/
/*     绑定点击效果       */
document.body.addEventListener('touchstart', function () {});

/*  设置REM(100PX=>1REM) */
(function () {
	let docEl = document.documentElement;
	let resize = 'orientationchange' in window ? 'orientationchange' : 'resize';
	let setRem = function () {
		let screenWidth = docEl.clientWidth || window.screen.width || 360;
		let screenHeight = docEl.clientHeight || window.screen.Height || 360;
		let remWidth = screenWidth<screenHeight ? screenWidth :screenHeight;
		store.commit("SET_STATE",{name:'window',content:{
			height:docEl.clientHeight || window.screen.height || 360,
			width:docEl.clientWidth || window.screen.width || 360
		}});
		docEl.style.fontSize = (100 * screenWidth / 750) + 'px';
	};
	window.addEventListener('resize', setRem, false);
	document.addEventListener('DOMContentLoaded', setRem, false);
	setRem();
})();


/**********************************vue全局插件*********************************/
    // 图片懒加载 https://github.com/hilongjw/vue-lazyload
    Vue.use(VueLazyload, {
        preLoad: 1.3,
        error: 'dist/error.png',
        loading: 'dist/loading.gif',
        attempt: 1
    })
/**********************************全局组件*********************************/


Vue.component('load-small', LoadSmall)
Vue.component('swipe', Swipe);
Vue.component('swipe-item', SwipeItem);

/**********************************VUE创建*********************************/
Vue.prototype.$tool = tool
Vue.prototype.$api = api


/****************    自定义事件 ********************************/
//时间过滤器
Vue.filter('dateChange', function (date) {
    if (!date) return false
    let time = new Date(date)
    let Y = time.getFullYear();
    let M = time.getMonth() + 1 > 9 ? time.getMonth() + 1 : '0' + (time.getMonth() + 1);
    let D= time.getDate() > 9 ? time.getDate()  : '0' + time.getDate() ;

    let H= time.getHours() > 9 ? time.getHours()  : '0' + time.getHours() ;
    let m= time.getMinutes() > 9 ? time.getMinutes()  : '0' + time.getMinutes() ;
    let s= time.getSeconds() > 9 ? time.getSeconds()  : '0' + time.getSeconds() ;

    return `${Y}-${M}-${D} ${H}:${m}:${s}`
})

// 反选功能自定义组件
Vue.directive('click-outside', {
    bind: function (el, binding, vnode) {
        el.handler = function (event) {
            if (!(el == event.target || el.contains(event.target))) {
                vnode.context[binding.expression](event)
            }
        }
        document.body.addEventListener('click', el.handler)
    },
    unbind: function (el) {
        document.body.removeEventListener('click', el.handler)
    },
})

new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
