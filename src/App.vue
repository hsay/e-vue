<template>
  <div>
    <!--这里使用动态probs传参数，不能用seller="seller"的形式-->
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <a v-link="{path:'/goods'}">商品</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/rating'}">评论</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/seller'}">商家</a>
      </div>
    </div>
    <div class="content">
      <router-view :seller="seller"></router-view>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  // 什么是组件，组件就是自定义元素   元素名+如何渲染
  // 组件名在用component方法注册时定义
  // 如何渲染在组件构造器中定义，即Vue.extend()定义的构造器。
  import header from './components/header/header.vue';
  const ERR_0K = 0;
  export default {
    data() {
        return {
            seller: { }
        };
    },
    created() { // 组件生命周期函数
      this.$http.get('/api/seller').then((response) => {
       response = response.body;
        if (response.errno === ERR_0K) {
          this.seller = response.data;
        }
        console.log(response.body);
      });
    },
      components: {
        'v-header': header
      }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/minxin.styl"

  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    border-1px(rgba(0,0,0,1))
    .tab-item
      flex: 1
      text-align: center
      vertical-align: middle
      a
        display: block
        font-size: 24px
        font-weight: 200px
        line-height: 40px
        color: rgb(147,153,159)
      .active
        color: rgb(240,20,20)

</style>
