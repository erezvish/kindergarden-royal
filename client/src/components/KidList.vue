<template>
  <el-row>
    <el-col :xs="24" :sm="24" :md="20">
      <section class="kid-list">
        <h1> Kid List Area </h1>
        <div v-if="kids.length" class="kid-details-container">
          <kid-details v-for="kid in kids" :kid="kid" @toggle="toggleIsPresent(kid)" 
          @delete="deleteKidCard(kid)" @edit-mode="openEditMode(kid)" :key="kid._id"></kid-details>
        </div>
      </section>
    </el-col>
  </el-row>
</template>

<script>
import KidDetails from './KidDetails'
import store from '../store'
export default {
  name: 'kid-list',
  components: {
    KidDetails
  },
  data() {
    return {
    }
  },
  computed: {
    kids() {
      return this.$store.getters.filteredKids;
    }
  },
  methods: {
    toggleIsPresent(kid) {
      this.$store.dispatch({
        type: 'togglePresent',
        kid
      })
    },
    deleteKidCard(kid) {
      this.$store.dispatch({
        type: 'deleteKid',
        _id: kid._id
      })
    },
    openEditMode(kid) {
      console.log('Moving to edit mode!')
    }
  }
}
</script>

<style lang="scss" scoped>
// * {
//   outline: 1px solid red;
// }
.el-row {
  display: flex;
  justify-content: center;
}

.kid-list {
  display: flex;
  flex-direction: column;
  background: white;
  box-shadow: 0 0 11px rgba(0, 0, 0, 0.2);
  border-radius: 1em;
  margin-bottom: 1em;
}

.kid-details-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
