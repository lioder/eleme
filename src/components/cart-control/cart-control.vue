<template>
  <div class="cart-control">
    <transition name="rotate-out">
      <div class="decrease" v-show="food.count > 0" @click.stop.prevent="decrease">
        <i class="icon-remove_circle_outline"></i>
      </div>
    </transition>
    <div class="count" v-show="food.count > 0">{{ food.count }}</div>
    <div class="add" @click.stop.prevent="add">
      <i class="icon-add_circle"></i>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Vue from 'vue'

  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      add: function (event) {
        if (!event._constructed) {
          return
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 0)
        }
        this.food.count++
        this.$emit('add', event.target)
      },
      decrease: function () {
        if (!event._constructed) {
          return
        }
        this.food.count--
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../common/stylus/icon.styl"
  .cart-control
    font-size: 0px
    line-height: 25px
    .rotate-out-enter-active, .rotate-out-leave-active
      transition: all 0.4s linear
    .rotate-out-enter, .rotate-out-leave-to
      opacity: 0
      transform: translateX(30px) rotate(-180deg)
    .add, .decrease
      display: inline-block
      vertical-align: top
      font-size: 24px
      color: rgb(0, 160, 220)
    .add
      padding-left: 6px
    .decrease
      padding-right: 6px
    .count
      display: inline-block
      vertical-align: top
      font-size: 11px

</style>
