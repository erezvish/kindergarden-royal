<template>
  <section class="admin-panel">
    <el-row>
      <el-col :xs="24" :sm="24" :md="17">
        <!--<h1>Admin Panel </h1>-->
        <control-panel></control-panel>
        <!--<kid-list></kid-list>-->
        <kid-edit></kid-edit>
      </el-col>
      <!--<el-col :md="7">-->
      <!--<h1>Notification panel</h1>-->
      <side-bar></side-bar>
      <!--</el-col>-->
    </el-row>
  </section>
</template>

<script>
import KidList from './KidList'
import KidEdit from './KidEdit'
import ControlPanel from './ControlPanel'
import SideBar from './SideBar'

// import AdminContent from './AdminContent'
// import AdminSidebar from './AdminSidebar'
export default {
  name: 'admin-cmp',
  components: {
    KidList,
    KidEdit,
    ControlPanel,
    SideBar
    // AdminContent,
    // AdminSidebar
  },
  data() {
    return {

    }
  }
}
</script>


<style lang="scss" scoped>
@import "../sass/vars.scss";

.el-row {
  display: flex;
}

.admin-panel {
  // display: flex;
  // justify-content: flex-start;
  // flex-direction: column;
  background: lightblue;
  padding: 2em;
  min-height: 100vh;
}

</style>
