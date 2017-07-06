<template>
  <el-row>
    <el-col  :xs="24" :sm="24" :md="20">
      <section class="kid-list">
        <h1> Kid List Area </h1>
        <div class="kid-details-container">
          <kid-details v-for="kid in kids" :key="kid.id"></kid-details>
        </div>
      </section>
    </el-col>
  </el-row>
</template>

<script>
import KidDetails from './KidDetails'
export default {
  name: 'kid-list',
  components: {
    KidDetails
  },
  data() {
    return {
      kids: [
        { _id: 1, name: 'kid1' },
        { _id: 2, name: 'kid2' },
        { _id: 3, name: 'kid3' },
        { _id: 3, name: 'kid4' }
      ] //Temporary for connections
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
