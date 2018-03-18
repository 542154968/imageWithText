<template>
    <div class="list">
        <ul ref="ul" v-if="list.length > 0">
            <li v-for="(item, index) in list" :class="item.type" :key="index">
                <p v-if="item.type === 'text'" @click="editPText( item.value, item.id )">{{item.value}}</p>
                <img v-else :src="item.value" alt="" @click="showDelModal( item.id )">
            </li>
        </ul>
        <div class="null" v-else>
            快添加文字或照片吧
        </div>
        <div class="helper"></div>
        <div class="fixed-nav">
            <button @click="addText">添加文字</button>
            <button @click="addImg">添加照片</button>
            <input type="file" class="file" ref="input" @change="getFile( $event )" >
            <button @click="clearAll">清除全部</button>
            <button @click="getImage">{{btnText}}</button>
        </div>
        <v-modal :modalStatus="openModal" :editText="currentModalText" :textId='currentModalTextId' @closeModal="close" @confirmModal="getText" ></v-modal>
        <v-delModal :delModalStatus="openDelModal" :imgId='currentImgId' @closeDelModal="closeDel" @confirmDelModal="delImg"></v-delModal>
    </div>
</template>

<script>
/* eslint-disable */
import html2canvas from 'html2canvas'
import modal from '../modal/index'
import delModal from '../delModal/index'
import $Bus from '../../assets/js/bus'

export default {
    components: {
        'v-modal': modal,
        'v-delModal': delModal
    },
    mounted(){
        if( Array.isArray( $Bus.list ) && $Bus.list.length > 0 ){
            try {
                let list = $Bus.list;
                this.getIdAndSet( list );
                this.list = list;
            } catch (error) {
               this.list = [];
            }
        }else {
            this.list = [];
        };
        $Bus.btnStatus = false;
    },
    data (){
        return {
            openModal: false,
            openDelModal: false,
            imgReg: /\.(png|jpe?g|gif|svg)(\?.*)?$/i,
            textId: 0,
            imgId: 0,
            list: [],
            currentModalText: '',
            currentModalTextId: '',
            currentImgId: '',
            btnStatus: $Bus.btnStatus,
            btnText: $Bus.btnStatus ? '生成中...' : '生成图片'
        }
    },
    methods: {
        // 根据本地存储设置ID初始值
        getIdAndSet( arr ){
            let imgArr = arr.filter( ( v, k )=>{
                return v.type === 'img'
            } );
            let textArr = arr.filter( (v, k)=>{
                return v.type === 'text'
            } );
            textArr.length > 0 && ( this.textId = textArr[ textArr.length - 1 ].id );
            imgArr.length > 0 && ( this.imgId = imgArr[ imgArr.length - 1 ].id );
        },
        getImage(){
            if( this.list.length <= 0 ){ 
                alert('请先添加图片或文字！')
                return false 
            };
            if( $Bus.btnStatus === true ){ return false; }
            window.scrollTo(0, 0)
            let _this = this;
            $Bus.btnStatus = true;
            html2canvas( this.$refs.ul ).then(function(canvas) {
                _this.setStore();
                $Bus.htmlCanvas = canvas.toDataURL('image/jpeg');
                _this.$router.push( { name: 'render'} )
            });
        },
        addText(){
            this.openModal = true;
        },
        close(){
            this.openModal = false;
            this.currentModalText = '';
            this.currentModalTextId = '';
        },
        getText( data ){
            if( data.textId === '' ){
                this.list.push( { type: 'text', value: data.text, id: this.textId++} )
            }else{
                let item = this.list.find( ( v, k )=>{
                                return v.type=='text' && v.id == data.textId
                            }),
                    index = this.list.indexOf( item );
                if( data.text === '' ){
                    this.list.splice( index, 1 );
                    return;
                }      
                this.list[index].value = data.text;        
            }
            this.setStore()
        },
        // 触发input file
        addImg(){
            this.$refs.input.value = '';
            this.$refs.input.click()
        },
        // 获取选择的图片
        getFile( event ){
            let files = event.target.files,
                l = files.length,
                _this = this;
            for( let i = 0; i < l; i++ ){
                if( this.imgReg.test( files[i].name ) ){
                    let reader = new FileReader();
                    reader.readAsDataURL(files[i]);
                    reader.onload = function (e) {
                        _this.list.push( { type: 'img', value: this.result, id: _this.imgId++ } );
                        reader = null;
                    }
                }  
            }  
            this.setStore()
        },
        editPText( text, id ){
            this.openModal = true;
            this.currentModalText = text;
            this.currentModalTextId = id;
        },
        showDelModal( id ){
            this.currentImgId = id; 
            this.openDelModal = true;
        },
        closeDel(){
            this.openDelModal = false;
        },
        delImg( data ){
            let item = this.list.find( ( v, k )=>{
                            return v.type === 'img' && v.id == data.imgId
                        }),
                index = this.list.indexOf( item );
            this.list.splice( index, 1 );    
        },
        setStore(){
            $Bus.list = this.list
        },
        clearAll(){
            this.list = [];
            $Bus.list = [];
            $Bus.htmlCanvas = '';
        }
    }
}
</script>

<style lang="stylus">
.list
    width 100%
    li
        margin 0 auto
        padding 0 0 15px
        &:last-child
            padding-bottom 0
    .text
        width 100%
        text-align center
        p
            line-height 24px
            font-size 16px
    img
        width 100%
    .helper
        height 45px    
    .fixed-nav
        position fixed
        bottom 0
        left 0
        right 0
        height 40px
        line-height 40px
        display flex
        box-shadow 0 0 2px #ddd
        button
            flex 1
            margin 0
            padding 0
            border none
            background #fff
            border-right 1px solid #ddd
            outline none
            transition background 1s, color 1s
            &:last-child
                border-right none
            &:active
                background #3385ff
                color #fff 
        .file
            display none    

    .null
        text-align center 
        color #3385ff
        font-size 16px
        font-weight bold
        margin-top 30%               
</style>
