<template>
  <header>
    <h1> Header Component </h1>
    <router-link class="router-link" to="/"> Home </router-link>
    <router-link class="router-link" to="/admin"> Admin </router-link>
  
  </header>
</template>

<script>
export default {
  name: 'header-cmp',
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  background: lightgreen;
}
.router-link {
  margin: 1em;
}
</style>
