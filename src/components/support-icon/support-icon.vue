<template>
  <span class="icon" :class="className" :style="styleObject"></span>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      iconType: {
        type: Number
      },
      size: {
        type: Number
      },
      scene: {
        type: Number
      }
    },
    data () {
      return {
        className: '',
        styleObject: {
          width: this.size + 'px',
          height: this.size + 'px',
          backgroundSize: this.size + 'px ' + this.size + 'px'
        }
      }
    },
    created () {
      let name = this.className
      if (this.iconType === 0) {
        name = 'decrease'
      } else if (this.iconType === 1) {
        name = 'discount'
      } else if (this.iconType === 2) {
        name = 'special'
      } else if (this.iconType === 3) {
        name = 'invoice'
      } else if (this.iconType === 4) {
        name = 'guarantee'
      }
      this.className = name + '_' + this.scene
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .icon
    display: inline-block
    vertical-align: top
    background-repeat: no-repeat

  .decrease_1
    bg-img('decrease_1')

  .discount_1
    bg-img('discount_1')

  .guarantee_1
    bg-img('guarantee_1')

  .invoice_1
    bg-img('invoice_1')

  .special_1
    bg-img('special_1')

  .decrease_2
    bg-img('decrease_2')

  .discount_2
    bg-img('discount_2')

  .guarantee_2
    bg-img('guarantee_2')

  .invoice_2
    bg-img('invoice_2')

  .special_2
    bg-img('special_2')

  .decrease_3
    bg-img('decrease_3')

  .discount_3
    bg-img('discount_3')

  .guarantee_3
    bg-img('guarantee_3')

  .invoice_3
    bg-img('invoice_3')

  .special_3
    bg-img('special_3')

  .decrease_4
    bg-img('decrease_4')

  .discount_4
    bg-img('discount_4')

  .guarantee_4
    bg-img('guarantee_4')

  .invoice_4
    bg-img('invoice_4')

  .special_4
    bg-img('special_4')

</style>
