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
          <span class="description-content">{{ seller.description }}/{{ seller.deliveryTime }}分钟送达</span>
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :></span>
          <span class="support-description">{{ seller.supports[0].description }}</span>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper"></div>
  </div>
</template>

<script>
  export default {
    props: {
      seller: {
        type: Object
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .header
    color: #fff
    .content-wrapper
      padding: 24px 0 18px 24px
      background-color rgba(7, 17, 27, 0.5)
      .avatar
        display: inline-block
        img
          border-radius 2px
      .content
        display: inline-block
        .title
          .brand
            display: inline-block
            vertical-align: top
            width: 30px
            height: 18px
            background-size: 30px 18px
            bg-img('brand')
            .seller-name
              margin-left: 12px
              line-height 18px
              font-size: 16px
              font-weight: bold
        .description
          .description-content
            font-size: 12px
            font-weight: 200
            line-height: 12px
        .support
          .icon
            display: inline-block
          .support-description
            font-size: 10px
            font-weight: 200
            line-height: 12px

  /*.bulletin-wrapper*/
</style>
