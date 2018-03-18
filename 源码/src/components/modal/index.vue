<template>
    <div class="modal-template" v-show="modalStatus">
        <div class="modal">
            <div class="modal-title" v-if="textId === ''">
                添加文字
            </div>
            <div class="modal-title" v-else>
                编辑文字
            </div>
            <div class="modal-contain">
                <textarea name="" v-model="textarea"></textarea>
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
        modalStatus: {
            type: Boolean,
            required: true,
            default: false
        },
        editText: {
            type: String,
            default: ''
        },
        textId: {
            default: ''
        }
    },
    data(){
        return {
            textarea: ''
        }
    },
    watch: {
        editText( curVal, oldVal ){
            this.textarea = curVal
        }
    },
    methods: {
        close(){
            this.$emit( 'closeModal', false )
        },
        confirm(){
            this.$emit( 'closeModal', false )
            this.$emit( 'confirmModal', {text: this.textarea, textId: this.textId} )
            this.textarea = ''
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
        height 300px
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
            height 158px
            display flex
            overflow auto
            textarea
                flex 1
                outline none
                padding 10px
                font-size 16px
                border-radius 4px
                &:focus
                    border-color #3385ff
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
