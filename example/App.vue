<template>
  <div id="app">
    <router-view>

    </router-view>
    <van-tabbar
      v-if="$route.meta.pageType === 'tabBar'"
      route
    >
      <van-tabbar-item
        icon="home-o"
        to="/"
      >首页1</van-tabbar-item>
      <van-tabbar-item
        icon="search"
        to="/home2"
      >首页2</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style lang="less">
</style>
