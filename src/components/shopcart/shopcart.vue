<template>
  <div class="shopcart">
    <div class="content" @click="toggleList">
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
      <div class="content-right" :class="{'enough': payDesc === '去结算'}" @click.stop.prevent="pay">
        <div class="min-price">{{ payDesc }}</div>
      </div>
      <div class="ball-container">
        <div v-for="(ball,index) in balls" :key="index">
          <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
    </div>
    <transition name="fold">
      <div class="food-list" v-show="showList">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li v-for="(food,index) in selectedFoods" :key="index" class="food-item">
              <span class="food-name">{{ food.name }}</span>
              <div class="price">￥{{ food.price * food.count }}</div>
              <div class="cart-control-wrapper">
                <cartcontrol class="list-cart-control" :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="cart-mask" v-show="showList" @click="toggleList"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import cartcontrol from 'components/cart-control/cart-control.vue'
  import BScroll from 'better-scroll'

  export default {
    props: {
      selectedFoods: {
        type: Array
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    methods: {
      drop: function (el) {
        // 每次按 + ，都会从列表里取第一个 show = false 的 ball，把它的 show 设置成 true，并且绑定到对应的 html element 上
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.el = el
            this.dropBalls.push(ball)
            return
          }
        }
      },
      beforeDrop: function (el) {
        let count = this.balls.length - 1
        while (count >= 0) {
          let ball = this.balls[count]
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect()
            let x = rect.left - 32
            let y = -(window.innerHeight - rect.top - 20)
            el.style.display = ''
            el.style.transform = `translateY(${y}px)`
            el.style.webkitTransform = `translateY(${y}px)`
            let inner = el.getElementsByClassName('inner-hook')[0]
            inner.style.transform = `translateX(${x}px)`
            inner.style.webkitTransform = `translateX(${x}px)`
          }
          count--
        }
      },
      dropping: function (el, done) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight
        el.style.transform = 'translateY(0)'
        el.style.webkitTransform = 'translateY(0)'
        let inner = el.getElementsByClassName('inner-hook')[0]
        inner.style.transform = 'translateX(0)'
        inner.style.webkitTransform = 'translateX(0)'
        el.addEventListener('transitionend', done)
      },
      afterDrop: function (el) {
        let ball = this.dropBalls.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
      },
      toggleList: function () {
        if (this.totalCount > 0) {
          this.fold = !this.fold
        } else {
          this.fold = true
        }
      },
      initScroll: function () {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.listContent, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      },
      empty: function () {
        this.$emit('empty')
      },
      pay: function () {
        if (this.totalPrice >= this.minPrice) {
          alert(`需要支付${this.totalPrice}元`)
        }
      }
    },
    data () {
      return {
        balls: [
          // 默认小球个数为 5 个，决定了能在空中的小球个数
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [],
        fold: true
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
        let total = 0
        for (let i = 0; i < this.selectedFoods.length; i++) {
          let food = this.selectedFoods[i]
          total += (food.count)
        }
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
      },
      showList: function () {
        let show = !this.fold
        if (this.totalCount <= 0) {
          this.toggleList()
          return false
        }
        if (show) {
          this.$nextTick(() => {
            this.initScroll()
          })
        }
        return show
      }
    },
    components: {
      cartcontrol
    }
  }
</script>

<style lang="stylus">
  @import "../../common/stylus/index.styl"
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
        z-index: 50
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
        z-index: 50
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
      .ball-container
        .ball
          position: fixed
          left: 32px
          bottom: 20px
          z-index: 200
          transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
          .inner
            width: 16px
            height: 16px
            border-radius: 50%
            background-color: rgb(0, 160, 220)
            transition: all 0.4s linear

    .food-list
      position: absolute
      top: 0
      left: 0
      transform: translateY(-100%)
      width: 100%
      z-index: 30
      font-size: 12px
      color: #000
      &.fold-enter-active, &.fold-leave-active
        transition: all 0.3s linear
      &.fold-enter, &.fold-leave-to
        transform: translateY(0)
      .list-header
        padding: 0 18px
        height: 40px
        line-height: 40px
        border-1px(rgba(7, 17, 27, 0.1))
        background-color: #f3f5f7
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)
      .list-content
        background-color: #fff
        padding: 0 18px
        max-height: 200px
        overflow: hidden
        .food-item
          position: relative
          padding 12px 0
          line-height: 24px
          font-size: 14px
          box-sizing: border-box
          border-1px(rgba(1, 17, 27, 0.1))
          .price
            position: absolute
            right: 90px
            bottom: 12px
            display: inline-block
            color: rgb(240, 20, 20)
          .cart-control-wrapper
            position: absolute
            right: 0
            bottom: 10px
    .cart-mask
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      height: 100%
      z-index: 20
      background-color: rgba(7,17,27,0.6)
      transition: all 0.3s
      -webkit-backdrop-filter: blur(10px)
      &.fade-enter, &.fade-leave-to
        opacity: 0
</style>
