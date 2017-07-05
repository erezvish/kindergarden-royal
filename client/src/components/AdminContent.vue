<template>
  <section class="admin-content">
    <h1> Admin Main Content Area </h1>
    <card-list> </card-list>
  </section>
</template>

<script>
import CardList from './CardList'
import kidService from '../services/kid.service'
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
    console.log('testingggg')
    kidService.userLogged();
  }
}
</script>

<style lang="scss" scoped>
.admin-content {
  background: firebrick;
}
</style>
