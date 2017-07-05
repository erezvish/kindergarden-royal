<template>
  <section class="kid-list">
    <h1> Kid List Area </h1>
    <kid-details v-for="kid in kids" :key="kid.id"></kid-details>
  </section>
</template>

<script>
import KidDetails from './KidDetails'
export default {
  name: 'kid-list',
  components: {
    KidDetails
  },
  data() {
    return {
      kids: [
        { _id: 1, name: 'kid1' },
        { _id: 2, name: 'kid2' },
        { _id: 3, name: 'kid3' }
      ] //Temporary for connections
    }
  }
}
</script>

<style lang="scss" scoped>
.kid-list {
  background: blue;
}
</style>
