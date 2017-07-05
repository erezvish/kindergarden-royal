<template>
  <section class="admin-cmp">
<h1> Admin </h1>
<admin-content></admin-content>
<admin-navbar></admin-navbar>
    </section>
</template>

<script>
import AdminContent from './AdminContent'
import AdminNavbar from './AdminNavbar'
export default {
  name: 'admin-cmp',
  components: {
    AdminContent,
    AdminNavbar
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>

.admin-cmp {
  background: cornsilk;
}
</style>
