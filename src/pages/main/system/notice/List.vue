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
                <el-button type="primary"  size="medium" icon="el-icon-circle-plus-outline" class="single-add" @click="showAddArticle" v-show="!checkedList.length">添加</el-button>
                <el-button-group v-show="checkedList.length">
                    <el-button type="primary"  size="medium" icon="el-icon-circle-plus-outline" @click="showAddArticle">添加</el-button>
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
            :data="dataList"
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
                label="封面"
                align="center"
                width="80"
                >
                <template slot-scope="props">
                    <avator class="header-avator"   size="48">
                            <img :src="props.row.subPic" alt="">
                    </avator>
                </template>
            </el-table-column>
            <el-table-column
                label="标题"
                align="center"
                min-width="200"
                >
                <template slot-scope="props">
                    <el-button type="text" >{{props.row.title}}</el-button>
                </template>
            </el-table-column>
            <el-table-column
                label="分类"
                align="center"
                min-width="100"
                >
                <template slot-scope="props">
                    {{props.row.category}}
                </template>
            </el-table-column>
            <el-table-column
                label="标签"
                align="center"
                min-width="100"
                >
                <template slot-scope="props">
                    <el-tag class="table-tag" size="small" v-for="item in props.row.tag" :key="item">{{item}}</el-tag>
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
                width="170"
                label="发布时间"
                align="center"
                prop="time">
            </el-table-column>

            <el-table-column
                label="状态"
                width="140"
                align="center"
                >
                <template slot-scope="props">
                    <el-tag class="table-tag" type="success" size="small" v-if="props.row.status == 2" >发布</el-tag>
                    <el-tag class="table-tag" type="info" size="small" v-else>草稿</el-tag>
                    <el-tag class="table-tag" size="small" v-if="props.row.recommend == 1" >推荐</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="200" align="center">
                 <template slot-scope="props">
                     <el-button type="text" size="small" :title="props.row.status==2 ? '草稿':'发布'" @click="changeArticleStatus({aid:props.row.aid,status:props.row.status==2?1:2})">{{props.row.status==2 ? '草稿':'发布'}}</el-button>
                     <el-button type="text" size="small" :title="props.row.recommend ? '取消推荐':'推荐'" @click="changeArticleStatus({aid:props.row.aid,recommend:props.row.recommend ?0:1})">{{props.row.recommend ? '取消推荐':'推荐'}}</el-button>
                      <br/>
                     <el-button type="text" size="small" title="预览文章">预览</el-button>
                     <el-button type="text" size="small" title="编辑用户" @click="showEditorArticle(props.row)">编辑</el-button>
                     <el-button type="text" size="small" title="删除用户" @click="deleteArticle({aid:props.row.aid,isDel:1})">删除</el-button>

                 </template>
            </el-table-column>
        </el-table>

        </div>
        <div class="pagination-wrap">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="pageSize"
            layout="prev, pager, next, jumper,total, sizes"
            :total="total">
            </el-pagination>
        </div>
        <!-- 用户添加编辑组件 -->
        <article-dialog :open.sync="openDialog" @success="getPageList"  :type.sync="dialogType" :article="selectInfo"  />
    </div>
</template>
<script>
import articleDialog from '@/pages/main/system/notice/Dialog.vue' // 添加组件
import avator from '@/components/Avator.vue' // 头像组件
export default {
  name: 'usersList',
  components: {
    articleDialog,
    avator
  },
  data () {
    return {
      openDialog: false,
      dialogType: 'add',
      checkedList: [],
      select: '',
      input5: '',
      currentPage: 1,
      pageSize: 10,
      total: 0,
      dataList: [],
      selectInfo: null
    }
  },
  created () {
    this.getPageList()
  },
  methods: {
    handleSelectionChange (val) {
      console.log(val)
      this.checkedList = val
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.getPageList()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.getPageList()
    },
    getPageList () {
      const param = {
        pageSize: this.pageSize,
        page: this.currentPage
      }
      this.$apis.article.getArticleList(param)
        .then(res => {
          if (res.code == 200 && res.data.lists && res.data.lists.length) {
            this.dataList = res.data.lists.map(el => {
              el.tag = JSON.parse(el.tag)
              return el
            })
            this.total =  res.data.total
          } else {
            this.$message({
              message: res.msg,
              type: 'error',
              duration: 1000
            })
          }
        })
        .catch(err => {
          if (err) {
            console.log(err)
          }
        })
    },
    showEditorArticle (info) {
      this.dialogType = 'editor'
      this.selectInfo = info
      if (this.openDialog) {
        this.openDialog = false
      }
      this.openDialog = true
    },
    showAddArticle () {
      this.dialogType = 'add'
      if (this.openDialog) {
        this.openDialog = false
      }
      this.openDialog = true
    },
    deleteArticle (param) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.changeArticleStatus(param)
      })
    },
    changeArticleStatus (param) {
      this.$apis.article.updateArticleStatus(param).then(res => {
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            type: 'success',
            duration: 1000
          })
          this.getPageList()
        } else {
          this.$message({
            message: res.msg,
            type: 'error',
            duration: 1000
          })
        }
      }).catch(err => {
        if (err) {
          console.log(err)
        }
      })
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
