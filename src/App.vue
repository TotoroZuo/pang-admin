<template>
  <div>
    <router-view/>
  </div>
</template>
<script>
export default {
  mounted () {
    // 关闭loading
    this.closeLoading()
    // 更新用户登录信息
    this.refreshUserInfo()
    // 获取浏览器信息
    this.$store.commit('ua/get')
  },
  methods: {
    closeLoading () {
      document.getElementById('loading-box').style.display = 'none'
    },
    refreshUserInfo () {
    // 解决用户登陆持久化问题
      const token = sessionStorage.getItem('token')
      if (!this.$store.state.user.token && token) {
        this.$store.commit('user/refresh')
      }
    }
  },
  watch: {
    '$route' (val) {
      if (val) {
        document.title = val.meta.name
      }
    }
  }
}
</script>

<style lang="stylus">
    @import './styles/common.styl'
</style>
