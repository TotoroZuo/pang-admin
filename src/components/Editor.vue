/*
 * @Description: 富文本编辑器
 * @Author: Long maomao
 * @Date: 2018-10-23 16:44:36
 * @LastEditors: Long maomao
 * @LastEditTime: 2018-10-23 18:00:42
 * @Email: zlf@zuolongfei.me
 */
<template>
    <div ref="editor"></div>
</template>
<script>
import E from 'wangeditor'
export default {
  name: 'vue-editor',
  data () {
    return {
      editor: null,
      editorContent: ''
    }
  },
  props: {
    options: Object,
    value: String
  },
  mounted () {
    this.cereateEditor()
  },
  methods: {
    cereateEditor () {
      this.editor = new E(this.$refs.editor)
      if (Object.keys(this.options).length) {
        this.editor.customConfig = { ...this.options }
      }
      this.editor.customConfig.onchange = (html) => {
        this.editorContent = html
        this.$emit('input', html)
      }
      this.editor.create()
      this.editor.txt.html(this.value)
    }
  },
  beforeDestroy () {
    this.editor = null
  }
}
</script>
<style lang="stylus" scoped>
  >>> .w-e-text-container
        height 200px!important
</style>
