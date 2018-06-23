<template>
    <div class="loading" @touchmove.prevent='1'>
        <div class="backg"></div>
        <div class="load-centent" flex="main:center cross:center">
            <div class="loader loader-4">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'loading',
}
</script>
