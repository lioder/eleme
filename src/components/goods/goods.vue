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
    <div class="foods-wrapper"></div>
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
    .menu-wrapper
      flex: 0 0 80px
      background-color: #f3f5f7
      overflow: hidden
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

</style>
