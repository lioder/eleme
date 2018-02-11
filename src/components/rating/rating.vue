<template>
  <div class="rating-selector">
    <div class="rating-block">
      <span class="block all" :class="{'active': selectedType === 2}" @click="select(2,$event)">全部</span>
      <span class="block positive" :class="{'active': selectedType === 0}" @click="select(0,$event)">推荐</span>
      <span class="block negative" :class="{'active': selectedType === 1}" @click="select(1,$event)">吐槽</span>
    </div>
    <div class="only-content" @click="onlyContent = !onlyContent">
      <i class="icon-check_circle" :class="{'on': onlyContent}"></i>
      <span class="text">只看有内容的评价</span>
    </div>
    <div class="rating-wrapper">
      <ul>
        <li class="rating-item" v-for="(rating,index) in ratings" :key="index" v-show="needShow(rating)">
          <div class="user">
            <span class="username">{{ rating.username }}</span>
            <img class="avatar" width="12px" height="12px" :src="rating.avatar">
          </div>
          <div class="rate-time">{{ rating.rateTime }}</div>
          <div class="text"><i
            :class="{'icon-thumb_up': rating.rateType === 0,'icon-thumb_down': rating.rateType === 1}"></i>{{ rating.text
            }}
          </div>
        </li>
      </ul>
    </div>
    <div class="no-rating" v-show="ratings.length === 0">暂无评价</div>
  </div>
</template>

<script type="text/ecmascript-6">
  const ALL = 2
  export default {
    props: {
      ratings: {
        type: Array
      }
    },
    data () {
      return {
        selectedType: ALL,
        onlyContent: false
      }
    },
    methods: {
      select: function (type, event) {
        if (!event._constructed) {
          return
        }
        this.selectedType = type
        this.$emit('refresh')
      },
      needShow: function (rating) {
        if (this.onlyContent) {
          if (rating.text.length <= 0) {
            return false
          }
        }
        if (this.selectedType !== ALL && this.selectedType !== rating.rateType) {
          return false
        }
        return true
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../common/stylus/mixin.styl"
  .rating-selector
    font-size: 0
    .rating-block
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
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      .icon-check_circle
        display: inline-block
        vertical-align: top
        font-size: 24px
        margin-right: 4px
        &.on
          color: #00c850
      .text
        font-size: 12px
    .rating-wrapper
      .rating-item
        padding: 16px 0
        position: relative
        border-1px(rgba(7, 17, 27, 0.1))
        .user
          position: absolute
          top: 16px
          right: 0
          .username
            font-size: 12px
            color: rgb(147, 153, 159)
            line-height: 12px
          .avatar
            vertical-align: top
            margin-left: 6px
            border-radius: 50%
        .rate-time
          margin-bottom: 6px
          font-size: 10px
          line-height: 12px
          color: rgb(147, 153, 159)
        .text
          font-size: 12px
          line-height: 16px
          .icon-thumb_up, .icon-thumb_down
            line-height: 24px
            font-size: 12px
            color: rgb(147, 153, 159)
            margin-right: 4px
          .icon-thumb_down
            color: rgb(0, 160, 220)
    .no-rating
      height: 36px
      margin: 12px 0
      font-size: 12px
</style>
