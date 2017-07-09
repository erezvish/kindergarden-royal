<template>
  <el-row>
    <el-col :xs="24" :sm="24" :md="23">
      <section class="kid-list">
  
        <code-keypad class="code-keypad" v-if="showKeyPad" :kidPass="keyPadActiveKid.pincode" @close-keypad="closeKeyPad"></code-keypad>
        <div class="status-bar">
          <h1> Kid list area </h1>
          <ul class="controls">
            <i class="fa fa-sort-amount-asc" aria-hidden="true"></i>
            <i class="fa fa-sort-amount-desc" aria-hidden="true"></i>
            <i class="fa fa-list" aria-hidden="true" @click="setListView"></i>
            <i class="fa fa-th-large" aria-hidden="true" @click="setThumbView"></i>
            <i class="fa fa-plus-square-o" aria-hidden="true" @click="plusClicked"></i>
          </ul>
        </div>
        <div v-if="thumbnailView" class="kid-details-container">
          <!--:class="{ thumbnail: list}-->
          <kid-details v-for="kid in kids" :kid="kid" :isListView="triggerListView" @toggle="toggleIsPresent(kid)" @edit="edit(kid)" @picture="updateKidPicture" @delete="deleteKidCard(kid)" :key="kid._id"></kid-details>
        </div>
        <div v-else>
          <kid-details-row></kid-details-row>
        </div>
      </section>
    </el-col>
  </el-row>
</template>

<script>
import KidDetails from './KidDetails'
import KidDetailsRow from './KidDetailsRow'
import CodeKeypad from './CodeKeypad'
import store from '../store'
export default {
  name: 'kid-list',
  components: {
    KidDetails,
    KidDetailsRow,
    CodeKeypad
  },
  data() {
    return {
      thumbnailView: true,
      showKeyPad: false,
      keyPadActiveKid: {},
      triggerListView: false
    }
  },
  computed: {
    kids() {
      return this.$store.getters.filteredKids;
    }
  },
  methods: {
    setListView() {
      this.triggerListView = true;
    },
    setThumbView() {
      this.triggerListView = false;
    },
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
    plusClicked: () => {
      console.log('plusClicked');

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

.list-view {
  background: yellow;
  display: flex;
  flex-direction: column;
}

.thumbnail {
  background: pink;
}

.kid-list {
  display: flex;
  flex-direction: column;
  background: white;
  background: linear-gradient(to top, #95C1D2 1%, white 25%);
  box-shadow: 0 0 11px rgba(0, 0, 0, 0.2);
  border-radius: 1em; // padding-bottom: 0em;
  .status-bar {
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
      padding: 0.2em 0.4em;
      margin: 0 0.4;
      cursor: pointer;
      color: #ADD8E6;
      transition: all, 0.5s;
    }
    & .fa:hover {
      color: white;
      transition: all, 0.5s;
    }
    .controls {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;
      text-align: center;
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

@media screen and (max-width: 500px) {
  .kid-list .status-bar {
    display: flex;
    flex-wrap: wrap;
    font-size: small;
    justify-content: center;
  }
}
</style>
