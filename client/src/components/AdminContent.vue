<template>
  <section class="admin-content">
    <h1> Admin Main Content Area </h1>
    <kid-list> </kid-list>
  </section>
</template>

<script>

import KidList from './KidList'

export default {
  name: 'admin-content',
    components: {
    KidList
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
  display: flex;
  flex-direction: column;
}
</style>
