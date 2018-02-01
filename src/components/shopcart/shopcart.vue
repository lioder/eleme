<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight': totalCount > 0}">
            <i class="icon-shopping_cart" :class="{'highlight': totalCount > 0}"></i>
          </div>
          <div class="num" v-show="totalCount > 0">{{ totalCount }}</div>
        </div>
        <div class="price" :class="{'highlight': totalPrice > 0}">￥{{ totalPrice }}</div>
        <div class="description">另需配送费 {{ deliveryPrice }} 元</div>
      </div>
      <div class="content-right" :class="{'enough': payDesc === '去结算'}">
        <div class="min-price">{{ payDesc }}</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      selectedFoods: {
        type: Array,
        default: function () {
          return [{
            price: 10,
            count: 2
          }]
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        tyoe: Number,
        default: 0
      }
    },
    computed: {
      totalPrice: function () {
        let total = 0
        for (let i = 0; i < this.selectedFoods.length; i++) {
          let food = this.selectedFoods[i]
          total += (food.price * food.count)
        }
        return total
      },
      totalCount: function () {
        let total = 10
        return total
      },
      payDesc: function () {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice} 起送`
        } else if (this.totalPrice > 0 && this.totalPrice < this.minPrice) {
          return `还差￥${this.minPrice - this.totalPrice}起送`
        } else {
          return '去结算'
        }
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../common/stylus/icon.styl"
  .shopcart
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    height: 46px
    .content
      display: flex
      font-size: 0px
      color: rgba(255, 255, 255, 0.4)
      .content-left
        flex: 1
        background-color: #141d27
        .logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: -10px
          margin: 0 14px
          padding: 6px
          width: 56px
          height: 56px
          border-radius: 50%
          background-color: #141d27
          box-sizing: border-box
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            background-color: #2b343c
            text-align: center
            &.highlight
              background-color: rgb(0, 160, 220)
            .icon-shopping_cart
              color: #80858a
              line-height: 44px
              font-size: 24px
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            border-radius: 12px
            padding: 0 4px
            width: auto
            height: 16
            line-height: 16px
            text-align: center
            font-size: 11px
            font-weight: 700
            color: #fff
            background-color: rgb(240, 20, 20)
        .price
          display: inline-block
          vertical-align: top
          margin: 10px 0
          padding-right: 12px
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          line-height: 24px
          font-size: 16px
          font-weight: 700
          &.highlight
            color: #fff
        .description
          display: inline-block
          vertical-align: top
          margin: 10px 0
          padding-left: 12px
          line-height: 24px
          font-size: 12px
          font-weight: 400
      .content-right
        flex: 0 0 110px
        background-color: #2b333b
        text-align: center
        line-height: 44px
        .min-price
          width: 110px
          font-size: 14px
          font-weight: 700
        &.enough
          background-color #00b43c
          color: #fff

</style>
