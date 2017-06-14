<template>
  <div class="goods">
    <div class="menu-wrapper" v-el:menu-wrapper>
      <ul>
        <li v-for="item in goods" class="menu-item menu-item-hook" :class="{'current':currentIndex===$index}" @click="menuClick($index,$event)">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="goods-wrapper" v-el:good-wrapper>
      <ul>
        <li v-for="item in goods" class="food-list  food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item">
              <div class="icon">
                <img width="57px" height="57px" :src="food.icon" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span>月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="new">{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">{{food.oldPrice}}</span>
                </div>
                <div class="cart-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import shopcart from '../shopcart/shopcart';
  import cartcontrol from '../cartcontrol/cartcontrol';
  const ERROR_OK = 0;
  export default {
    props: ['seller'],
    data () {
     return {
       goods: [],
       heightList: [],
       scrollY: 0
     };
    },
    components: {
      shopcart,
      cartcontrol
    },
    created() {
      this.classMap = ['decrease', 'discount', 'invoice', 'guarantee', 'special'];
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERROR_OK) {
          this.goods = response.data;
        }
        this.$nextTick(() => {
          this._initScroll();
          this._calculateHeight();
        });
      }, (response) => {
        console.log('api get goods failed');
      });
    },
    computed: {
      currentIndex () {
         let length = this.heightList.length;
         for (let i = 0; i < length; i++) {
            var h1 = this.heightList[i];
            var h2 = this.heightList[i + 1];
            if (!h2 || (this.scrollY >= h1 && this.scrollY <= h2)) {
                return i;
            }
         }
         return 0;
      },
      selectFoods () {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              console.log(food.count);
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    methods: {
      _initScroll () {
        this.menuScroll = new BScroll(this.$els.menuWrapper, {
            click: true
        });
        this.goodScroll = new BScroll(this.$els.goodWrapper, {
          click: true,
          probeType: 3
        });
        this.goodScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight () {
        let height = 0;
        let list = this.$els.goodWrapper.getElementsByClassName('food-list-hook');
        this.heightList.push(0);
        for (let i = 0; i < list.length; i++) {
            let n = list[i];
            height += n.clientHeight;
            this.heightList.push(height);
        }
      },
      menuClick (index, event) {
        if (!event._constructed) {
         return;
        }
        let list = this.$els.goodWrapper.getElementsByClassName('food-list-hook');
        let ele = list[index];
        this.goodScroll.scrollToElement(ele, 300);
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/minxin.styl"
  .goods
    position: absolute
    top: 174px
    bottom: 46px
    display: flex
    width:100%
    overflow:hidden
    .menu-wrapper
      flex:0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display:table
        height: 54px
        width: 56px
        padding:0 12px
        line-height: 14px
        &.current
          position:relative
          z-index:10
          background:#f3f5f7
          font-weight:700
          color:red
        .text
          display:table-cell
          width:56px
          vertical-align middle
          font-size:12px
          border-1px: rgba(7, 17, 27, 0, 1)
        .icon
          display: inline-block
          width: 12px
          height: 12px
          background-size:12px 12px
          background-repeat:no-repeat
          &.decrease
            bg-image('decrease_3');
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3');
          &.invoice
            bg-image('invoice_3');
          &.special
            bg-image('special_3');
    .goods-wrapper
      flex: 1
      .title
        height:26px;
        font-size:12px;
        line-height:26px;
        color:rgb(147, 153, 159);
        background-color: #f3f5f7;
        padding-left:14px;
      .food-item
        display:flex
        margin:18px;
        padding-bottom:18px;
        border-1px(rgba(7,17,27,0.1))
        .icon
          flex:0 0 57px
          margin-right: 10px
        .content
          flex:1;
          .name
            margin:2px 0 8px 0;
            font-size: 17px;
            line-height:17px;
            color:rgb(7, 17, 27);
          .desc
            margin-bottom:8px;
            line-height:10px;
            font-size:10px;
            color:rgb(7, 17, 27);
          .extra
            font-size: 10px;
            line-height:10px;
            color:rgb(7, 17, 27);
          .price
            font-weight:700
            line-height:24px;
            .new
              margin-right:8px;
              color: rgb(240, 20, 20);
            .old
              text-decoration:line-through;
              font-size:10px;
          .cart-wrapper
            position:absolute;
            right:0;
            bottom:8px;
</style>
