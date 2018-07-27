import ConfirmComponent from './confirm'
const Confirm = {}
/**
 * @method 注册插件
 * @param {Function} Vue构造器
 */

Confirm.install = (Vue) => {
  const ConfirmConstructor = Vue.extend(ConfirmComponent)
  const instance = new ConfirmConstructor() // 创建confirm 子实例
  instance.$mount(document.createElement('div')) // 挂载实例到DOM上
  document.body.appendChild(instance.$el)
  /**
 * @method 提示框
 * @param {String} title 标题
 * @param {String} type 标题的颜色
 * @param {String} text 内容
 * @param {String} cancelText 是否有返回键
 * @param {Function} cancel 返回
 * @param {Function} confirm 确认
 */
  //  添加实例方法，以供全局调用
  Vue.prototype.$confirm = (confirmParams) => {
    instance.show = true // 调用$confirm()则显示提示
    instance.title = confirmParams.title ? confirmParams.title : instance.title
    instance.type = confirmParams.type
    instance.text = confirmParams.text
    instance.cancelText = confirmParams.cancelText ? confirmParams.cancelText : instance.cancelText
    instance.confirmFun = confirmParams.confirmFun
  }
}

export default Confirm
