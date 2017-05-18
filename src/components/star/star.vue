<template>
  <div class="star" :class="starType">
    <span v-for="item in itemClass" :class="item" track-by="$index"></span>
  </div>
</template>
<script type="text/ecmascript-6">
  const STAR_LEN = 5;
  export default {
      props: {
        size: {
          type: Number
        },
        score: {
            type: Number
        }
      },
      computed: {
        starType: function() {
            return 'star' + this.size;
        },
        itemClass: function() {
           let result = [];
           let score = Math.floor(this.score * 2) / 2;
           let hasDecimal = score % 1 !== 0;
           let integer = Math.floor(score);
           for (let i = 0; i < integer; i++) {
               result.push(this.starType + '_on');
           }
           if (hasDecimal) {
             result.push(this.starType + '_half');
           }
           for (let j = result.length; j < STAR_LEN; j++) {
             result.push(this.starType + '_off');
           }
           console.log(this);
           return result;
          // 根据score值获得itemClass数组
        }
      }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/minxin.styl"
  .star
    span
      display:inline-block
  .star24
    span
      width: 24px
      height: 24px
      background-size:24px 24px
      background-repeat:no-repeat
    .star24_on
      bg-image('star24_on')
    .star24_off
      bg-image('star24_off')
    .star24_half
      bg-image('star24_half')
  .star36
    span
      width: 36px
      height: 36px
      background-size:36px 36px
      background-repeat:no-repeat
    .star36_on
      bg-image('star36_on')
    .star36_off
      bg-image('star36_off')
    .star36_half
      bg-image('star36_half')
  .star48
    span
      width: 48px
      height: 48px
      background-size:36px 36px
      background-repeat:no-repeat
    .star48_on
      bg-image('star48_on')
    .star48_off
      bg-image('star48_off')
    .star48_half
      bg-image('star48_half')
</style>
