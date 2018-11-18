/*
 * @Description: 后台用户管理
 * @Author: Long maomao
 * @Date: 2018-10-23 11:39:52
 * @LastEditors: Long maomao
 * @LastEditTime: 2018-10-23 11:39:52
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
                    <el-select v-model="select" slot="prepend" placeholder="请选择">
                    <el-option label="餐厅名" value="1"></el-option>
                    <el-option label="订单号" value="2"></el-option>
                    <el-option label="用户电话" value="3"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>

        </div>
        <div class="list-wrap">
             <el-table
            :data="tableData5"
            @selection-change="handleSelectionChange"
            border
            ref="userList"
            style="width: 100%">

            <el-table-column
                type="selection"
                align="center"
                width="55">
            </el-table-column>
            <el-table-column
                label="序号"
                width="60"
                align="center"
            >
                <template slot-scope="props">
                    {{props.$index + 1}}
                </template>
            </el-table-column>
            <el-table-column
                label="姓名"
                align="center"
                >
                <template slot-scope="props">
                    <el-button type="text" @click="showDetail(props.row)">{{props.row.name}}</el-button>
                </template>
            </el-table-column>
            <el-table-column
                label="帐号"
                align="center"
                prop="account">
            </el-table-column>
            <el-table-column
                label="手机号"
                align="center"
                prop="phone">
            </el-table-column>
            <el-table-column
                label="所属部门"
                align="center"
                prop="org">
            </el-table-column>
            <el-table-column
                label="角色"
                prop="role">
            </el-table-column>

            <el-table-column
                label="状态"
                width="60"
                align="center"
                >
                <template slot-scope="props">
                    <el-tooltip :content="'点击' + (props.row.enable ? '禁用':'启用') +'菜单'" placement="top">
                        <el-switch
                            v-model="props.row.enable"
                            active-color="#13ce66"
                            inactive-color="#C0CCDA">
                        </el-switch>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column type="expand" width="60" label="详情">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="list-table-expand">
                        <el-form-item label="用户ID">
                            <span>{{ props.row.uid }}</span>
                        </el-form-item>

                        <el-form-item label="头像">
                            <span>
                              <avator class="header-avator"   size="36">
                                <img :src="props.row.avator" alt="">
                              </avator>
                            </span>
                        </el-form-item>
                         <el-form-item label="帐号">
                            <span>{{ props.row.account }}</span>
                        </el-form-item>
                        <el-form-item label="姓名">
                            <span>{{ props.row.name }}</span>
                        </el-form-item>
                        <el-form-item label="手机号">
                            <span>{{ props.row.phone }}</span>
                        </el-form-item>
                        <el-form-item label="身份证号">
                            <span>{{ props.row.idcard }}</span>
                        </el-form-item>
                        <el-form-item label="所属部门">
                            <span>{{ props.row.org }}</span>
                        </el-form-item>
                        <el-form-item label="角色">
                            <span>{{ props.row.role }}</span>
                        </el-form-item>
                        <el-form-item label="状态">
                            <span>
                                <el-tag type="success" size="medium" v-if="props.row.enable">已启用</el-tag>
                                <el-tag type="danger" size="medium" v-else>已禁用</el-tag>
                            </span>
                        </el-form-item>
                        <el-form-item label="超级权限">
                            <span>
                                <el-tag type="success" size="medium" v-if="props.row.isSuper">已启用</el-tag>
                                <el-tag type="danger" size="medium" v-else>已禁用</el-tag>
                            </span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="120" align="center">
                 <template slot-scope="props">
                     <el-button type="text" size="small" title="编辑用户">编辑</el-button>
                     <el-button type="text" size="small" title="重置密码">重置</el-button>
                     <el-button type="text" size="small" title="删除用户">删除</el-button>
                 </template>
            </el-table-column>
        </el-table>

        </div>
        <div class="pagination-wrap">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="prev, pager, next, jumper,total, sizes"
            :total="400">
            </el-pagination>
        </div>
        <!-- 用户添加编辑组件 -->
        <user-dialog :open.sync="openDialog"  :type.sync="dialogType" />
    </div>
</template>
<script>
import userDialog from '@/pages/main/system/users/Dialog.vue' // 添加组件
import avator from '@/components/Avator.vue' // 头像组件
export default {
  name: 'usersList',
  components: {
    userDialog,
    avator
  },
  data () {
    return {
      openDialog: false,
      dialogType: 'add',
      checkedList: [],
      select: '',
      input5: '',
      currentPage4: 1,
      tableData5: [{
        uid: 'aaa',
        num: 1,
        account: 'sssss',
        password: 'sssssss',
        avator: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539796759206&di=7baf05afe2361700ca63506e9c9405c0&imgtype=0&src=http%3A%2F%2Fs6.sinaimg.cn%2Fthumb180%2F51267fc5tdf6b5c96b995',
        org: '商务部',
        role: '角色1,角色2,角色3',
        name: '做龙飞',
        enable: 1,
        phone: '15537922825',
        idcard: '410123199103065223',
        isSuper: 0
      }
      ],
      multipleSelection: []
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
        enable: true,
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
    padding 15px
    border: 1px solid #ebeef5;
    border-bottom none
.search-container:after
    content ''
    display block
    height 0
    width 100%
    clear both
.single-add
    margin-right 15px
.pagination-wrap
    padding 15px 0
    border: 1px solid #ebeef5;
    border-top none
</style>
