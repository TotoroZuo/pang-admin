<template>
  <div class="login-container">
    <div class="login-main">
      <transition name="slogan">
        <div class="login-slogan" v-if="showSlogan">
          <img src="../../assets/slogan.png" alt="less coding , better life" width="100%">
        </div>
      </transition>
      <transition name="loginform">
        <div class="login-paper login-form-box" v-if="showPaper">
            <div class="brand-log">
              <img src="../../assets/brand-logo.png" alt="胖龙猫">
            </div>
            <el-tabs v-model="activeLoginType" @tab-click="changeLoginType" stretch>
                <el-tab-pane label="账号登陆" name="password">
                    <div class="login-form-inputs">
                        <el-input
                          placeholder="请输入账号"
                          prefix-icon="el-icon-mobile-phone"
                          class="login-input"
                          v-model="username" @keyup.native.enter="doLogin">
                        </el-input>
                        <el-input
                          placeholder="请输入密码"

                          type="password"
                          prefix-icon="el-icon-goods"
                          class="login-input"
                          v-model="password" @keyup.native.enter="doLogin">
                        </el-input>
                        <div class="login-msg" v-show="errMsg">
                           <i class="el-icon-error"></i> {{errMsg}}
                        </div>
                        <el-button type="primary"  style="width:100%;" :disabled="inputFull" @click="doLogin">登陆</el-button>

                    </div>
                    <div class="signup-link-box">
                      <el-button type="text" class="signup-link">账号注册</el-button>
                      <el-button type="text" class="forgot-link">忘记密码</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="扫码登陆" name="qrcode" >
                  <div class="qr-content">
                    <img src="../../assets/qr.png" class="qr-img" alt="">
                  </div>
                  <div class="qr-tip">
                    请使用微信扫一扫，扫码登陆
                  </div>
                </el-tab-pane>

            </el-tabs>
        </div>
      </transition>
    </div>

    <div class="login-footer">© {{curYear}} <a href="https://github.com/TotoroZuo/royal-admin">{{copyRight}}</a> </div>
  </div>
</template>
<script>
import setting from '@/config.js'
const thisYear = new Date().getFullYear()
export default {
  name: 'login',
  data () {
    return {
      copyRight: setting.copyRight, // 版权
      curYear: thisYear, // 当年时间
      showSlogan: false, // slogan是否显示
      showPaper: false, // 登陆框是否显示
      activeLoginType: 'password', // 登陆方式：password 账号密码登陆 code 扫码登陆
      username: '', // 用户名
      password: '', // 密码
      errMsg: '', // 错误信息
      loginDoing: false // 正在登录中
    }
  },
  mounted () {
    setTimeout(() => {
      this.showSlogan = true
      this.showPaper = true
    }, 100)
  },
  methods: {
    /**
    * @description  修改登陆方式
    */
    changeLoginType (tab, event) {
      this.activeLoginType = tab.name
    },
    /**
     * @description 进行登陆
     */
    doLogin () {
      this.errMsg = ''
      if (this.loginDoing) {
        return false
      }
      const params = {
        userName: this.username.replace(/\s+/g, ''),
        password: this.password.replace(/\s+/g, '')
      }

      // 发送登陆请求
      this.loginDoing = true
      this.$apis.user.doLogin(params)
        .then((res) => {
          console.log(res)
          if (res.code != 200) {
            this.errMsg = res.msg
            this.$message({
              message: res.msg,
              type: 'error',
              duration: 1000,
              onClose: () => {
                this.loginDoing = false// 登陆成功跳转首页
              }
            })
            return false
          }
          // 更改 Vuex 用户状态
          let user = res.data.info
          user.token =  res.data.token
          this.$store.commit('user/set', user)
          console.log(res.data)
          this.getMenuList()
          // 成功之后消息提醒
          this.$message({
            message: '恭喜你，登陆成功',
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.loginDoing = false// 登陆成功跳转首页
            }
          })
        })
        .catch((error) => {
          console.log(error)
          this.$message({
            message: '请求异常',
            type: 'error',
            duration: 1000
          })
          this.loginDoing = true
        })
    },
    // 获取菜单列表
    getMenuList () {
      this.$apis.menu.getList().then((res) => {
        this.$store.commit('menu/setList', res.data)
        setTimeout(() => {
          this.$router.push({ path: res.data[0].path })
        }, 1000)
      })
    }
  },
  computed: {
    /**
     * @description 账号密码不能为空
     */
    inputFull () {
      if (!this.username.replace(/\s+/g, '') || !this.password.replace(/\s+/g, '')) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import './login.styl'
</style>
