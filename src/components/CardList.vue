<template>
  <section class="card-list">
    <h1> Card List Area </h1>
    <card-details v-for="card in cards" :key="card._id"></card-details>
  </section>
</template>

<script>
import CardDetails from './CardDetails'
export default {
  name: 'card-list',
  components: {
    CardDetails
  },
  data() {
    return {
      cards: [
        { _id: 1, name: 'card1' },
        { _id: 2, name: 'card2' },
        { _id: 3, name: 'card3' }
      ] //Temporary for connections
    }
  }
}
</script>

<style lang="scss" scoped>
.card-list {
  background: blue;
}
</style>
