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
            ref="noticeList"
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
                label="标题"
                align="center"
                >
                <template slot-scope="props">
                    <el-button type="text" >{{props.row.title}}</el-button>
                </template>
            </el-table-column>
            <el-table-column
                label="封面"
                align="center"
                width="80"
                >
                <template slot-scope="props">
                    <avator class="header-avator"   size="60">
                            <img :src="props.row.subPic" alt="">
                    </avator>
                </template>
            </el-table-column>
            <el-table-column
                width="100"
                label="发布人"
                align="center"
                prop="author">
            </el-table-column>
            <el-table-column
                width="100"
                label="来源"
                align="center"
                prop="origin">
            </el-table-column>
            <el-table-column
                width="160"
                label="更新时间"
                align="center"
                prop="time">
            </el-table-column>

            <el-table-column
                label="状态"
                width="160"
                align="center"
                >
                <template slot-scope="props">
                    <el-tag class="table-tag">标签一</el-tag>
                    <el-tag type="success" class="table-tag">标签二</el-tag>
                    <!-- <el-tag type="info" class="table-tag">标签三</el-tag> -->
                </template>
            </el-table-column>
            <el-table-column label="操作" width="200" align="center">
                 <template slot-scope="props">
                     <el-button type="text" size="small" title="编辑用户">预览</el-button>
                     <el-button type="text" size="small" title="重置密码">发布</el-button>
                     <el-button type="text" size="small" title="重置密码">置顶</el-button>
                     <el-button type="text" size="small" title="编辑用户">编辑</el-button>
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
import userDialog from '@/pages/main/system/notice/Dialog.vue' // 添加组件
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
        nid: 'aaa',
        num: 1,
        title: 'sssss',
        subTitle: 'sssssss',
        author: '左龙飞',
        subPic: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539796759206&di=7baf05afe2361700ca63506e9c9405c0&imgtype=0&src=http%3A%2F%2Fs6.sinaimg.cn%2Fthumb180%2F51267fc5tdf6b5c96b995',
        time: '2018-10-22 16:51:23',
        stickTop: false,
        pv: 1,
        origin: '国土资源局',
        status: 1
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
.table-tag
    margin-right 10px;
</style>
