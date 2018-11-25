/*
 * @Description: 通知公告 添加修改
 * @Author: Long maomao
 * @Date: 2018-10-22 14:47:25
 * @LastEditors: Long maomao
 * @LastEditTime: 2018-10-23 17:44:15
 * @Email: zlf@zuolongfei.me
 */

<template>
    <el-dialog :title="dialogTitle" :visible.sync="dialogOpen"   width="850px">
        <div class="user-dialog-body">
            <el-form ref="apiForm" :model="Info" :rules="apiRules" label-width="85px" label-position='right' size="medium">

                <el-form-item label="公告标题" prop="title" >
                    <el-input v-model.trim="Info.title" placeholder="请输入标题"></el-input>
                </el-form-item>
                <el-form-item label="公告摘要" prop="subTitle" >
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}" v-model.trim="Info.introduction" placeholder="请输入摘要"></el-input>
                </el-form-item>
                <el-form-item label="设置封面" prop="avator">
                    <el-upload
                        class="avatar-uploader"
                        action="/admin/common/upload"
                        name="file"
                        :show-file-list="false"
                        :on-preview="handlePictureCardPreview"
                        :on-success="handleAvatarSuccess">
                        <img v-if="Info.subPic" :src="Info.subPic" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="作者名称" prop="author" class="float-label">
                    <el-input v-model.trim="Info.author" placeholder="请输入作者名称"></el-input>
                </el-form-item>
                <el-form-item label="发布时间" prop="time" class="float-label">
                    <el-date-picker
                    v-model="Info.time"
                    type="datetime"
                    placeholder="选择日期时间"
                    align="right"
                    :default-value = "new Date()"
                    :picker-options="pickerOptions1">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="公告来源" prop="origin" class="float-label">
                    <el-input v-model.trim="Info.origin" placeholder="请输入公告来源"></el-input>
                </el-form-item>

                <el-form-item label="排序权重" prop="weight" class="float-label">
                    <el-input v-model.number="Info.weight" placeholder="请输入排序权重"></el-input>
                </el-form-item>
                <el-form-item label="文章类别" prop="cate" class="float-label">
                    <el-select v-model="Info.category" clearable placeholder="请选择">
                      <el-option
                        label="文章类别1"
                        value="cate1">
                      </el-option>
                      <el-option
                        label="文章类别2"
                        value="cate2">
                      </el-option>
                      <el-option
                        label="文章类别3"
                        value="cate3">
                      </el-option>
                    </el-select>
                </el-form-item>
                <div class="clear"></div>
                <el-form-item label="文章标签" prop="tag" >
                   <el-tag
                      :key="tag"
                      v-for="tag in Info.tag"
                      closable
                      :disable-transitions="false"
                      @close="handleClose(tag)">
                      {{tag}}
                    </el-tag>
                    <el-input
                      class="input-new-tag"
                      v-if="newTagVisible"
                      v-model.trim="newTag"
                      ref="saveTagInput"
                      size="small"
                      @keyup.enter.native="handleInputConfirm"
                      @blur="handleInputConfirm"
                    >
                    </el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+新标签</el-button>
                </el-form-item>

                <div style="clear:both;"></div>
                <el-form-item label="公告正文" prop="noticeContent">
                    <div class="dialog-editor-wrap">
                        <vue-editor v-model="Info.content" :options="editorOptions"></vue-editor>
                    </div>
                </el-form-item>
                <el-form-item label="是否推荐" prop="enable">
                    <el-radio-group v-model="Info.recommend">
                        <el-radio :label="1" >开启</el-radio>
                        <el-radio :label="0">关闭</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item style="margin-bottom:0;">
                    <el-button type="primary" @click="onSubmit('publish')">发布</el-button>
                    <el-button type="info" @click="onSubmit('draft')">草稿</el-button>
                    <el-button type="success" >预览</el-button>
                    <el-button  @click="restForm">重置</el-button>
                    <el-button  @click="closeDialog">取消</el-button>
                </el-form-item>

            </el-form>
        </div>
    </el-dialog>
</template>
<script>

