<template>
  <div class="page">
    <div
      v-for="(it,i) in list"
      :key="i"
    >page1-list-{{i}}
      <router-link to="page2">page2</router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    const list = []
    list.length = 1000
    return {
      list: list
    }
  }
}
</script>
<style scoped>
.page {
  height: 100vh;
  overflow: auto;
}
</style>