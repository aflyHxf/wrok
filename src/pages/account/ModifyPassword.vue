<template>
    <div class="modifyPassword">
        <crumbs  title="修改密码" :src="src"></crumbs>
        <div class="form_box">
            <div class="item">
                <label   flex="cross:center box:first">
                    <div class="name">旧密码</div>
                    <input type="password" placeholder="请输入您的旧密码">
                </label>
            </div>

            <div class="item">
                <label   flex="cross:center box:first">
                    <div class="name">新密码</div>
                    <input type="password" placeholder="请输入您的新密码">
                </label>
            </div>

            <div class="item">
                <label   flex="cross:center box:first">
                    <div class="name">确认新密码</div>
                    <input type="password" placeholder="请确认您的新密码">
                </label>
            </div>

            <div class="btn">提交</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "modifyPassword",
    data(){
        return{
            src:require('../../assets/icons/icon-acc3.png')
        }
    }
}
</script>

<style scoped>

</style>