// 菜单基本信息
import apiRules from './apiRules.js'
import vueEditor from '@/components/Editor.vue'
const Info = {
  aid: '', // ID
  title: '', // 标题
  introduction: '', // 摘要
  category: '', // 分类
  tag: [], // 标签
  content: '', // 正文
  author: '', // 作者
  subPic: '', // 封面
  time: new Date(), // 更新时间
  recommend: 0, // 是否置顶
  weight: 0, // 排序
  origin: '' // 来源
}
// 默认传入的用户信息
const defaultInfo = JSON.parse(JSON.stringify(Info))
const editorOptions = {
  uploadImgServer: '/admin/common/upload',
  uploadFileName: 'file',
  uploadImgHooks: {
    customInsert (insertImg, result, editor) {
      // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
      // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

      // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
      var url = result.data.imgUrl
      insertImg(url)

      // result 必须是一个 JSON 格式字符串！！！否则报错
    }
  }
}
export default {
  name: 'apiDialog',
  components: {
    vueEditor
  },
  data () {
    return {
      Info,
      apiRules,
      editorOptions,
      dialogOpen: false,
      newTag: '',
      newTagVisible: false,
      pickerOptions1: {
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      }
    }
  },
  props: {
    // 显示内容 add 新增 editor 编辑
    type: {
      type: String,
      default: 'add' // add or editor
    },
    // 控制模态框开关
    open: {
      type: Boolean,
      default: false
    },
    article: {
      type: Object,
      default: null
    }
  },
  methods: {
    // 关闭对话框
    closeDialog () {
      this.dialogOpen = false
    },
    // 进行表单校验
    onSubmit (type) {
      this.$refs['apiForm'].validate((valid) => {
        if (valid) {
          this.doSubmitData(type)
        }
      })
    },
    // 表单进行数据提交
    doSubmitData (status) {
      const params = { ...this.Info }
      if (this.type == 'add') {
        delete params['aid']
      }
      params.status = status == 'publish' ? 2 : 1
      params.optionType = this.type == 'add' ? 'add' : 'editor'
      this.$apis.article.addOrUpdateArticle(params)
        .then(res => {
          console.log(res)
          if (res.code == 200) {
            // 成功之后消息提醒
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 1000
            })
            this.$emit('success')
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
    /**
     * @description: 重置表单信息
     */
    restForm () {
      if (this.type === 'add') {
        this.Info = JSON.parse(JSON.stringify(defaultInfo))
      } else {
        this.Info = JSON.parse(JSON.stringify(this.article))
      }
      console.log(this.Info)
    },
    /**
     * @description: 改变菜单层级
     */
    changPathDeep (node, instanceId) {
      this.Info.pathDeep = node.level
    },
    handleAvatarSuccess (res, file) {
      if (res.code == 200) {
        this.Info.subPic = res.data.imgUrl
      }
    },
    handlePictureCardPreview (file) {
      this.Info.subPic = file.url
    },
    handleClose (tag) {
      this.Info.tag.splice(this.Info.tag.indexOf(tag), 1)
    },
    showInput () {
      this.newTagVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm () {
      let inputValue = this.newTag
      if (inputValue) {
        this.Info.tag.push(inputValue)
      }
      this.newTagVisible = false
      this.newTag = ''
    }
  },
  mounted () {
    this.Info.author = this.userInfo.userName
    console.log(this.Info)
    console.log(this.type)
  },
  computed: {
    /**
     * @description:变化标题
     */
    dialogTitle () {
      return this.type === 'add' ? '创建文章' : '编辑文章'
    },

    /**
     * @description 获取用户信息
     */
    userInfo () {
      return this.$store.state.user.info
    }
  },
  watch: {
    dialogOpen (val) {
      if (!val) {
        this.Info = JSON.parse(JSON.stringify(defaultInfo))
        this.$refs['apiForm'].resetFields()
        // 同步open状态解决多次点击问题
        this.$emit('update:type', 'add')
      }
      this.$emit('update:open', val)
    },
    // 监听对话框
    open (val) {
      if (val) {
        this.dialogOpen = val
      }
    },
    // 监控是添加还是编辑
    type (val, old) {
      if (val != 'add') {
        this.Info =  JSON.parse(JSON.stringify(this.article))
        console.log(this.Info)
      }
    }

  }
}
</script>
<style lang="stylus" scoped>
 .el-tag {
    margin-right: 10px;
  }
  .button-new-tag {
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    vertical-align: bottom;
  }
.user-dialog-body {
    max-width: 980px;
    margin: 0 auto;
}

.float-label {
    width: 50%;
    float: left;
}
.float-label .el-select{
  width 100%;
}
>>> .el-checkbox+.el-checkbox {
    margin-left: 0;
}

.el-checkbox {
    padding-right: 10px;
}

.avatar-uploader {
    width: 60px;
    height: 60px;
}

>>> .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

>>> .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

>>> .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
}

>>> .avatar {
    width: 60px;
    height: 60px;
    display: block;
}

>>> .el-select .el-input {
    width: 100%;
}

>>> .vue-treeselect__control {
    border-radius: 2px;
    border: 1px solid #dcdfe6;
    height: 34px;
    line-height: 34px;
}

>>> .vue-treeselect__control:focus, .vue-treeselect__control:active {
    border-color: #409EFF;
    outline: 0;
}

>>> .vue-treeselect__menu {
    border-bottom-right-radius: 2px;
    border-bottom-left-radius: 2px;
}
.dialog-editor-wrap
 width 100%
>>> .w-e-toolbar
    flex-wrap: wrap;
</style>
