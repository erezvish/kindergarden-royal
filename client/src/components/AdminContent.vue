<template>
  <section class="admin-content">
    <h1> Admin Main Content Area </h1>
    <card-list> </card-list>
  </section>
</template>

<script>
import CardList from './CardList'
export default {
  name: 'admin-content',
    components: {
    CardList
  },
  data() {
    return {

    }
  },
  created() {
  }
}
</script>

<style lang="scss" scoped>
.admin-content {
  background: firebrick;
}
</style>
