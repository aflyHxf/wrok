 <template>
	<div class='alert-box'>
        <transition v-for='(item,index) in alert' :key='index' name="fade" mode="out-in" appear>
            <div class="msgalert" v-if="item.show" flex='box:justify'>
                <span class="icon" :class="item.type?icons[item.type]:'icon_tick'"></span>
                <div>{{item.text}}</div>
                <span class="icon icon_cha close" @click='item.show=false'></span>
            </div>
        </transition>
	</div>
</template>

<script>
/*
*   alert提示窗
*{
    example
        let a = '城管灌灌灌灌灌'
        let b = 'warn'
        this.$tool.ALERT({text:a,type:b});
}
*@param {String} a 字符串a
*@param {String} b 字符串b  ('success','warn','error','notice') 四选一
*
*hank 2018.4.17
*
*/
import {mapGetters} from 'vuex'
export default {
    data () {
        return {
            icon:'icon_tick',
            icons:{
                success:'icon_tick',
                warn:'icon_warn',
                error:'icon_error',
                notice:'icon_notice'
            }
        };
    },
    computed:{
        ...mapGetters(['alert'])
    },
};
</script>
