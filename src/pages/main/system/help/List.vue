/*
 * @Description: 通知公告管理
 * @Author: Long maomao
 * @Date: 2018-10-22 16:51:23
 * @LastEditors: Long maomao
 * @LastEditTime: 2018-10-23 15:15:59
 * @Email: zlf@zuolongfei.me
 */
<template>
    <div class="user-list-container">
        <div class="search-container">
            <div class="search-left">
                <el-button type="primary"  size="medium" icon="el-icon-circle-plus-outline" class="single-add" @click="showAddUser" v-show="!checkedList.length">添加</el-button>
                <el-button-group v-show="checkedList.length">
                    <el-button type="primary"  size="medium" icon="el-icon-circle-plus-outline" @click="showEditorUser">添加</el-button>
                    <el-button type="primary"  size="medium" icon="el-icon-delete">删除</el-button>
                </el-button-group>
            </div>
            <div class="search-right">
                <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>

        </div>
        <div class="list-wrap">
            <el-collapse v-model="activeName" accordion>
            <el-collapse-item title="一致性 Consistency" name="1">
                <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
            </el-collapse-item>
            <el-collapse-item title="反馈 Feedback" name="2">
                <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
            </el-collapse-item>
            <el-collapse-item title="效率 Efficiency" name="3">
                <div>简化流程：设计简洁直观的操作流程；</div>
                <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
            </el-collapse-item>
            <el-collapse-item title="可控 Controllability" name="4">
                <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
            </el-collapse-item>
            </el-collapse>
        </div>

        <!-- 用户添加编辑组件 -->
        <user-dialog :open.sync="openDialog"  :type.sync="dialogType" />
    </div>
</template>
<script>
import userDialog from '@/pages/main/system/help/Dialog.vue' // 添加组件

export default {
  name: 'usersList',
  components: {
    userDialog
  },
  data () {
    return {
      openDialog: false,
      activeName: '1',
      dialogType: 'add',
      checkedList: [],
      select: '',
      input5: ''
    }
  },
  methods: {
    handleSelectionChange (val) {
      console.log(val)
      this.checkedList = val
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    showEditorUser () {
      this.dialogType = 'editor'
      const userInfo = {
        uid: 'aaa',
        account: 'sssss',
        password: 'sssssss',
        avator: '',
        org: 'org1',
        role: [],
        name: '做龙飞',
        status: 1,
        phone: '',
        idcard: '',
        isSuper: false
      }
      this.$store.commit('options/setSelectUser', userInfo)
      if (this.openDialog) {
        this.openDialog = false
      }
      this.openDialog = true
    },
    showAddUser () {
      this.dialogType = 'add'
      if (this.openDialog) {
        this.openDialog = false
      }
      this.openDialog = true
    },
    showDetail (row) {
      this.$refs.userList.toggleRowExpansion(row)
    }
  }
}
</script>
<style lang="stylus" scoped>
.user-list-container
    padding 15px
.search-left
    float left
.search-right
    float right
.search-container
    padding 15px 0
    // border: 1px solid #ebeef5;
    // border-bottom none
.search-container:after
    content ''
    display block
    height 0
    width 100%
    clear both
.pagination-wrap
    padding 15px 0
    border: 1px solid #ebeef5;
    border-top none
.table-tag
    margin-right 10px;
</style>
