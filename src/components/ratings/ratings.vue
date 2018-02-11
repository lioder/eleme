<template>
  <div class="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <div class="total-score">{{ seller.score }}</div>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{ seller.rankRate }}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <div class="title">服务态度</div>
            <star class="star" :size="24" :score="seller.serviceScore"></star>
          </div>
          <div class="score-wrapper">
            <div class="title">商品评分</div>
          </div>
          <div class="title">送达时间</div>
        </div>
      </div>
      <split></split>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import split from 'components/split/split.vue'
  import star from 'components/star/star.vue'

  export default {
    components: {
      split,
      star
    },
    props: {
      seller: {
        type: Object
      }
    }
  }
</script>

<style lang="stylus">
  .ratings
    position: absolute
    top: 179px
    left: 0
    bottom: 46px
    width: 100%
    .overview
      display: flex
      .overview-left
        flex: 0 0 137px
        width: 137px
        margin: 18px 0
        padding: 6px 0
        text-align: center
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        .total-score
          margin-bottom: 6px
          font-size: 24px
          line-height: 28px
          color: rgb(255, 153, 0)
        .title
          margin-bottom: 8px
          font-size: 12px
          line-height: 12px
          color: rgb(7, 17, 27)
        .rank
          font-size: 10px
          line-height: 10px
          color: rgb(147, 153, 159)
      .overview-right
        flex: 1
        margin: 18px 24px
        .title
          display: inline-block
          font-size: 12px
          line-height: 18px
          color: rgb(7, 17, 27)
        .star
          display: inline-block
</style>
