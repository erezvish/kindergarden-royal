<template>
  <el-row>
    <el-col :xs="24" :sm="24" :md="23">
      <section class="kid-list">
  
        <code-keypad class="code-keypad" v-if="showKeyPad" :kidPass="keyPadActiveKid.pincode" @close-keypad="closeKeyPad"></code-keypad>
        <div class="status-bar">
          <h1> Kid list area </h1>
          <i class="fa fa-plus-square-o" aria-hidden="true" @click="createKid"></i>
        </div>
        <div v-if="kids.length" class="kid-details-container">
          <kid-details v-for="kid in kids" :kid="kid" @toggle="toggleIsPresent(kid)" @edit="edit(kid)" @delete="deleteKidCard(kid)" :key="kid._id"></kid-details>
  
        </div>
      </section>
    </el-col>
  </el-row>
</template>

<script>
import KidDetails from './KidDetails'
import CodeKeypad from './CodeKeypad'
import store from '../store'
export default {
  name: 'kid-list',
  components: {
    KidDetails,
    CodeKeypad
  },
  data() {
    return {

      showKeyPad: false,
      keyPadActiveKid: {}

    }
  },
  computed: {
    kids() {
      return this.$store.getters.filteredKids;
    }
  },
  methods: {
    toggleIsPresent(kid) {
      this.keyPadActiveKid = kid;
      this.showKeyPad = true;
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
    },
    closeKeyPad(passCheck) {
      this.showKeyPad = false;
      if (passCheck) {
        this.$store.dispatch({
          type: 'togglePresent',
          kid: this.keyPadActiveKid
        })
      }
    },
    createKid() {
      this.$emit('createKid')
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
  background: linear-gradient(to top, #95C1D2 1%, white 25%);
  box-shadow: 0 0 11px rgba(0, 0, 0, 0.2);
  border-radius: 1em;
  margin-bottom: 1em;
  padding-bottom: 3em;
  height: 100%;

  & .status-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0em 2em;
    border-top-left-radius: 1em;
    border-top-right-radius: 1em;
    border-bottom: 0.3em solid #2C4D68;
    border-top: 0.3em solid transparent;
    background: #376283;
    color: white;
    & h1 {
      padding: 0;
      margin: 0.1em;
      font: {
        family: Abel;
        size: 2em;
      }
    }

    & .fa {
      font-size: 2em;
      padding: 0.3em 0 0.3em 0.3em;
      cursor: pointer;
    }
  }
}

.kid-details-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.code-keypad {
  position: fixed;
  z-index: 100;
  top: 25%;
  left: 25%;
}
</style>
