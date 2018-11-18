<template>
    <div class="us-box">
        <div>
            ua：{{userAgent.ua}}
        </div>
        <div>
            browser：{{userAgent.browser}}
        </div>
        <div>
            engine：{{userAgent.engine}}
        </div>
        <div>
            os：{{userAgent.os}}
        </div>
        <div>
            device：{{userAgent.device}}
        </div>
        <div>
            cpu：{{userAgent.cpu}}
        </div>
    </div>
</template>
<script>
export default {
  name: 'UA',
  computed: {
    userAgent () {
      return this.$store.state.ua.data
    }
  }
}
</script>
<style lang="stylus" scoped>
.us-box div
    padding 15px
</style>
