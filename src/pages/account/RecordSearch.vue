<template>
    <div class="record-search-container">
        <header-nav :csLogo="false"
                    :title="title"></header-nav>
        <ul class="record-title">
            <li v-for="(item,index) in gameList"
                :key="index"
                @click="changeTagIndex(index)">
                <span :class="{'active':tagIndex === index}">{{item.name}}</span>
            </li>
        </ul>
        <div class="search-content">
            <ul>
                <li v-show="tagIndex === 0">
                    <label>游戏大厅</label>
                    <div>EFISHFREE</div>
                </li>
                <li>
                    <label>起始时间</label>
                    <div class="time">
                        <input type="date" v-model="startTime">
                        <select v-model="startHours">
                            <option v-for="(item,index) in hours" :value="item" :key="index">{{item}}</option>
                        </select>
                        <select v-model="startMinutes">
                            <option v-for="(item,index) in minutes" :value="item" :key="index">{{item}}</option>
                        </select>
                    </div>
                </li>
                <li>
                    <label>结束时间</label>
                    <div class="time">
                        <input type="date" v-model="endTime">
                        <select v-model="endHours">
                            <option v-for="(item,index) in hours" :value="item" :key="index" :label="item"></option>
                        </select>
                        <select v-model="endMinutes">
                            <option v-for="(item,index) in minutes" :value="item" :key="index" :label="item"></option>
                        </select>
                    </div>
                </li>
            </ul>
            <div class="submit" @click="searchRecord">查 询</div>
        </div>

        <div class="search-record">
            <table>
                <thead>
                <tr>
                    <th>订单号</th>
                    <th>时间</th>
                    <th>金额</th>
                    <th>{{tagIndex===0?'游戏大厅':'优惠活动'}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in records" :key="index">
                    <td>{{item.orderNo}}</td>
                    <td>{{item.createTime | dateChange}}</td>
                    <td>{{item.validAmount}}</td>
                    <td>{{item.name}}</td>
                </tr>
                <tr v-if="!records.length">
                    <td  class="no-record" colspan="4">暂无记录</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import HeaderNav from 'components/Header'
export default {
    data() {
        return {
            title: '记录查询',
            gameList: [
                {name: '投注记录'},
                {name: '优惠记录'}
            ],
            tagIndex: 0,
            hours: this.$tool.getArr(24),
            minutes: this.$tool.getArr(60),
            startTime: this.$tool.nowDate()[0],
            startHours:'00',
            startMinutes:'00',
            endTime: this.$tool.nowDate()[0],
            endHours: 23,
            endMinutes: 59,
            records:[]
        }
    },
    computed: {
        params(){
            return {
                startTime: this.startTime + ' ' + this.startHours + ':' + this.startMinutes,
                endTime: this.endTime + ' ' + this.endHours + ':' + this.endMinutes
            }
        }
    },
    created() {
        // 默认为投注记录 今天的起止时间
        // 投注 consumption
        // 优惠 reward
        this.getSearchRecord(this.params)
    },
    components: {
        HeaderNav
    },

    methods: {
        //初始化参数
        init(){
            // init
            this.records = []
            this.startTime = this.$tool.nowDate()[0]
            this.endTime = this.$tool.nowDate()[0]
            this.startHours = '00'
            this.startMinutes = '00'
            this.endHours = 23
            this.endMinutes = 59
        },
        getSearchRecord(params){
            this.$api.search(params).then(res=>{
                this.records = res.data.records
            })
        },
        getPlayerRewardList(params){
            this.$api.getPlayerRewardList(params).then(res=>{
                this.records = res.data.records
            })
        },
        changeTagIndex(index) {
            if (this.tagIndex === index) return false
            this.init();
            this.tagIndex = index
            switch (index) {
            case 0:
                this.getSearchRecord(this.params)
                break;
            case 1:
                this.getPlayerRewardList(this.params)
                break;
            default:
                this.init()
            }

        },
        searchRecord() {
            this.getSearchRecord(this.service,this.params)
        }
    }
}
</script>

<style scoped lang="scss">
    .record-search-container {
        width: 100%;
        height: 100%;
        padding-top: 1rem;
        .record-title {
            display: flex;
            width: 100%;
            height: 1rem;
            line-height: 1rem;
            text-align: center;
            background: #fff;
            li {
                flex: 1;
                font-size: 16px;
                span {
                    display: block;
                    width: 60%;
                    height: 100%;
                    margin: 0 auto;
                    border-bottom: 3px solid transparent;
                    box-sizing: border-box;
                }
                .active {
                    border-bottom-color: #39b3d7;
                }
            }
        }
        .search-content {
            padding: 0 .1rem;
            margin-top: 0.2rem;
            min-height: 2rem;
            background-color: #fff;
            overflow: hidden;
            ul {
                overflow: hidden;
                li {
                    display: flex;
                    width: 100%;
                    height: 0.8rem;
                    line-height: 0.8rem;
                    text-align: center;
                    border-radius: 5px;
                    margin-top: 0.1rem;
                    border: 1px solid #ccc;
                    box-sizing: border-box;
                    overflow: hidden;
                    label {
                        width: 1.8rem;
                        height: 100%;
                        color: #fff;
                        font-weight: 700;
                        background: #1e8feb;
                    }
                    div {
                        flex: 1;
                        &.time {
                            display: flex;
                            input {
                                border: none;
                                outline: none;
                                border-right: 1px solid #ccc;
                                text-align: center;
                            }
                            select {
                                flex: 1;
                                border: none;
                                outline: none;
                                text-align: center;
                                border-right: 1px solid #ccc;
                                &:last-child {
                                    border: none;
                                }
                            }
                        }
                    }
                }
            }
            .submit{
                width: 95%;
                height: 0.8rem;
                line-height: 0.8rem;
                color: #fff;
                font-size: 16px;
                font-weight: bold;
                margin: 0.3rem auto;
                text-align: center;
                background: #1e8feb;
                border-radius: 0.1rem;
            }
        }
        .search-record {
            width: 100%;
            margin-top: 0.2rem;
            background-color: #fff;
            overflow: hidden;
            table {
                width: 100%;
                margin-top: 0.2rem;
                thead {
                    background: #c9e5fb;
                    color: #3498f6;
                    line-height: .72rem;
                }
                td, th {
                    text-align: center;
                    border: 1px solid #ddd;
                }
                .no-record {
                    text-align: center;
                    line-height: .72rem;
                }
            }
        }
    }
</style>
