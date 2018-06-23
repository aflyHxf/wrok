<template>
    <div class="UpdatePhoneNo">
        <crumbs title="更改联系电话（1）" :src="src"></crumbs>
        <div class="step">
            <ul class="pic">
                <li><i></i><span class="ok">验证身份</span></li>
                <li><i></i></li>
                <li><i></i><span>修改手机</span></li>
                <li><i></i></li>
                <li><i></i><span>修改成功</span></li>
            </ul>
        </div>

        <div class="form_box">
            <div class="item">
                <label  flex="cross:center box:first">
                    <div class="name">手机号码</div>
                    <input type="number" value="13925225485">
                </label>
            </div>

            <div class="item" flex="box:last">
                <label  flex="cross:center box:first">
                    <div class="name">短信验证</div>
                    <input type="text" placeholder="输入验证码" maxlength="4">
                </label>
                <div class="right_box">
                    <button>获取</button>
                    <p>
                        <a href="##">收不到？</a>
                    </p>
                </div>
            </div>

            <div class="btn">下一步</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "UpdatePhoneNo",
    data() {
        return {
            src: require('../../assets/icons/icon-phone2.png')
        }
    }
}
</script>

<style scoped lang="scss">
    .UpdatePhoneNo {
        .step {
            .pic {
                width: 100%;
                height: 3rem;
                padding: 0.4rem;
                display: flex;
                flex-direction: row;
                li{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    span{
                        font-size: 0.32rem;
                        color: #999a9b;
                        font-weight: bold;
                        margin-top: 0.1rem;
                    }
                    span.ok{
                        color: #4c4c4c;
                    }
                }
                li:nth-child(odd) {
                    flex: 7;
                    i {
                        display: inline-block;
                        width: 1.4rem;
                        height: 1.4rem;
                    }
                }
                li:nth-child(even) {
                    flex: 4;
                    position: relative;
                    i {
                        display: inline-block;
                        width: 0.8rem;
                        height: 0.12rem;
                        position: absolute;
                        left: 0;
                        top: 0.7rem;
                        right: 0;
                        margin: auto;
                        background: #999a9b;
                    }
                }
                li:nth-child(1) {
                    i {
                        background: url("../../assets/icons/icon-step01-done.png") no-repeat;
                        background-size: 100% 100%;
                    }
                }
                li:nth-child(3) {
                    i {
                        background: url("../../assets/icons/icon-step02_b.png") no-repeat;
                        background-size: 100% 100%;
                    }
                }
                li:nth-child(5) {
                    i {
                        background: url("../../assets/icons/icon-success_b.png") no-repeat;
                        background-size: 100% 100%;
                    }
                }
            }
        }
    }
</style>
