<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" v-if="item.meta.title" :key="item.path">
        <span v-if="item.redirect===&quot;noredirect&quot;||index==levelList.length-1" class="no-redirect">
            <i class="material-icons router-path-icons">{{ item.meta.icon }}</i>
            {{ item.meta.name }}
        </span>
        <router-link v-else :to="item.redirect||item.path">
            <i class="material-icons router-path-icons">{{ item.meta.icon }}</i>
            {{ item.meta.name }}
        </router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>

export default {
  name: 'routerPath',
  data () {
    return {
      levelList: null
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  },
  created () {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb () {
      let matched = this.$route.matched.filter(item => item.name)
      const first = matched[0]

      if (first && first.name.trim().toLocaleLowerCase() !== 'index'.toLocaleLowerCase()) {
        matched = [{ path: '/index', meta: { title: 'index', name: '主页', icon: 'home', noCache: true } }].concat(matched)
      }
      this.levelList = matched
    }
  }
}
</script>

<style  lang="stylus" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    .no-redirect {
      display inline-block
      color: #333;
      cursor: text;
    }
    .el-breadcrumb__inner a{
        color #97a8be
    }
    .el-breadcrumb__inner a:hover, .el-breadcrumb__inner.is-link:hover{
        color #409EFF
    }
  }
  .router-path-icons
       vertical-align text-bottom
       font-size 18px
</style>
