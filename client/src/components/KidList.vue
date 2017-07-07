<template>
  <el-row>
    <el-col :xs="24" :sm="24" :md="20">
      <section class="kid-list">
        <h1> Kid List Area </h1>
  
        <div v-if="kids.length" class="kid-details-container">
          <kid-details v-for="kid in kids" :kid="kid" @toggle="toggleIsPresent(kid)" @edit="edit(kid)" @delete="deleteKidCard(kid)" @picture="updateKidPicture" :key="kid._id"></kid-details>
  
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
    edit(kid) {
      this.$emit('edit', kid)
    },
    updateKidPicture(kid, prevKid) {
      console.log('recieved picture update request', prevKid)
      this.$store.dispatch({
        type: 'updateKid',
        kid
      }).then(
        this.confirmImg(prevKid)
        )
    },
    confirmImg(kid) {
      console.log('current kid url:', kid.imgUrl)
      this.$confirm('Accpet new Image?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: 'Image Saved!'
        });
      }).catch(() => {
        this.$store.dispatch({
          type: 'updateKid',
          kid
        })
        this.$message({
          type: 'info',
          message: 'Image Discarded'
        });
      });
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
