// 验证手机号
const validatPhone = function (rule, value, callback) {
  if (/^1[34578]\d{9}$/.test(value) == false) {
    callback(new Error('请输入正确的手机号'))
  } else {
    callback()
  }
}
// 校验身份证号
const validatIdcard = function IdentityCodeValid (rule, code, callback) {
  var city = { 11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江 ', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北 ', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏 ', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外 ' }
  var tip = ''
  var pass = true

  if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
    tip = '身份证号格式错误'
    pass = false
  } else if (!city[code.substr(0, 2)]) {
    tip = '地址编码错误'
    pass = false
  } else {
    // 18位身份证需要验证最后一位校验位
    if (code.length == 18) {
      code = code.split('')
      // ∑(ai×Wi)(mod 11)
      // 加权因子
      var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ]
      // 校验位
      var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ]
      var sum = 0
      var ai = 0
      var wi = 0
      for (var i = 0; i < 17; i++) {
        ai = code[i]
        wi = factor[i]
        sum += ai * wi
      }
      var last = parity[sum % 11]
      if (last != code[17]) {
        tip = '校验位错误'
        pass = false
      }
    }
  }
  if (!pass) {
    callback(new Error(tip))
  } else {
    callback()
  }
}
export default {
  account: [
    { trigger: 'blur', required: true, message: '请输入账号' },
    {
      min: 5,
      max: 25,
      message: '长度在 5 到 25 个字符'
    },
    {
      pattern: /^(\w){5,25}$/,
      message: '只能输入字母、数字、下划线'
    }
  ],
  password: [
    { trigger: 'blur', required: true, message: '请输入密码' },
    {
      min: 6,
      max: 10,
      message: '密码长度在 6 到 10 个字符'
    },
    {
      pattern: /^(\w){6,10}$/,
      message: '只能输入字母、数字、下划线'
    }
  ],
  name: [
    { trigger: 'blur', required: true, message: '请输入姓名' },
    {
      pattern: /^[\u4E00-\u9FA5]+$/,
      message: '姓名只能为中文'
    }
  ],
  phone: [
    { trigger: 'blur', required: true, message: '请输入手机号' },
    { validator: validatPhone, trigger: 'blur' }
  ],
  idcard: [
    { trigger: 'blur', required: true, message: '请输入身份证号' },
    { validator: validatIdcard, trigger: 'blur' }
  ],
  org: [
    { required: true, message: '请设置所属部门', trigger: 'change' }
  ],
  role: [
    { type: 'array', required: true, message: '请至少设置一个角色', trigger: 'change' }
  ]

}
