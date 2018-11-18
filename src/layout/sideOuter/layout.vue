<template>
    <el-container class="layout-main-container">
        <el-aside :width="menuWith" class="layout-aside ">
            <el-scrollbar class="latout-scrollbar" style="height:100%;">
            <!-- logo -->
            <div class="aside-logo">
                <img src="../../assets/totoro-logo.png"  alt="胖龙猫">
            </div>
            <!-- 菜单 -->
            <el-menu :default-active="active" class="layout-menu" :collapse="menuOpen">
                <template v-for="element in menuList">
                    <el-menu-item :index="element.path" :key="'meun'+element.id" @click="handleClickMenu(element.path,element.blank)" v-if="!element.isDirectory">
                        <i class="material-icons menu-icons" v-if="element.icon">{{element.icon}}</i>
                        <span slot="title">{{element.name}}</span>
                    </el-menu-item>
                    <el-submenu :index="element.path" :key="element.id"  v-if="element.isDirectory">
                        <template slot="title">
                            <i class="material-icons menu-icons" v-if="element.icon">{{element.icon}}</i>
                            <span slot="title">{{element.name}}</span>
                        </template>
                        <template v-for="son in element.child" v-if="element.child">
                            <el-menu-item :index="son.path" :key="son.id" @click="handleClickMenu(son.path,son.blank)" v-if="!son.isDirectory">{{son.name}}</el-menu-item>
                            <el-submenu :index="son.path" :key="son.id" v-if="son.isDirectory">
                                <span slot="title">{{son.name}}</span>
                                <template v-for="grandson in son.child" v-if="son.child">
                                    <el-menu-item :index="grandson.path" :key="grandson.id" @click="handleClickMenu(grandson.path,grandson.blank)">{{grandson.name}}</el-menu-item>
                                </template>

                            </el-submenu>
                        </template>
                    </el-submenu>
                </template>
            </el-menu>
            </el-scrollbar>
        </el-aside>
        <!-- 右侧部分 -->
        <el-container class="right-main-container">
            <el-header class="layout-header" height="50px">
                <a href="javascript:;" class="aside-toggle" @click="toggleOpenMenu">
                    <i class="material-icons" v-show="menuOpen">keyboard_arrow_right </i>
                    <i class="material-icons" v-show="!menuOpen">keyboard_arrow_left</i>
                </a>
                <div class="layout-header-content">
                    <!-- <div class="header-content-left">
                        <a  class="header-icons" v-if="menuOpen" @click="toggleOpenMenu">
                            <i class="material-icons">format_indent_increase</i>
                        </a>
                        <a   class="header-icons" @click="toggleOpenMenu" v-else>
                            <i class="material-icons">format_indent_decrease</i>
                        </a>
                    </div> -->
                    <div class="header-content-middle">
                        追求简约美感的后台管理系统集成方案
                    </div>
                    <div class="header-content-right">
                            <avator class="header-avator" color="#b3c0d1"  size="30">
                                A
                            </avator>
                            <el-dropdown class="accountDropmenu">
                                <a  class="header-account">
                                   <span class="accountName">admin</span>
                                </a>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>基本资料</el-dropdown-item>
                                    <el-dropdown-item>修改密码</el-dropdown-item>
                                    <el-dropdown-item divided @click.native="doLogout">退出</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                            <el-tooltip content="消息通知" placement="bottom" effect="light">

                            </el-tooltip>
                            <el-popover
                                placement="bottom"
                                width="300"
                                trigger="hover">
                                <el-table :data="gridData">
                                    <el-table-column width="150" property="date" label="日期"></el-table-column>
                                    <el-table-column width="100" property="name" label="姓名"></el-table-column>
                                    <el-table-column width="300" property="address" label="地址"></el-table-column>
                                </el-table>
                                <a  class="header-icons" slot="reference">
                                    <el-badge :value="0" class="notice-nums">
                                        <i class="material-icons">notifications_none</i>
                                    </el-badge>
                                </a>
                            </el-popover>
                            <el-tooltip content="错误日志" placement="bottom" effect="light">
                                <a  class="header-icons">
                                    <i class="material-icons">bug_report</i>
                                </a>
                            </el-tooltip>
                            <el-tooltip content="操作日志" placement="bottom" effect="light">
                                <a  class="header-icons">
                                    <i class="material-icons">g_translate</i>
                                </a>
                            </el-tooltip>
                            <el-tooltip content="帮助中心" placement="bottom" effect="light">
                                <a  class="header-icons">
                                    <i class="material-icons">help_outline</i>
                                </a>
                            </el-tooltip>
                    </div>
                </div>
            </el-header>

            <!-- iframe -->
            <el-main class="layout-main-iframe" v-if="iframeUrl">
                <el-scrollbar class="latout-scrollbar" style="height:100%;">
                <div class="royal-paper royal-paper-2 layout-iframe-wrap">
                    <iframe :src="iframeUrl"  class="layout-iframe" frameborder="0" ></iframe>
                </div>
                </el-scrollbar>
            </el-main>
            <!-- router -->
            <el-main class="layout-main" v-else>
                <el-scrollbar class="latout-scrollbar" style="height:100%;">
                <root-path/>
                <div class="royal-paper royal-paper-2" >
                    <router-view ></router-view>
                </div>
                 </el-scrollbar>
            </el-main>

            <el-footer class="layout-footer" height="40px">
                © {{curYear}} <a href="https://github.com/TotoroZuo/royal-admin">{{copyRight}}</a>
            </el-footer>
        </el-container>
    </el-container>
</template>

<script>
import setting from '@/config.js' // 配置文件
import avator from '@/components/Avator.vue' // 头像组件
import rootPath from '@/components/RouterPath.vue' // 当前路径
const thisYear = new Date().getFullYear()
export default {
  name: 'mainLayout',
  props: {
    msg: String
  },
  components: {
    avator,
    rootPath
  },
  data () {
    return {
      menuOpen: false,
      copyRight: setting.copyRight,
      curYear: thisYear,
      menuWith: '201px',
      iframeUrl: '',
      gridData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  mounted () {
    this.getMenuList()
  },
  methods: {
    toggleOpenMenu () {
      this.menuOpen = !this.menuOpen
      this.changeMenuWidth()
    },
    changeMenuWidth () {
      setTimeout(() => {
        if (this.menuOpen) {
          this.menuWith = '66px'
        } else {
          this.menuWith = '201px'
        }
      }, 0)
    },
    doLogout () {
      this.$store.commit('user/clear')
      this.$router.push({ name: 'login' })
    },
    // 处理点击菜单
    handleClickMenu (path, _blank) {
      if (_blank) {
        window.open(path)
        return false
      }
      if (path.indexOf('http') !== -1 || path.indexOf('https') !== -1) {
        this.iframeUrl = path
      } else {
        this.iframeUrl = ''
        this.$router.push({ path })
      }
    },
    // 获取菜单列表
    getMenuList () {
      this.$apis.menu.getList().then((res) => {
        this.$store.commit('menu/setList', res.data)
      })
    }
  },
  computed: {
    active () {
      return this.$route.meta.router
    },
    userToken () {
      return this.$store.state.user.token
    },
    menuList () {
      return this.$store.state.menu.menuList
    }
  }
}
</script>
<style lang="stylus" scoped>
    @import './layout.styl'
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
