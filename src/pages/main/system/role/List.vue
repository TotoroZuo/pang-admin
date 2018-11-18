<template>
    <div class="role-container">
        <div class="role-list-left">
            <div class="role-left-title">
                <span class="role-title-content">角色管理</span>
                <el-button style="float: right; padding: 3px 0; margin-top:22px;" type="text" @click="showAddRole">创建角色</el-button>
            </div>
            <div class="role-left-list">
                <ul class="role-list-box">
                    <draggable v-model="roleList">
                        <transition-group name="drag-list">
                            <li v-for="element in roleList" :key="element.id" @click="doChooseRole(element.id)" :class="{'role-list-active':element.id==chooseRole? true : false}">
                                {{element.name}}
                            </li>
                        </transition-group>
                    </draggable>
                    <!-- <li >
                        鼠标悬浮时显示

                    </li>
                    <li class="role-list-active">
                        鼠标悬浮时显示
                    </li>
                    <li>
                        鼠标悬浮时显示
                    </li> -->
                </ul>
            </div>

        </div>
        <div class="role-list-right">
            <!-- 没有选择时显示内容 -->
            <!-- <div class="role-note">
                <div>
                    <p class="role-note-title">角色管理说明：</p>
                    <p class="role-note-desc">1、点击添加新建角色</p>
                    <p class="role-note-desc">2、拖动角色调整排序</p>
                    <p class="role-note-desc">3、角色控制菜单权限以及接口权限</p>
                </div>
            </div> -->
            <!-- 添加显示内容 -->
            <div class="role-add-box">
                <div class="role-add-head">
                    <span class="role-add-head-item">角色名称：</span>
                    <span class="role-add-head-item">
                        <el-input v-model="roleName" size="medium" placeholder="请输入角色名称"></el-input>
                    </span>
                    <span class="role-add-head-item">
                        <el-button class="role-add-btns" type="primary" size="medium " v-show="!chooseRole">确认</el-button>
                        <el-button-group class="role-add-btns" v-show="chooseRole">
                            <el-button type="primary" size="medium" >修改</el-button>
                            <el-button type="primary" size="medium" >删除</el-button>
                        </el-button-group>
                    </span>
                </div>
                <div class="role-add-content">
                    <el-tabs type="border-card">
                        <el-tab-pane label="菜单权限">
                            <div class="authority-box">
                                <div class="authority-label">
                                    <fieldset class="layui-elem-field layui-field-title site-title" style="margin-top:0px">
                                        <legend><a name="get">模块一</a></legend>
                                    </fieldset>
                                </div>
                                <div class="authority-item">
                                    <el-checkbox  label="备选项1" ></el-checkbox>
                                    <el-checkbox  label="备选项1" ></el-checkbox>
                                    <el-checkbox  label="备选项1" ></el-checkbox>
                                    <el-checkbox  label="备选项1" ></el-checkbox>
                                    <el-checkbox  label="备选项1" ></el-checkbox>
                                </div>
                                <div class="authority-label">
                                    <fieldset class="layui-elem-field layui-field-title site-title">
                                        <legend><a name="get">模块二</a></legend>
                                    </fieldset>
                                </div>
                                <div class="authority-item">
                                    <el-checkbox  label="备选项1" ></el-checkbox>
                                    <el-checkbox  label="备选项1" ></el-checkbox>
                                    <el-checkbox  label="备选项1" ></el-checkbox>
                                    <el-checkbox  label="备选项1" ></el-checkbox>
                                    <el-checkbox  label="备选项1" ></el-checkbox>
                                </div>

                                <div class="authority-label">
                                    <fieldset class="layui-elem-field layui-field-title site-title">
                                        <legend><a name="get">模块3</a></legend>
                                    </fieldset>
                                </div>
                                <div class="authority-item">
                                    <el-checkbox  label="备选项1" ></el-checkbox>
                                    <el-checkbox  label="备选项1" ></el-checkbox>
                                    <el-checkbox  label="备选项1" ></el-checkbox>
                                    <el-checkbox  label="备选项1" ></el-checkbox>
                                    <el-checkbox  label="备选项1" ></el-checkbox>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="接口权限">
                            <div class="authority-box">
                                <div class="authority-label">
                                    <fieldset class="layui-elem-field layui-field-title site-title" style="margin-top:0px">
                                        <legend><a name="get">模块一</a></legend>
                                    </fieldset>
                                </div>
                                <div class="authority-item">
                                    <el-checkbox  label="备选项1" ></el-checkbox>
                                    <el-checkbox  label="备选项1" ></el-checkbox>
                                    <el-checkbox  label="备选项1" ></el-checkbox>
                                    <el-checkbox  label="备选项1" ></el-checkbox>
                                    <el-checkbox  label="备选项1" ></el-checkbox>
                                </div>
                                <div class="authority-label">
                                    <fieldset class="layui-elem-field layui-field-title site-title">
                                        <legend><a name="get">模块二</a></legend>
                                    </fieldset>
                                </div>
                                <div class="authority-item">
                                    <el-checkbox  label="备选项1" ></el-checkbox>
                                    <el-checkbox  label="备选项1" ></el-checkbox>
                                    <el-checkbox  label="备选项1" ></el-checkbox>
                                    <el-checkbox  label="备选项1" ></el-checkbox>
                                    <el-checkbox  label="备选项1" ></el-checkbox>
                                </div>

                                <div class="authority-label">
                                    <fieldset class="layui-elem-field layui-field-title site-title">
                                        <legend><a name="get">模块3</a></legend>
                                    </fieldset>
                                </div>
                                <div class="authority-item">
                                    <el-checkbox  label="备选项1" ></el-checkbox>
                                    <el-checkbox  label="备选项1" ></el-checkbox>
                                    <el-checkbox  label="备选项1" ></el-checkbox>
                                    <el-checkbox  label="备选项1" ></el-checkbox>
                                    <el-checkbox  label="备选项1" ></el-checkbox>
                                </div>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import draggable from 'vuedraggable'
