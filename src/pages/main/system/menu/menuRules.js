
export default {
  parentNode: [
    { trigger: 'change', required: true, message: '请选择上级菜单' }
  ],
  name: [
    { trigger: 'blur', required: true, message: '请输入菜单名称' }
  ],
  path: [
    { type: 'string', trigger: 'blur', message: '请输入菜单路径' }
  ],
  icon: [
    { type: 'string', trigger: 'blur',  message: '请输入菜单图标' }
  ],
  weight: [
    { trigger: 'blur', required: true, message: '请输入排序权重' },
    { type: 'number', message: '排序必须为数字值' }
  ],
  description: [
    { type: 'string', trigger: 'blur',  message: '请输入菜单描述' }
  ]
}
