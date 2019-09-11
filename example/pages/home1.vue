<template>
  <div>
    <div>home1</div>
    <input />
    <router-link to="page1">page1</router-link>
  </div>

</template>
<script>
export default {
  created() {
    console.log(this.$router)
    console.log(this.$route)
  }
}
</script>