<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li v-for="(menu,index) in goods" :key="index" class="menu" :class="{'current': currentIndex === index}"
              @click="selectMenu(index,$event)" ref="menuList">
          <span class="menu-item"> <sicon v-show="menu.type > -1" :iconType="menu.type" :scene="3"
                                          :size="12"></sicon>{{ menu.name }}</span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li v-for="(item,index) in goods" :key="index" ref="foodList">
            <h1 class="title">{{ item.name }}</h1>
            <ul>
              <li v-for="(food,index) in item.foods" :key="index" class="content" @click="showFoodDetail(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon"/>
                </div>
                <div class="food">
                  <h1 class="food-name">{{ food.name }}</h1>
                  <p class="food-des">{{ food.description }}</p>
                  <div class="food-sail">
                    <span class="month-sail">月售{{ food.sellCount }}份</span><span>好评率{{ food.rating }}%</span>
                  </div>
                  <div>
                    <span class="price">￥{{ food.price }}</span>
                    <span class="old-price" v-show="food.oldPrice">￥{{ food.oldPrice}}</span>
                  </div>
                  <cartcontrol class="cart-control" :food="food" @add="addFood"></cartcontrol>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectedFoods="selectedFoods"
                ref="shopcart" @empty="emptyFoods"></shopcart>
    </div>
    <transition name="move">
      <food ref="food" :food="selectedFood" v-show="foodDetailShow" class="food-detail" @back="foodDetailShow = false"
            @add="addFood"></food>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import sicon from 'components/support-icon/support-icon.vue'
  import shopcart from 'components/shopcart/shopcart.vue'
  import cartcontrol from 'components/cart-control/cart-control.vue'
  import food from 'components/food/food.vue'
  import BScroll from 'better-scroll'

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        goods: [],
        height: [],
        scrollY: 0,
        selectedFood: {},
        foodDetailShow: false
      }
    },
    computed: {
      currentIndex: function () {
        for (let i = 0; i < this.height.length; i++) {
          if ((!this.height[i + 1]) || (this.scrollY >= this.height[i] && this.scrollY < this.height[i + 1])) {
            this.followScroll(i)
            return i
          }
        }
        return 0
      },
      selectedFoods: function () {
        let foods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count > 0) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    },
    created () {
      this.$ajax.get('/api/goods').then((response) => {
        const ERR_OK = 0
        response = response.data
        if (response.errno === ERR_OK) {
          this.goods = response.data
          this.$nextTick(() => {
            this.initScroll()
            this.scrollHeight()
          })
        }
      })
    },
    components: {
      sicon,
      shopcart,
      cartcontrol,
      food
    },
    methods: {
      selectMenu: function (index, event) {
        if (!event._constructed) {
          return
        }
        let list = this.$refs.foodList
        let el = list[index]
        this.foodsScroll.scrollToElement(el, 300)
      },
      initScroll: function () {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        })
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        })
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      followScroll: function (index) {
        let list = this.$refs.menuList
        let el = list[index]
        this.menuScroll.scrollToElement(el, 300, 0, -100)
      },
      scrollHeight: function () {
        let list = this.$refs.foodList
        let h = 0
        this.height.push(h)
        for (let i = 0; i < list.length; i++) {
          h += list[i].clientHeight
          this.height.push(h)
        }
      },
      addFood: function (target) {
        this.$refs.shopcart.drop(target)
      },
      emptyFoods: function () {
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count > 0) {
              food.count = 0
            }
          })
        })
      },
      showFoodDetail: function (food) {
        this.foodDetailShow = !this.foodDetailShow
        this.selectedFood = food
        let foodDetail = this.$refs.food
        this.$nextTick(() => {
          foodDetail.initScroll()
        })
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../common/stylus/mixin.styl"
  .goods
    position: absolute
    top: 179px
    bottom: 46px
    width: 100%
    display: flex
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      background-color: #f3f5f7
      .menu
        display: table
        width: 56px
        height: 54px
        padding: 0 12px
        line-height: 14px
        color: rgb(40, 20, 20)
        .menu-item
          vertical-align: middle
          display: table-cell
          width: 56px
          font-size: 12px
          font-weight: 300
          border-1px(rgba(7, 17, 27, 0.1))
          .icon
            margin-right: 2px
      .menu:last-child
        .menu-item
          no-border()
      .current
        position: relative
        margin-top: -1px
        z-index: 10
        background-color: #fff
        .menu-item
          font-weight: 700
          no-border()
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        font-size: 12px
        border-left: 3px solid #d9dde1
        color: rgb(147, 153, 159)
        background-color: #f3f5f7
      .content
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          no-border()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .food
          flex: 1
          .food-name
            margin-bottom: 9px
            padding-top: 2px
            line-height: 14px;
            font-size: 14px
            color: rgb(7, 17, 27)
          .food-des, .food-sail
            margin-bottom: 7px
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
            .month-sail
              margin-right: 12px
          .food-sail
            margin-bottom: 2px
          .price
            font-size: 14px
            font-weight: 700
            line-height: 24px
            color: rgb(240, 20, 20)
          .old-price
            font-size: 10px
            line-height: 24px
            color: rgb(147, 153, 159)
            text-decoration: line-through
          .cart-control
            position: absolute
            right: 0px
            bottom: 12px

  .food-detail
    z-index: 15
    &.move-enter-active, &.move-leave-active
      transition: all 0.2s linear
    &.move-enter, &.move-leave-to
      transform: translate3d(100%, 0, 0)
</style>
