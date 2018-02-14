<template>
  <div class="rating-selector">
    <div class="rating-header">
      <div class="rating-block">
        <span class="block all" :class="{'active': selectedType === 2}" @click="select(2,$event)">全部</span>
        <span class="block positive" :class="{'active': selectedType === 0}" @click="select(0,$event)">推荐</span>
        <span class="block negative" :class="{'active': selectedType === 1}" @click="select(1,$event)">吐槽</span>
      </div>
      <div class="only-content" @click="toggleContent">
        <i class="icon-check_circle" :class="{'on': onlyContent}"></i>
        <span class="text">只看有内容的评价</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const ALL = 2
  export default {
    props: {
      selectedType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      select: function (type, event) {
        if (!event._constructed) {
          return
        }
        this.$emit('type', type)
      },
      toggleContent: function () {
        this.$emit('content')
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../common/stylus/mixin.styl"
  .rating-selector
    font-size: 0
    .rating-header
      padding: 0 18px
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      .rating-block
        margin: 18px 18px 0 0
        width: 100%
        border-1px(rgba(7, 17, 27, 0.1))
        padding-bottom: 18px
        .block
          display: inline-block
          padding: 8px 12px
          border-radius: 2px
          font-size: 12px
          line-height: 16px
          color: rgb(77, 85, 93)
        .all, .positive
          margin-right: 8px
          background: rgba(0, 160, 220, 0.2)
          &.active
            color: #fff
            background-color: rgb(0, 160, 220)
        .negative
          background: rgba(77, 85, 93, 0.2)
          &.active
            color: #fff
            background-color: rgb(77, 85, 93)
      .only-content
        width: 100%
        padding: 12px 0 6px 0
        color: rgb(147, 153, 159)
        line-height: 24px
        .icon-check_circle
          display: inline-block
          vertical-align: top
          font-size: 24px
          margin-right: 4px
          &.on
            color: #00c850
        .text
          font-size: 12px
</style>
