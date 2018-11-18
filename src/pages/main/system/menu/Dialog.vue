/*
 * @Description: 菜单添加修改模态框
 * @Author: Long maomao
 * @Date: 2018-10-22 14:47:25
 * @LastEditors: Long maomao
 * @LastEditTime: 2018-10-22 16:24:38
 * @Email: zlf@zuolongfei.me
 */

<template>
    <el-dialog :title="dialogTitle" :visible.sync="dialogOpen"   width="600px">
        <div class="user-dialog-body">
            <el-form ref="menuForm" :model="Info" :rules="menuRules" label-width="85px" label-position='right' size="medium">
                <el-form-item label="上级菜单" prop="parentNode" class="float-label">
                    <!-- <el-input v-model="Info.parentNode" placeholder="上级菜单"></el-input> -->
                    <treeselect v-model="Info.parentNode" @select="changPathDeep"  :multiple="false" :options="menuTreeData" placeholder="上级菜单" />
                </el-form-item>
                <el-form-item label="菜单层级" prop="pathDeep" class="float-label">
                    <el-select v-model="Info.pathDeep" class="selectOrg" placeholder="菜单层级" disabled >
                    <el-option label="一级菜单" :value="1">一级菜单</el-option>
                    <el-option label="二级菜单" :value="2">二级菜单</el-option>
                    <el-option label="三级菜单" :value="3">三级菜单</el-option>
                    <el-option label="四级菜单" :value="4">四级菜单</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="菜单名称" prop="name" class="float-label">
                    <el-input v-model="Info.name" placeholder="菜单名称"></el-input>
                </el-form-item>
                <el-form-item label="菜单图标" prop="icon" class="float-label">
                    <el-input v-model="Info.icon" placeholder="请输入菜单图标名称"></el-input>
                </el-form-item>
                <el-form-item label="排序权重" prop="weight" class="float-label">
                    <el-input v-model="Info.weight" placeholder="请输入排序权重"></el-input>
                </el-form-item>
                <el-form-item label="菜单描述" prop="description" class="float-label">
                    <el-input v-model="Info.description" placeholder="菜单描述"></el-input>
                </el-form-item>
                 <div style="clear:both;"></div>
                <el-form-item label="访问地址" prop="path">
                    <el-input v-model="Info.path" placeholder="菜单访问地址"></el-input>
                </el-form-item>

                <el-form-item label="打开方式" prop="openType">
                    <el-radio-group v-model="Info.openType">
                    <el-radio label="_self" >本页</el-radio>
                    <el-radio label="_blank">新窗口</el-radio>
                    </el-radio-group>
                </el-form-item>
                <div style="clear:both;"></div>
                <el-form-item label="启用状态" prop="enable">
                    <el-switch v-model="Info.enable" active-color="#13ce66" inactive-color="#C0CCDA" ></el-switch>
                </el-form-item>

                <el-form-item style="margin-bottom:0;">
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                    <el-button type="primary" @click="restForm">重置</el-button>
                    <el-button  @click="closeDialog">取消</el-button>
                </el-form-item>

            </el-form>
        </div>
    </el-dialog>
</template>
<script>
// import the component
import Treeselect from '@riophae/vue-treeselect'
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
// 菜单基本信息
import menuRules from './menuRules.js'
const Info = {
  mid: '', // 菜单id
  parentNode: null, // 父级菜单
  name: '', // 菜单名称
  path: '', // 访问地址
  pathDeep: 1, // 菜单层级
  icon: '', // 菜单图标
  weight: 0, // 菜单排序
  openType: '_self', // 打开方式 _self 本页 _blank 新窗口
  enable: true,
  description: '' // 菜单描述
}
// 默认传入的用户信息
const defaultInfo = { ...Info }
export default {
  name: 'menuDialog',
  components: {
    Treeselect
  },
  data () {
    return {
      dialogOpen: false,
      Info,
      menuRules,
      menuTreeData: [ {
        id: 'a',
        label: 'a',
        level: 1,
        children: [ {
          id: 'aa',
          label: 'aa',
          level: 2
        }, {
          id: 'ab',
          label: 'ab',
          level: 2
        } ]
      }, {
        id: 'b',
        label: 'b',
        level: 1
      }, {
        id: 'c',
        label: 'c',
        level: 1
      } ]
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
    }
  },
  methods: {
    // 关闭对话框
    closeDialog () {
      this.dialogOpen = false
    },
    // 进行表单校验
    onSubmit () {
      this.$refs['menuForm'].validate((valid) => {
        if (valid) {
          this.doSubmitData()
        }
      })
    },
    // 表单进行数据提交
    doSubmitData () {
      const params = { ...this.Info }
      if (this.type == 'add') {
        delete params['mid']
      }
    },
    /**
     * @description: 重置表单信息
     */
    restForm () {
      if (this.type === 'add') {
        this.Info = defaultInfo
      } else {
        this.Info = { ...this.selectInfo }
      }
    },
    /**
     * @description: 改变菜单层级
     */
    changPathDeep (node, instanceId) {
      this.Info.pathDeep = node.level
    }
  },
  computed: {
    /**
     * @description:变化标题
     */
    dialogTitle () {
      return this.type === 'add' ? '创建菜单' : '编辑菜单'
    },
    /**
     * @description 获取选中菜单详情
     */
    selectInfo () {
      return this.$store.state.options.selectMenu
    }
  },
  watch: {
    dialogOpen (val) {
      if (!val) {
        this.Info = defaultInfo
        this.$refs['menuForm'].resetFields()
        // 同步open状态解决多次点击问题
        this.$emit('update:open', false)
        this.$emit('update:type', 'add')
      }
    },
    // 监听模态框开关
    open (val) {
      if (val) {
        this.dialogOpen = true
      }
    },
    // 监控是添加还是编辑
    type (val) {
      if (val == 'add') {
        this.Info = defaultInfo
      } else {
        this.Info = { ...this.selectInfo }
      }
    },
    'Info.parentNode' (val) {
      if (!val) {
        this.Info.pathDeep = 1
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.user-dialog-body {
    max-width: 980px;
    margin: 0 auto;
}
.float-label
    width 50%;
    float left ;

>>> .el-checkbox+.el-checkbox {
    margin-left: 0;
}

.el-checkbox {
    padding-right: 10px;
}
.avatar-uploader
    width 60px
    height 60px
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
>>> .el-select .el-input
    width 100%;
>>> .vue-treeselect__control
    border-radius 2px
    border: 1px solid #dcdfe6;
    height 34px;
    line-height 34px;
>>> .vue-treeselect__control:focus,.vue-treeselect__control:active{
        border-color: #409EFF;
        outline: 0;
    }
>>> .vue-treeselect__menu
        border-bottom-right-radius:2px;
        border-bottom-left-radius:2px;
</style>
