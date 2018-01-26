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
          <span class="icon" :class="getSupportType(seller.supports[0].type)"></span><span class="support-description">{{ seller.supports[0].description
          }}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-detail">
        <span class="support-num">{{ seller.supports.length }}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-icon"></span><span class="bulletin">{{ seller.bulletin }}</span><i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img width="100%" height="100%" :src="seller.avatar">
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    methods: {
      getSupportType: function (type) {
        if (type === 0) {
          return 'decrease'
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
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
          margin-bottom: 8px
          .description-content
            font-size: 12px
            font-weight: 200
            line-height: 12px
        .support
          line-height: 16px
          .icon
            display: inline-block
            margin-right: 4px
            width: 12px
            height: 12px
            background-size: 12px 12px
          .decrease
            bg-img('decrease_1')
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
</style>
