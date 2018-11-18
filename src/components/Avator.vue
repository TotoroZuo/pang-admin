<template>
  <div class="royal-avatar" :style="styleObj">
        <div class="royal-avatar-inner">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
  name: 'royal-avatar',
  props: {
    color: {
      type: String,
      default: '#fff'
    },
    textColor: {
      type: String,
      default: '#fff'
    },
    size: {
      type: [Number, String],
      default: 40
    }
  },
  computed: {
    styleObj () {
      return {
        width: this.size + 'px',
        height: this.size + 'px',
        fontSize: (this.size / 2) + 'px',
        backgroundColor: this.color,
        color: this.textColor,
        lineHeight: this.size + 'px'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.royal-avatar
    display inline-block
    height 40px
    width  40px
    font-size: 20px
    color: #fff
    text-align: center
    border-radius: 50%
.royal-avatar-inner
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    height: 100%;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
.royal-avatar img
    border-radius: 50%;
    width: 100%;
    height: 100%;
    display: block;

</style>
