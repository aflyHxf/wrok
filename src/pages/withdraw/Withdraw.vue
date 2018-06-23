<template>
    <div class="widthDraw">
        <crumbs  title="提款" :src="src" :noBack="noB"></crumbs>

        <div class="form_box">
            <div class="item disable">
                <label  flex="cross:center box:first">
                    <div class="name">可提款额度</div>
                    <input type="number" readonly>
                </label>
            </div>

            <div class="item">
                <label  flex="cross:center box:first">
                    <div class="name">提款金额</div>
                    <input type="number" placeholder="请输入提款金额100-20万">
                </label>
            </div>

            <div class="btn disable">确认提款</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'widthDraw',
    data () {
        return {
            src:require('../../assets/icons/icon-record1.png'),
            noB:true
        }
    }
}
</script>
<style scoped lang="scss">

</style>
