<template>
  <div class="ratings" ref="ratings">
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
            <star class="star" :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{ seller.serviceScore }}</span>
          </div>
          <div class="score-wrapper">
            <div class="title">商品评分</div>
            <star class="star" :size="36" :score="seller.foodScore"></star>
            <span class="score">{{ seller.foodScore }}</span>
          </div>
          <div class="time-wrapper">
            <span class="title">送达时间</span>
            <span class="time">{{ seller.deliveryTime }}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <rating :ratings="ratings" ref="rating"></rating>
      <div class="ratings-wrapper">
        <ul>
          <li v-for="(rating,index) in ratings" :key="index" class="rating-item" v-show="needShow(rating)">
            <img class="avatar" width="28px" height="28px" :src="rating.avatar">
            <div class="rating-content">
              <div class="username">{{ rating.username }}</div>
              <star class="star" :size="24" :score="rating.score"></star>
              <span class="time" v-show="rating.deliveryTime">{{ rating.deliveryTime }}分钟送达</span>
              <p class="text" v-show="rating.text">{{ rating.text }}</p>
              <div class="recommend">
                <i
                  :class="{'icon-thumb_up': rating.rateType === 0,'icon-thumb_down': rating.rateType === 1}"></i>
                <span v-for="(item,index) in rating.recommend" :key="index" class="recommend-item">{{ item }}</span>
              </div>
              <div class="rate-time">{{ rating.rateTime | formatDate}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import rating from 'components/rating/rating.vue'
  import split from 'components/split/split.vue'
  import star from 'components/star/star.vue'
  import {formatDate} from '../../common/js/date.js'

  const ALL = 2
  export default {
    components: {
      split,
      star,
      rating
    },
    created () {
      this.$ajax.get('/api/ratings').then((response) => {
        const ERR_OK = 0
        response = response.data
        if (response.errno === ERR_OK) {
          this.ratings = response.data
          this.$nextTick(() => {
            this.initScroll()
            console.log(this.scroll)
          })
        }
      })
    },
    data () {
      return {
        ratings: []
      }
    },
    filters: {
      formatDate: function (time) {
        let date = new Date(time)
        let result = formatDate(date, 'yyyy-MM-dd hh:mm')
        return result
      }
    },
    methods: {
      initScroll: function () {
        this.scroll = new BScroll(this.$refs.ratings, {
          click: true
        })
      },
      needShow: function (rating) {
        let ratingSelector = this.$refs.rating
        if (ratingSelector.onlyContent) {
          if (rating.text.length <= 0) {
            return false
          }
        }
        if (ratingSelector.selectedType !== ALL && ratingSelector.selectedType !== rating.rateType) {
          return false
        }
        return true
      }
    },
    props: {
      seller: {
        type: Object
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../common/stylus/mixin.styl"
  .ratings
    position: absolute
    top: 179px
    left: 0
    width: 100%
    height: 100%
    font-size: 0
    overflow: hidden
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
        margin: 18px 0
        padding: 6px 0 6px 20px
        .title
          display: inline-block
          vertical-align: top
          margin-right: 12px
          font-size: 12px
          line-height: 18px
          color: rgb(7, 17, 27)
        .score-wrapper
          margin-bottom: 8px
          .star
            display: inline-block
            vertical-align: top
            margin-right: 4px
          .score
            font-size: 12px
            line-height: 18px
            color: rgb(255, 153, 0)
        .time-wrapper
          .time
            font-size: 12px
            color: rgb(147, 153, 159)
            line-height: 18px
    .ratings-wrapper
      .rating-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        .avatar
          flex: 0 0 28px
          width: 28px
          height: 28px
          margin-right: 12px
          border-radius: 50%
        .rating-content
          flex: 1
          position: relative
          font-size: 10px
          color: rgb(7, 17, 27)
          line-height: 12px
          .username
            margin-bottom: 4px
          .star
            display: inline-block
            vertical-align: top
          .time
            color: rgb(147, 153, 159)
          .text
            margin-bottom: 8px
            font-size: 12px
            line-height: 18px
          .icon-thumb_up, .icon-thumb_down
            font-size: 12px
            color: rgb(0, 160, 220)
          .recommend
            .recommend-item
              display: inline-block
              margin: 4px
              padding: 0 6px
              border: 1px solid rgba(7, 17, 27, 0.1)
              border-radius: 2px
              color: rgb(147, 153, 159)
              font-size: 9px
              line-height: 16px
          .rate-time
            position: absolute
            right: 0
            top: 0
</style>
