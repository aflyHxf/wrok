import Vue from 'vue'
import Router from 'vue-router'


//首页
const Home = () => import('pages/home/Home')
//优惠活动
const Activity = () => import('pages/activity/Activity')
//充值
const Recharge = () => import('pages/recharge/recharge')
//账号
const Account = ()=> import('pages/account/Account')
//账号中心
const AccountInfo = () => import('pages/account/AccountInfo')
//用户信息
const UserInfo = () => import('pages/account/userInfo')
//修改密码
const ChangePwd = () => import('pages/account/changePwd')
//短信设置
const SetSMSNotice = () => import('pages/account/setSMSNotice')
//记录查询
const RecordSearch = () => import('pages/account/RecordSearch')
//最新消息
const News = () => import('pages/account/news')
//站内信
const Inbox = () => import('pages/account/inbox')
//登录
const Login = () => import('pages/login/Login')
//注册
const Register = () => import('pages/register/Register')



const Lobby = r => require.ensure([], () => r(require('@/pages/lobby/Lobby')), 'home')

const Withdraw = r => require.ensure([], () => r(require('@/pages/withdraw/Withdraw')), 'home')
// 官网最新写法 同上

const OnlineRecharge = () => import('@/pages/recharge/onlineRecharge')
const SubmitDeposit = () => import('@/pages/recharge/submitDeposit')
const CardRecharge = () => import('@/pages/recharge/cardRecharge')


const UpdatePhoneNo = () => import('@/pages/account/UpdatePhoneNo')
const GameTransfer = () => import('@/pages/account/GameTransfer')

const ModifyPassword = () => import('@/pages/account/ModifyPassword')
const WashCodePreferential = () => import('@/pages/account/WashCodePreferential')

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/home',
            component: Home
        },
        {
            path: '/activity',
            component: Activity
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/account',
            component: Account,
        },
        //账户中心
        {
            path: '/accountInfo',
            component: AccountInfo
        },
         //用户信息
        {
            path: '/userInfo',
            component: UserInfo
        },
         //修改密码
        {
            path: '/changePwd',
            component: ChangePwd
        },
         //短息设置
        {
            path: '/setSMSNotice',
            component: SetSMSNotice
        },
        //记录查询
        {
            path: '/recordSearch',
            component: RecordSearch
        },
        //最新消息
        {
            path: '/news',
            component: News
        },
        //站内信
        {
            path: '/inbox',
            component: Inbox
        },
        // {
        //     path: '/account/updatePhoneNo',
        //     component: UpdatePhoneNo
        // },
        // {
        //     path: '/account/gameTransfer',
        //     component: GameTransfer
        // },
        // {
        //     path: '/account/modifyPassword',
        //     component: ModifyPassword
        // },
        // {
        //     path: '/account/WashCodePreferential',
        //     component: WashCodePreferential
        // },
        // {
        //     path: '/lobby',
        //     component: Lobby
        // },
        // {
        //     path: '/recharge',
        //     component: Recharge
        // },
        // {
        //     path: '/recharge/onlineRecharge',
        //     component: OnlineRecharge
        // },
        // {
        //     path: '/recharge/submitDeposit',
        //     component: SubmitDeposit
        // },
        // {
        //     path: '/recharge/cardRecharge',
        //     component: CardRecharge
        // },
        // {
        //     path: '/withdraw',
        //     component: Withdraw
        // },
    ]
})