export default {
  name: 'roleList',
  components: {
    draggable
  },
  data () {
    return {
      roleName: '',
      chooseRole: '',
      roleList: [
        {
          id: 1,
          name: '角色一',
          active: false
        },
        {
          id: 2,
          name: '角色二',
          active: true
        },
        {
          id: 3,
          name: '角色三',
          active: false
        }
      ]
    }
  },
  methods: {
    doChooseRole (id) {
      this.chooseRole = id
    },
    showAddRole () {
      this.chooseRole = ''
    }
  }

}
</script>
<style lang="stylus" scoped>
.role-container
    display flex
    padding 20px
.role-list-left
    width 240px
    background #fff
    border 1px solid #ebeef5
.role-left-title
    padding 0 15px
    height 66px
    line-height 66px
.role-list-right
    flex 1
    border 1px solid #ebeef5
    border-left none
.role-list-box
    // width 100%
    margin 0
    padding 0
    list-style none
.role-list-box li
    text-align center
    padding 15px
    border-top 1px solid #ebeef5
    cursor move
    color #606266
.role-list-box li:last-child
    border-bottom 1px solid #ebeef5
.role-list-box li:hover
    color #303133
    background-color: #ecf5ff;
.role-list-box li.role-list-active
    -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    border 1px dashed #3a8ee6
    background-color: #ecf5ff;
    color #303133
.role-note p
    padding 5px 15px 0
    font-size 14px
.role-note-desc
    color #909399
.role-add-head-item
    display inline-block
    vertical-align top

.role-add-box
    font-size 16px
.role-add-head
    padding 0 30px
    height 66px
    line-height 66px
    border-bottom 1px solid #ebeef5
.role-add-btns
    margin-left 15px
.role-add-head >>> .el-button-group
    vertical-align top
    height 66px
    padding-top 15px
.role-add-content
    padding 30px
.role-add-content  >>>  .el-tabs--border-card
    box-shadow none
.authority-box
    padding 15px
.layui-elem-field {
    width 150px
    margin-bottom: 10px;
    padding: 0;
    border-width: 1px;
    border-style: solid;
    border-color #E4E7ED
}
.layui-elem-field legend {
    margin-left: 20px;
    padding: 0 10px;
    font-size: 16px;
    color rgba(0,0,0,0.87);
}
.layui-field-title {
    margin: 30px 0 30px;
    border-width: 1px 0 0;
}
.drag-list-move {
  transition: transform 1s;
}

</style>
