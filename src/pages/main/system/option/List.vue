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
            <div class="search-right">
                <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
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
                label="序号"
                width="60"
                align="center"
            >
                <template slot-scope="props">
                    {{props.$index + 1}}
                </template>
            </el-table-column>
            <el-table-column
                label="操作人员"
                align="center"
                 width="120"
                >
                <template slot-scope="props">
                    <el-button type="text" >{{props.row.operater}}</el-button>
                </template>
            </el-table-column>
            <el-table-column
                label="操作帐号"
                 width="120"
                align="center"
                prop="account">
            </el-table-column>
            <el-table-column
                label="日志内容"
                align="center"
                prop="content">
            </el-table-column>
            <el-table-column
                label="操作路径"
                align="center"
                prop="path">
            </el-table-column>
            <el-table-column
                label="IP地址"
                width="160"
                align="center"
                prop="ip">
            </el-table-column>
            <el-table-column
                label="终端类型"
                width="160"
                align="center"
                prop="brower">
            </el-table-column>
            <el-table-column
                label="操作时间"
                 width="160"
                align="center"
                prop="time">
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
    </div>
</template>
<script>

export default {
  name: 'usersList',
  data () {
    return {
      select: '',
      input5: '',
      currentPage4: 1,
      tableData5: [{
        lid: 'aaa',
        num: 1,
        account: 'sssss',
        path: 'backend/comment/index',
        brower: 'Mozilla/5.0',
        ip: '183.62.227.50',
        time: '2018-10-23 23:57:60',
        operater: '做龙飞',
        content: 1
      }
      ]
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
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
