
export default {
  groupId: [
    { trigger: 'change', required: true, message: '请选择所属模块' }
  ],
  name: [
    { trigger: 'blur', required: true, message: '请输入接口名称' }
  ],
  path: [
    { type: 'string', required: true, trigger: 'blur', message: '请输入接口路径' }
  ],
  weight: [
    { trigger: 'blur', required: true, message: '请输入排序权重' },
    { type: 'number', message: '排序必须为数字值' }
  ],
  description: [
    { type: 'string', trigger: 'blur',  message: '请输入接口描述' }
  ]
}
