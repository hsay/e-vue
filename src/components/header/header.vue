<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64px" height="64px"  :src="seller.avatar" alt="avatar"/>
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <!--这里使用v-if的原因是什么？-->
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span  class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="" width="100%" height="100%"/>
    </div>
    <div class="detail" v-if="detailShow" transition="fade">
      <div class="detail-wrapper clearfix">
        <!--这里还是底部定高度的设计思路 detail-wrapper的高度占满屏幕通过padding-bottom值占出底部空间，底部通过定位显示在该空间-->
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <v-star :score="4.6" :size="48"></v-star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul class="supports" v-if="seller.supports">
            <li class="support-item" v-for="item in seller.supports">
              <span class="icon"  :class="classMap[seller.supports[$index].type]""></span>
              <span class="text">{{seller.supports[$index].description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <p class="bulletin">{{seller.bulletin}}</p>
        </div>
      </div>
      <div class="detail-close"  @click="hideDetail">
        <i class="icon-close"></i>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import star from '../star/star.vue';
  export default{ // 返回的是一个对象，所以里面每一项都是以,区分。data 和 el必须是函数的形式。
    props: {
        seller: {
            type: Object
        }
    },
    components: {
        'v-star': star
    },
    data() {
        return {
          detailShow: false
        };
    },
    methods: {
        showDetail() {
            this.detailShow = true;
        },
        hideDetail() {
          this.detailShow = false;
        }
    },
    created() {
        this.classMap = ['decrease', 'discount', 'invoice', 'guarantee', 'special'];
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/minxin.styl"

  .header
    position:relative
    color: #fff
    background-color: rgba(7,17,27,0.5)
    .content-wrapper
      position:relative
      padding: 24px 12px 18px 24px
      font-size: 0
      .avatar
        display: inline-block
        vertical-align top
        img
          border-radius: 2px
      .content
        display inline-block
        font-size: 14px
        margin-left:16px
        .title
          margin: 2px 0 4px 0
          .brand
            display:inline-block
            vertical-align middle
            width: 30px
            height: 18px
            background-size: 30px 18px
            background-repeat no-repeat
            bg-image("brand")
          .name
            margin-left: 6px
            font-size: 16px
            line-height: 16px
            font-weight: bold

        .description
          margin-bottom: 10px
          font-size: 12px
          font-weight: 200
        .support
          margin-bottom: 2px
          .icon
            display: inline-block
            width: 12px
            height: 12px
            background-size:12px 12px
            background-repeat:no-repeat
            &.decrease
              bg-image('decrease_1');
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1');
            &.invoice
              bg-image('invoice_1');
            &.special
              bg-image('special_1');
      .support-count
        position:absolute
        right:12px
        bottom:18px
        height:24px
        line-height: 24px
        border-radius 14px
        /*font-size:10px*/
        padding: 0 8px
        text-align:center
        background-color:rgba(0,0,0,0.2)
        .count
          vertical-align:top
          font-size:10px
        .icon-keyboard_arrow_right
          margin-left:2px
          font-size: 10px
          line-height:24px



    .bulletin-wrapper
      position relative
      height: 28px
      padding: 0 22px 0 12px
      white-space nowrap
      overflow: hidden
      text-overflow ellipsis
      background-color: rgba(7,17,27,0.2)
      .bulletin-title
        display:inline-block
        width: 22px
        height: 12px
        bg-image('bulletin')
        background-size:22px 12px
        background-repeat no-repeat
        vertical-align top
        margin-top:8px
       .bulletin-text
         margin-left:4px
         margin-right:4px
         font-size: 10px
         line-height:28px
         vertical-align middle
        .icon-keyboard_arrow_right
          position:absolute
          font-size: 10px
          top:9px
          right:8px

    .background
      position:absolute
      top:0
      left:0
      width:100%
      height:100%
      z-index: -1
      filter:blur(10)

    .detail
      position:fixed
      top:0
      left:0
      width:100%
      height:100%
      z-index:100
      background-color:rgba(7,17,27,0.8)
      overflow auto
      transition: all 500ms
      &.fade-transition
        opacity: 1
        background-color:rgba(7,17,27,0.8)
      &.fade-enter,
      &.fade-leave
        opacity: 0;
        background-color:rgba(7,17,27,0)
    .detail-wrapper
      min-height:100%
      .detail-main
        margin-top: 64px
        padding-bottom: 64px
        .name
          text-align:center
        .star-wrapper
          text-align:center
          margin:16px 0 0 0
        .title
          display:flex
          width:80%
          margin:28px auto
          .line
            flex:1
            position:relative
            top: -6px
            border-bottom 1px solid rgba(255,255,255,0.2)
          .text
            padding: 0 12px
            font-size:14px
            font-weight 700
        .supports
          width:80%
          margin:0px auto
          .support-item
            padding: 0 12px
            margin-bottom:12px
            &:last-child
              margin-bottom:0
            .icon
              display:inline-block
              width: 16px
              height: 16px
              vertical-align:top
              background-size:16px 16px
              background-repeat:no-repeat
              &.decrease
                bg-image('decrease_2');
              &.discount
                bg-image('discount_2')
              &.guarantee
                bg-image('guarantee_2');
              &.invoice
                bg-image('invoice_2');
              &.special
                bg-image('special_2');
        .bulletin
          width:70%
          margin:0 auto
          padding:0 12px
          font-size: 12px
          font-weight:200
          line-height:24px
    .detail-close
        position:relative
        margin:-64px auto 0 auto
        width: 32px
        height: 32px
        clear: both
</style>
