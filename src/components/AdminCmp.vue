<template>
  <section class="admin-cmp">
<h1> Admin </h1>
<admin-content></admin-content>
<admin-sidebar></admin-sidebar>
    </section>
</template>

<script>
import AdminContent from './AdminContent'
import AdminSidebar from './AdminSidebar'
export default {
  name: 'admin-cmp',
  components: {
    AdminContent,
    AdminSidebar
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
