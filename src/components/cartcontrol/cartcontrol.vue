<template>
  <div class="cartcontrol" >
    <div class="cart-decrease " transition="move" v-show="food.count>0" @click="decreseCart">
      <span class="inner icon-remove_circle_outline"></span>
    </div>
      <div class="cart-count" v-show="food.count>0">
        {{food.count}}
      </div>
      <div class="cart-add icon-add_circle" @click="addCart">
      </div>
  </div>

</template>
<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart (event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
      },
      decreseCart (event) {
        if (!event._constructed) {
          return;
        }
        this.food.count--;
      }
    }
  };
</script>
<style lang="less" rel="stylesheet/less">
  .cartcontrol{
    font-size:0;
    color:rgb(0,160,220);
    .cart-decrease{
      display:inline-block;
      padding:6px;
      transition: all 0.4s linear;
      &.move-transition{
        opacity: 1;
        transform:translate3D(0,0,0);
        .inner{
          display: inline-block;
          font-size:24px;
          line-height: 24px;
          transition: all 0.4s linear;
          transform:rotate(0);
        }
      }
      &.move-enter,
      &.move-leave{
        opacity: 0;
        transform:translate3d(24px,0,0);
        .inner{
          transform:rotate(180deg);
        }
      }
    }
    .cart-count{
      display:inline-block;
      font-size:20px;
      padding:6px;
      width:24px;
      text-align: center;
      vertical-align: top;
      line-height: 24px;
      color:rgb(147,153,159);
    }
    .cart-add{
      display:inline-block;
      padding:6px;
      font-size:24px;
      line-height: 24px;
    }
  }
</style>
