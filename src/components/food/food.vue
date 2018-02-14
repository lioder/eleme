<template>
  <div class="food-detail" ref="foodDetail">
    <div>
      <div class="image-header">
        <img :src="food.image">
        <div class="back" @click="back">
          <i class="icon-arrow_lift"></i>
        </div>
      </div>
      <div class="content">
        <div class="food-name">
          <h1>{{ food.name }}</h1>
        </div>
        <div class="food-sail">
          <span class="sail-count">月售 {{ food.sellCount }} 份</span><span>好评率 {{ food.rating }}%</span>
        </div>
        <div class="price">
          <span class="new-price">￥{{ food.price }}</span>
          <span class="old-price" v-if="food.oldPrice">￥{{ food.oldPrice }}</span>
        </div>
        <div class="cart-control-wrapper">
          <cartcontrol :food="food" @add="addFood"></cartcontrol>
        </div>
        <div class="add-button" @click.stop.prevent="addFirst" v-show="!food.count || food.count === 0">加入购物车</div>
      </div>
      <split v-if="food.info"></split>
      <div class="introduction" v-if="food.info">
        <div class="title">商品介绍</div>
        <div class="text">{{ food.info }}</div>
      </div>
      <split></split>
      <div class="food-rating">
        <div class="title">商品评价</div>
        <rating-selector @content="toggleContent" @type="toggleType" ref="rating-selector" :selectedType="selectedType" :onlyContent="onlyContent"></rating-selector>
        <div class="rating-wrapper">
          <ul>
            <li class="rating-item" v-for="(rating,index) in food.ratings" :key="index" v-show="needShow(rating)">
              <div class="user">
                <span class="username">{{ rating.username }}</span>
                <img class="avatar" width="12px" height="12px" :src="rating.avatar">
              </div>
              <div class="rate-time">{{ rating.rateTime | formatDate}}</div>
              <div class="text"><i
                :class="{'icon-thumb_up': rating.rateType === 0,'icon-thumb_down': rating.rateType === 1}"></i>{{ rating.text
                }}
              </div>
            </li>
          </ul>
        </div>
        <div class="no-rating" v-show="!food.ratings || food.ratings.length === 0">暂无评价</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import cartcontrol from 'components/cart-control/cart-control.vue'
  import ratingSelector from 'components/rating-selector/rating-selector.vue'
  import split from 'components/split/split.vue'
  import Vue from 'vue'
  import BScroll from 'better-scroll'
  import { formatDate } from '../../common/js/date.js'

  const ALL = 2
  export default {
    props: {
      food: {
        type: Object
      }
    },
    components: {
      cartcontrol,
      ratingSelector,
      split
    },
    data () {
      return {
        selectedType: ALL,
        onlyContent: false
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
      back: function () {
        this.$emit('back')
      },
      initScroll: function () {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.foodDetail, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      },
      addFirst: function (event) {
        if (!event._constructed) {
          return
        }
        this.$emit('add', event.target)
        Vue.set(this.food, 'count', 1)
      },
      addFood: function (target) {
        this.$emit('add', target)
      },
      needShow: function (rating) {
        if (this.onlyContent) {
          if (rating.text.length <= 0) {
            return false
          }
        }
        if (this.selectedType !== ALL && this.selectedType !== rating.rateType) {
          return false
        }
        return true
      },
      toggleContent: function () {
        this.onlyContent = !this.onlyContent
        console.log(this.onlyContent)
      },
      toggleType: function (type) {
        this.selectedType = type
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../common/stylus/mixin.styl"
  .food-detail
    position: fixed
    left: 0
    top: 0
    bottom: 46px
    z-index: 10
    width: 100%
    background-color: #fff
    overflow: hidden
    .image-header
      position: relative
      width: 100%
      height: 0
      padding-top: 100%
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
      .back
        position: absolute
        top: 12px
        left: 12px
        width: 15px
        height: 15px
        padding: 6px
        border-radius: 50%
        background: rgba(7, 17, 27, 0.5)
        text-align: center
        .icon-arrow_lift
          font-size: 12px
          color: #fff

    .content
      position: relative
      margin: 18px
      .food-name
        margin-bottom: 8px
        color: rgb(7, 17, 27)
        line-height: 14px
        font-size: 14px
        font-weight: 700
      .food-sail
        margin-bottom: 18px
        color: rgb(147, 153, 159)
        font-size: 10px
        line-height: 20px
        .sail-count
          margin-right: 12px
      .price
        .new-price
          font-size: 14px
          font-weight: 700
          line-height: 24px
          color: rgb(240, 20, 20)
        .old-price
          font-size: 10px
          line-height: 24px
          color: rgb(147, 153, 159)
          text-decoration: line-through
      .cart-control-wrapper, .add-button
        position: absolute
        right: 0
        bottom: 0
      .add-button
        padding: 0 12px
        width: 148
        height: 26px
        border-radius: 36px;
        font-size: 10px
        color: #fff
        line-height: 26px
        background-color: rgb(0, 160, 220)
    .introduction
      margin: 18px
      .title
        font-size: 14px
        color: rgb(7, 17, 27)
      .text
        padding: 6px 0px
        line-height: 24px
        font-size: 12px
        color: rgb(77, 85, 93)
    .food-rating
      .title
        padding: 18px 0 0 18px
        font-size: 14px
        color: rgb(7, 17, 27)
      .rating-wrapper
        margin: 0 18px
        .rating-item
          padding: 16px 0
          position: relative
          border-1px(rgba(7, 17, 27, 0.1))
          .user
            position: absolute
            top: 16px
            right: 0
            .username
              font-size: 12px
              color: rgb(147, 153, 159)
              line-height: 12px
            .avatar
              vertical-align: top
              margin-left: 6px
              border-radius: 50%
          .rate-time
            margin-bottom: 6px
            font-size: 10px
            line-height: 12px
            color: rgb(147, 153, 159)
          .text
            font-size: 12px
            line-height: 16px
            .icon-thumb_up, .icon-thumb_down
              line-height: 24px
              font-size: 12px
              color: rgb(147, 153, 159)
              margin-right: 4px
            .icon-thumb_down
              color: rgb(0, 160, 220)
        .no-rating
          height: 36px
          margin: 12px 0
          font-size: 12px
</style>
