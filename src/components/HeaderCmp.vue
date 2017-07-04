<template>
  <header>
    <h1> Header Component </h1>
    <router-link to="/admin"> Goto Admin </router-link>
    
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

<style scoped>
  header {
    background: lightgreen;
  }
</style>
