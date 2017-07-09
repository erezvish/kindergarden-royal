<template>
  <section class="admin-panel" v-if="isAdmin">
    <h1> Admin Panel </h1>
    <el-row>
      
      <el-col :xs="24" :sm="24" :md="24">
        <!--<h1>Admin Panel </h1>-->
        <control-panel></control-panel>
        <kid-edit v-if="isEditMode" :kid="kidToEdit" @closeEdit="toggleEditMode"></kid-edit>
        <kid-list v-if="!isEditMode" @edit="setEditMode" @createKid="setEditMode"></kid-list>
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
      kidToEdit: null,
    }
  },
  computed: {
    emptyKid() {
      return this.$store.state.emptyKid
    },
    isAdmin() {
      return this.$store.state.isAdmin
    }
  },
  methods: {
    setEditMode(kid) {
      this.toggleEditMode()
      if (kid) this.kidToEdit = kid
      else this.kidToEdit = this.emptyKid
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
  // display: flex;
  // justify-content: flex-start;
  // flex-direction: column;
  background: lightblue;
  padding: 2em;
  min-height: 100vh;
}

</style>
