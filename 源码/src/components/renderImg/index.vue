<template>
    <div class="renderImg">
        <div class="back" @click="back"> 《 返回</div>
        <img :src="imgSrc" alt="">
    </div>
</template>

<script>
/* eslint-disable */
import $Bus from '../../assets/js/bus'
export default {
    mounted(){
        $Bus.btnStatus = false;
        this.renderImg();
    },
    data(){
        return {
            imgSrc: ''
        }
    },
    methods: {
        renderImg(){
            let img = $Bus.htmlCanvas;
            if( typeof img === 'string' && img.length > 0 ){
                this.imgSrc = img
            } else {
                this.$router.push('/')
            }
        },
        back(){
            this.$router.push('/')
        }
    }
}
</script>

<style lang="stylus">
.renderImg
    width 100%
    .back
        box-sizing border-box
        width 100%
        height 40px
        line-height 40px
        text-align left
        padding 0 10px
        background #3385ff
        color: #fff
    img
        width 100%
</style>

