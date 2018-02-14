<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <div class="overview-header">
          <h1 class="name">{{ seller.name }}</h1>
          <div class="desc">
            <star class="star" :size="36" :score="seller.score"></star>
            <span class="rating-count">({{ seller.ratingCount }})</span>
            <span class="sell-count">月售{{ seller.sellCount }}单</span>
          </div>
          <div class="favorite" @click="toggleFavorite">
            <i class="icon-favorite" :class="{'active': favorite}"></i>
            <div class="text">{{ favoriteText }}</div>
          </div>
        </div>
        <div class="overview-info">
          <div class="block">
            <h1 class="title">起送价</h1>
            <div class="text">{{ seller.minPrice }}<span class="unit">元</span></div>
          </div>
          <div class="block">
            <h1 class="title">商家配送</h1>
            <div class="text">{{ seller.deliveryPrice }}<span class="unit">元</span></div>
          </div>
          <div class="block">
            <h1 class="title">平均配送时间</h1>
            <div class="text">{{ seller.deliveryTime }}<span class="unit">分钟</span></div>
          </div>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper">
          <p class="text">{{ seller.bulletin }}</p>
        </div>
        <div class="supports">
          <ul>
            <li class="support-item" v-for="(value, index) in seller.supports" :key="index">
              <sicon class="icon" :iconType="seller.supports[index].type" :scene="4" :size="16"></sicon>
              <span class="support-content">{{ seller.supports[index].description }}</span>
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item">
              <img class="pic" v-for="(pic,index) in seller.pics" :src="pic" width="120px" height="90px" :key="index">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="seller-info">
        <h1 class="title">商家信息</h1>
        <ul>
          <li class="info" v-for="(info,index) in seller.infos" :key="index">{{ info }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from 'components/star/star.vue'
  import split from 'components/split/split.vue'
  import sicon from 'components/support-icon/support-icon.vue'
  import { saveToLocal, loadFromLocal } from '../../common/js/store'
  import BScroll from 'better-scroll'

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        favorite: loadFromLocal('12345', 'favorite', false)
      }
    },
    computed: {
      favoriteText: function () {
        return this.favorite ? '已收藏' : '收藏'
      }
    },
    watch: {
      'seller' () {
        this.$nextTick(() => {
          this.initScroll()
        })
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.initScroll()
      })
    },
    methods: {
      toggleFavorite: function () {
        this.favorite = !this.favorite
        saveToLocal('12345', 'favorite', this.favorite)
      },
      initScroll: function () {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.seller, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }

        if (this.seller.pics) {
          const picWidth = 120
          const margin = 6
          const width = (picWidth + margin) * this.seller.pics.length - margin
          this.$refs.picList.style.width = width + 'px'
          this.$nextTick(() => {
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs.picWrapper, {
                scrollX: true,
                eventPassthrough: 'vertical'
              })
            } else {
              this.picScroll.refresh()
            }
          })
        }
      }
    },
    components: {
      star,
      split,
      sicon
    }
  }
</script>

<style lang="stylus">
  @import "../../common/stylus/mixin.styl"
  .seller
    position: absolute
    top: 179px
    left: 0
    bottom: 0
    width: 100%
    overflow: hidden
    color: rgb(7, 17, 27)
    .overview
      padding: 18px
      background-color: #fff
      .overview-header
        position: relative
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        .name
          margin-bottom: 8px
          font-size: 14px
          font-weight: 500
          line-height: 14px
        .star
          display: inline-block
          vertical-align: top
        .rating-count, .sell-count
          font-size: 10px
          color: rgb(77, 85, 93)
          line-height: 18px
        .rating-count
          margin-right: 12px
        .favorite
          position: absolute
          top: 0
          right: 0
          width: 30px
          text-align: center
          .icon-favorite
            display: block
            margin-bottom: 4px
            font-size: 24px
            color: rgb(147, 153, 159)
            &.active
              color: rgb(240, 20, 20)
          .text
            font-size: 10px
            color: rgb(77, 85, 93)

      .overview-info
        padding-top: 18px
        display: flex
        font-size: 12px
        .block
          flex: 1
          text-align: center
          border-right: 1px solid rgba(7, 17, 27, 0.1)
          &:last-child
            border-right: 0
          .title
            margin-bottom: 4px
            font-size: 10px
            font-weight: 500
            color: rgb(147, 153, 159)
          .text
            font-weight: 300
            font-size: 24px
            line-height: 24px
            .unit
              font-size: 10px
    .bulletin
      padding: 18px
      .title
        margin-bottom: 8px
        font-size: 14px
        font-weight: 500
      .text
        padding-bottom: 16px
        font-size: 12px
        line-height: 24px
        color: rgb(240, 20, 20)
        border-1px(rgba(7, 17, 27, 0.1))
      .supports
        .support-item
          padding: 16px 0
          border-1px(rgba(7, 17, 27, 0.1))
          &:last-child
            no-border()
            padding-bottom: 0
          .icon
            display: inline-block
            vertical-align: top
            margin-right: 6px
          .support-content
            display: inline-block
            vertical-align: top
            font-size: 12px
            line-height: 16px
    .pics
      padding: 18px
      .title
        margin-bottom: 12px
        font-size: 14px
        font-weight: 500
      .pic-wrapper
        width: 100%
        white-space: nowrap
        .pic
          display: inline-block
          margin-right: 6px
          border-radius: 10px
    .seller-info
      padding: 18px
      .title
        padding-bottom: 12px
        font-size: 14px
        font-weight: 500
        border-1px(rgba(7, 17, 27, 0.1))
      .info
        padding: 16px 0
        font-size: 12px
        line-height: 16px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          no-border()
          padding-bottom: 0
</style>
