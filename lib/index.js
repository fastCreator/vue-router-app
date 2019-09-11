import vueRouter from 'vue-router'
import View from './components/view'
export default class vueRouterApp extends vueRouter {
  constructor (options) {
    super(options)
    this.pagesList = {
      tabBar: [],
      pages: []
    }
    this.afterHooks = [this.setRouter]
    this.listenPopstate()
  }
  setRouter = (to, from) => {
    const { tabBar, pages } = this.pagesList
    const matched = to.matched && to.matched[0]
    if (!matched) {
      return
    }
    const pageType = matched.meta.pageType
    const page = {
      key: matched.path,
      component: matched.components.default
    }
    if (pageType === 'tabBar') {
      this.addPage(tabBar, page, 'tabBar', from, to)
    } else {
      this.addPage(pages, page, 'page', from, to)
    }
  }
  addPage = (list, page, type, from, to) => {
    if (type === 'tabBar') {
      if (!list.find(it => it.key === page.key)) {
        list.push(page)
      }
      this.pagesList.pages = []
    } else {
      let oldPage = list.find(it => it.key === page.key)
      if (oldPage) {
        let index = list.indexOf(oldPage)
        list.splice(index + 1, list.length - index - 1)
      } else {
        list.push(page)
      }
    }
  }
  listenPopstate () {
    window.addEventListener('popstate', () => {
      if (this.currentRoute.meta.pageType === 'tabBar') {
        goHome()
        closeWin()
      }
    })
  }
  push (location, onComplete, onAbort) {
    let matchRoute = this.matcher.match(location)
    if (matchRoute.meta.pageType === 'tabBar') {
      // let lo = JSON.parse(JSON.stringify(location))
      // goHome()
      // setTimeout(() => {
      //   // alert(JSON.stringify(lo))
      //   this.history.replace(lo, onComplete, onAbort)
      // }, 0)
      this.history.replace(location, onComplete, onAbort)
    } else {
      this.history.push(location, onComplete, onAbort)
    }
  }
}

vueRouterApp.install = function (Vue) {
  vueRouter.install(Vue)
  Vue.component('RouterView', View)
}

function goHome () {
  let len = window.history.length
  for (let i = 1; i < len; i++) {
    window.history.go(-1)
  }
}

function closeWin () {
  if (navigator.userAgent.indexOf('MicroMessenger') !== -1) {
    // 微信自带关闭当前页面.微信内打开的网页，关闭网页并且返回打开的地方。需要用微信自己的js关闭，这个很好用。
    window.WeixinJSBridge.call('closeWindow')
  } else if (
    navigator.userAgent.indexOf('Chrome') !== -1 ||
    navigator.userAgent.indexOf('Firefox') !== -1 ||
    navigator.userAgent.indexOf('UCBrowser') !== -1
  ) {
    // 谷歌火狐UC ，其中谷歌55版本以后就不支持关闭当前页了吧，所以跳转至空白页。然后就是uc，uc浏览器（手机）已经放弃了。无法关闭当前页，无法跳转空白页，巨坑比。苹果的浏览器倒是很好用，可以关闭也可以跳转至空白页。
    window.location.href = 'about:blank'
    window.close()
  } else {
    // 这个其他浏览器
    window.opener = null
    window.open('', '_self', '') // 其他浏览器
    window.close()
  }
}
