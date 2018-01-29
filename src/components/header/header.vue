<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar"/>
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span><span class="seller-name">{{ seller.name }}</span>
        </div>
        <div class="description">
          <span class="description-content">{{ seller.description }} / {{ seller.deliveryTime }} 分钟送达</span>
        </div>
        <div v-if="seller.supports" class="support">
          <sicon :iconType="seller.supports[0].type" :size="12" :scene="1"></sicon><span class="support-description">{{ seller.supports[0].description
          }}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-detail" @click="showDetail">
        <span class="support-num">{{ seller.supports.length }}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-icon"></span><span class="bulletin">{{ seller.bulletin }}</span><i
      class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img width="100%" height="100%" :src="seller.avatar">
    </div>
    <transition name="fade">
      <div v-show="detail" class="detail">
        <div class="detail-wrapper">
          <div class="detail-content">
            <h1 class="detail-name">{{ seller.name }}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="detail-supports">
              <div class="title">
                <div class="line"></div>
                <div class="text">优惠信息</div>
                <div class="line"></div>
              </div>
              <div v-if="seller.supports" class="content">
                <div class="content-line" v-for="(value, index) in seller.supports" :key="index">
                  <sicon :iconType="seller.supports[index].type" :scene="2" :size="14"></sicon>
                  <span class="support-content">{{ seller.supports[index].description }}</span>
                </div>
              </div>
            </div>
            <div class="detail-bulletin">
              <div class="title">
                <div class="line"></div>
                <div class="text">商家公告</div>
                <div class="line"></div>
              </div>
              <div class="content">
                <p class="bulletin-content">{{ seller.bulletin }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="detail-close">
          <i class="icon-close" @click="showDetail"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import star from 'components/star/star.vue'
  import sicon from 'components/support-icon/support-icon.vue'
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        detail: false
      }
    },
    methods: {
      getSupportType: function (type) {
        if (type === 0) {
          return 'decrease'
        } else if (type === 1) {
          return 'discount'
        } else if (type === 2) {
          return 'guarantee'
        } else if (type === 3) {
          return 'invoice'
        } else if (type === 4) {
          return 'special'
        }
      },
      showDetail: function () {
        this.detail = !this.detail
      }
    },
    components: {
      star,
      sicon
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/index.styl"
  .header
    position: relative
    color: #fff
    background-color: rgba(7, 17, 27, 0.5)
    overflow: hidden
    .content-wrapper
      position: relative
      padding: 24px 0 18px 24px
      .avatar
        display: inline-block
        margin-right: 16px
        vertical-align: top
        img
          border-radius 2px
      .content
        display: inline-block
        .title
          margin-bottom: 8px
          line-height 18px
          .brand
            display: inline-block
            margin-right: 6px
            vertical-align: top
            width: 30px
            height: 18px
            background-size: 30px 18px
            bg-img('brand')
            .seller-name
              font-size: 16px
              font-weight: bold
        .description
          margin-bottom: 9px
          .description-content
            font-size: 12px
            font-weight: 200
            line-height: 12px
        .support
          line-height: 14px
          .icon
            margin-right: 4px

  .support-description
    vertical-align: top
    font-size: 10px
    font-weight: 200

  .support-detail
    position: absolute
    text-align: center
    right: 10px
    bottom: 18px
    width: 48px
    height: 24px
    border-radius: 7px
    line-height: 15px
    padding: 7px 0px 0px 5px
    background-color: rgba(0, 0, 0, 0.2)
    .support-num
      font-size: 12px
      font-weight: 200px
    .icon-keyboard_arrow_right
      vertical-align: middle

  .bulletin-wrapper
    padding-right: 22px
    position: relative
    line-height: 28px
    background-color rgba(7, 17, 27, 0.2)
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
    .bulletin-icon
      display: inline-block
      vertical-align: top
      margin: 9px 4px 0 12px
      width: 22px
      height: 12px
      background-size: 22px 12px
      bg-img('bulletin')
    .bulletin
      font-size: 10px
      font-weight: 200px
    .icon-keyboard_arrow_right
      display: inline-block
      position: absolute
      right: 10px
      bottom: 6px

  .background
    position: absolute
    left: 0
    top: 0
    width: 100%
    z-index: -1
    filter: blur(10px)

  .detail
    position: fixed
    top: 0
    left: 0
    z-index: 100
    width: 100%
    height: 100%
    overflow: auto
    background-color: rgba(7, 17, 27, 0.8)
    .detail-wrapper
      min-height: 100%
      width: 100%
      -webkit-backdrop-filter: blur(10px)
      .detail-content
        padding-top: 32px
        padding-bottom: 96px
        .detail-name
          text-align: center
          font-size: 16px
          font-weight: 700
          line-height: 18px
        .star-wrapper
          margin-top: 16px
          text-align: center
        .title
          display: flex
          width: 80%
          margin: 28px auto 24px auto
          .line
            flex: 1
            position: relative
            top: -6px
            border-bottom: 2px solid rgba(255, 255, 255, 0.2)
          .text
            padding: 0 12px
            font-weight: 700
            font-size: 14px

        .content
          line-height: 14px
          width: 80%
          margin: 0 auto
          .content-line
            margin-bottom: 12px
            .icon
              vertical-align: top
              margin-right: 12px
            .support-content
              font-size: 12px
              font-weight: 200
          .bulletin-content
            line-height: 24px
            font-size: 12px
            font-weight: 200

    .detail-close
      position: relative
      margin: -64px auto 0 auto
      width: 32px
      height: 32px
      font-size: 32px
      color: rgba(255, 255, 255, 0.5)
      clear: both

  .fade-enter, .fade-leave-to
    opacity: 0
  .fade-enter-active, .fade-leave-active
    transition: all 0.5s
</style>
