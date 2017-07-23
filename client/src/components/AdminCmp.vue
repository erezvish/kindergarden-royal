<template>
  <section class="admin-panel">
    <el-row>
      <el-col :xs="24" :sm="24" :md="24">
        <!--<h1>Admin Panel </h1>-->
        <control-panel></control-panel>
        <kid-edit v-if="isEditMode" :kid="kidToEdit" @closeEdit="toggleEditMode"></kid-edit>
        <kid-list v-if="!isEditMode" :isAdmArea="true" @edit="setEditMode" @createKid="setEditMode" @toggle-sidebar="toggleSidebar"></kid-list>
      </el-col>
      <side-bar :bellProp="sidebarOn" @toggle-sidebar="toggleSidebar"></side-bar>
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
  },
  created() {
    if (!this.isAdmin) this.$router.push('/login')
  },
  data() {
    return {
      isEditMode: false,
      kidToEdit: null,
      sidebarOn: false
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
    toggleSidebar() {
      this.sidebarOn = !this.sidebarOn;
    },
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
@import "../sass/main.scss";

.el-row {
  display: flex;
}

.admin-panel {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  background: #f1f1f1;
  padding: 2em;
  min-height: 100vh;
  @media screen and (max-width: $sm) {
    padding: 0;
  }
}

// * {
//   outline: 1px solid red;
// }

</style>