<template>
    <div class="modal-template" v-show="delModalStatus">
        <div class="modal">
            <div class="modal-title" >
                删除图片
            </div>
            <div class="modal-contain">
                <p>确认删除该图片？</p>
            </div>
            <div class="modal-footer">
                <button class="disable" @click="close">取消</button>
                <button class="confirm" @click="confirm">确定</button>
            </div>
        </div>
        <div class="modal-shade"></div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    props: {
        delModalStatus: {
            type: Boolean,
            required: true,
            default: false
        },
        imgId: {
            default: ''
        }
    },
    data(){
        return {

        }
    },
    methods: {
        close(){
            this.$emit( 'closeDelModal', false )
        },
        confirm(){
            this.$emit( 'closeDelModal', false )
            this.$emit( 'confirmDelModal', {imgId: this.imgId} )
        }
    }
}
</script>

<style lang="stylus" scoped>
.modal-template
    .modal
        position fixed
        top 30%
        left 0
        right 0
        margin auto 
        width 90%
        height 172px
        background #fff
        border-radius 4px
        box-sizing border-box
        padding 10px
        z-index 10
        .modal-title, .modal-footer
            height 40px
            line-height 40px
        .modal-title
            border-bottom 1px solid #ddd
            margin-bottom 20px
        .modal-contain
            height 30px
            display flex
            overflow auto
            text-align center
            p
                line-height 30px
        .modal-footer
            border-top 1px solid #ddd
            margin-top 20px     
            button
                float right
                height 30px
                padding 0 10px
                line-height 30px
                margin-top 10px
                text-align center
                color #fff
                outline none
                border none
                border-radius 4px
                &.confirm
                    margin-right 10px
                    background #3385ff
                &.disable
                    background #f54545    
    .modal-shade
        position fixed
        background rgba( 0, 0, 0, 0.8 )
        top 0 
        right 0
        left 0
        bottom 0   
</style>
