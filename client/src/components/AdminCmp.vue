<template>
  <section class="admin-panel">
    <el-row>
      <el-col :sm="24" :md="17">
        <control-panel></control-panel>
        <kid-edit v-if="isEditMode" :kid="kidToEdit" @closeEdit="toggleEditMode"></kid-edit>
        <kid-list v-if="!isEditMode" @edit="setEditMode"></kid-list>
      </el-col>
      <el-col :md="7">
        <!--<h1>Notification panel</h1>-->
        <side-bar></side-bar>
      </el-col>
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
      isEditMode: false,
      kidToEdit: null
    }
  },
  methods: {
    setEditMode(kid) {
      this.toggleEditMode()
      this.kidToEdit = kid
    },
    toggleEditMode() {
      this.isEditMode = !this.isEditMode
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
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  background: lightblue;
  padding: 2em;
  min-height: 100vh;
}

@media screen and (max-width: $sm) {

}
</style>
