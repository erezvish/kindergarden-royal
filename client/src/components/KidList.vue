<template>
  <el-row>
    <el-col :xs="24" :sm="24" :md="23">
      <section class="kid-list">
  
        <div class="status-bar">
          <h1> Kid list area </h1>
          <ul>
            <i class="fa fa-sort-amount-asc" @click="sortKids(false)" aria-hidden="true"></i>
            <i class="fa fa-sort-amount-desc" @click="sortKids(true)" aria-hidden="true"></i>
            <i class="fa fa-list" aria-hidden="true" :isListView="triggerListView" @click="setListView"></i>
            <i class="fa fa-th-large" aria-hidden="true"></i>
            <i class="fa fa-plus-square-o" v-if="isAdmin" aria-hidden="true" @click="createKid"></i>
          </ul>
        </div>
        <div v-if="thumbnailView" class="kid-details-container">
          <!--:class="{ thumbnail: list}-->
          <kid-details v-for="kid in kids" :kid="kid" :isAdmin="isAdmin" :isBasic="isBasic" 
          @toggle="toggleIsPresent(kid)" @edit="edit(kid)" @picture="updateKidPicture" 
          @delete="deleteKidCard(kid)" :key="kid._id"></kid-details>
        </div>
      </section>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'
import KidDetails from './KidDetails'
import store from '../store'
export default {
  name: 'kid-list',
  components: {
    KidDetails,
  },
  data() {
    return {
      thumbnailView: true,
      triggerListView: false,
      isReverseSort: false,
      isFirstSort: true
    }
  },
  computed: { //TODO: use map getters
    ...mapGetters([
    ]),
    kids() {
      return this.$store.getters.filteredKids
    },
    isAdmin() {
      return this.$store.state.isAdmin
    },
    isBasic() {
      return this.$store.state.isBasic
    }
  },

  created() {
  },
  methods: {
    setListView() {

    },
    plusClicked() {
      //PLACEHOLDER, ACCEPT MEIR'S VERSION
    },
    toggleIsPresent(kid) {
      console.log('toggling is present:', kid.imgUrl)
      this.$confirm('Change Kid Status?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'info'
      }).then(() => {
        this.$store.dispatch({
          type: 'togglePresent',
          kid
        })
        this.$message({
          type: 'success',
          message: 'Kid Status Updated'
        });
      }).catch(() => {
        this.$message({
          type: 'error',
          message: 'Status Update Cancelled'
        });
      });
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
        type: 'info'
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
    createKid() {
      this.$emit('createKid')
    },
    sortKids(reverseDirection = false) {
      console.log('Sorting them Kids')
      this.kids.sort(function (a, b) {
        if (reverseDirection) return (a.firstName > b.firstName) ? -1 : 1;
        else return (a.firstName < b.firstName) ? -1 : 1;
      });
      this.$forceUpdate();
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  outline: 1px solid red;
}

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
  border-radius: 1em;
  margin-bottom: 1em;
  padding-bottom: 3em; // height: 100%;
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
</style>
