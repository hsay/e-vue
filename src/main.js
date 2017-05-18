import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from 'components/goods/goods';
import rating from 'components/rating/rating';
import seller from 'components/seller/seller';
import 'common/stylus/index.styl';
// 这里不使用./components也可以找到组件，是因为在webpack.base.config中的配置'components': path.resolve(__dirname, '../src/components')
Vue.use(VueRouter);
Vue.use(VueResource);
// 以上只是得到了某个对象或者函数，但是并没有得到任何的执行
// hello;
// new之后一般是赋值给某个变量，但是这里不需要将其赋值给变量
// 为了逃过eslint的检测会加上下面的注释
/* eslint-disable no-new */
// new Vue({
//   el: 'body',
//   components: {App}
// });

var router = new VueRouter({
  linkActiveClass: 'active'
});
let app = Vue.extend(App);

router.map({
  '/goods': {
    component: goods
  },
  '/rating': {
    component: rating
  },
  '/seller': {
    component: seller
  }
});
router.start(app, '#app');
router.go('/goods');
