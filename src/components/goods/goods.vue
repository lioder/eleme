<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li class="menu" v-for="menu in goods" :key="menu.id">
          <span class="menu-item"> <sicon v-show="menu.type > -1" :iconType="menu.type" :scene="3"
                                          :size="12"></sicon>{{ menu.name }}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper">
      <ul>
        <li v-for="(item,index) in goods" :key="index">
          <h1 class="title">{{ item.name }}</h1>
          <ul>
            <li v-for="(food,index) in item.foods" :key="index" class="content">
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
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import sicon from 'components/support-icon/support-icon.vue'

  export default {
    data () {
      return {
        goods: []
      }
    },
    created () {
      this.$ajax.get('/api/goods').then((response) => {
        const ERR_OK = 0
        response = response.data
        if (response.errno === ERR_OK) {
          this.goods = response.data
        }
      })
    },
    components: {
      sicon
    }
  }
</script>

<style lang="stylus">
  @import "../../common/stylus/mixin.styl"
  .goods
    position: absolute
    top: 177px
    bottom: 46px
    width: 100%
    display: flex
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      background-color: #f3f5f7
      .menu
        display: table
        height: 54px
        padding: 0 12px
        line-height: 14px
        color: rgb(40, 20, 20)
        .menu-item
          vertical-align: middle
          display: table-cell
          font-size: 12px
          font-weight: 200
          border-1px(rgba(7, 17, 27, 0.1))
          .icon
            margin-right: 2px
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
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .food
          flex: 1
          .food-name
            margin-bottom: 8px
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
          .price
            font-size: 14px
            font-weight: 700
            line-height: 24px
            color: rgb(240, 20, 20)
          .old-price
            font-size: 10px
            line-height: 24px
            color: rgb(147, 153, 159)

</style>
