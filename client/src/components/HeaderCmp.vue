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
* {
  outline: 1px solid #333;
}

h1 {
  margin: 0;

}
header {
  display: flex;
  justify-content: flex-start;
  background: lightgreen;
  height: 5em;
}
.router-link {
  margin: 1em;
}
</style>
