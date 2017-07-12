<template>
  <el-row>
    <el-col :xs="24" :sm="24" :md="23">
      <section class="kid-list">
  
        <div class="status-bar">
          <div class="title">
            <h1> Kid list area </h1>
          </div>
          <ul class="controls">
            <i class="fa fa-bell-o" :class="{'bell-is-on': hasMessages}" aria-hidden="true" @click="bellClicked"></i>
            <i class="fa fa-refresh" @click=resetStatus aria-hidden="true"></i>
            <i class="fa fa-sort-amount-asc" @click="sortKids(false)" aria-hidden="true"></i>
            <i class="fa fa-sort-amount-desc" @click="sortKids(true)" aria-hidden="true"></i>
            <i class="view fa fa-list" aria-hidden="true" :isListView="triggerListView" @click="setListView"></i>
            <i class="view fa fa-th-large" @click="setThumbView" aria-hidden="true"></i>
            <i class="fa fa-plus-square-o" v-if="isAdmin" aria-hidden="true" @click="createKid"></i>
  
          </ul>
        </div>
        <div v-if="thumbnailView" class="kid-details-container">
          <!--:class="{ thumbnail: list}-->
  
          <kid-details v-for="kid in kids" :kid="kid" :isAdmin="isAdmin" :isBasic="isBasic" :isParent="isParent" :isListView="triggerListView" :isAdmArea="isAdmArea" @toggle="toggleIsPresent(kid)" @edit="edit(kid)" @picture="updateKidPicture" @delete="deleteKidCard(kid)" @parent-message="sendParentMessage" @emoji="setEmoji" :key="kid._id"></kid-details>
  
        </div>
      </section>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import KidDetails from './KidDetails'

import store from '../store'
export default {
  name: 'kid-list',
  props: ['isAdmArea'],
  components: {
    KidDetails,
  },
  data() {
    return {
      thumbnailView: true,
      triggerListView: false,
      isReverseSort: false,
      isFirstSort: true,
    }
  },
  computed: { //TODO: use map getters
    // ...mapGetters([
    // ]),
    kids() {
      return this.$store.getters.filteredKids
    },
    ...mapState([
      'isAdmin',
      'isBasic',
      'isParent'
    ]),
    hasMessages() {
      return this.$store.state.messages.length > 0
    }
  },
  methods: {
    bellClicked() {
      console.log('click on KidList');
      this.$emit('toggle-sidebar');
    },
    setListView() {
      this.triggerListView = true;
    },
    setThumbView() {
      this.triggerListView = false;
    },
    plusClicked() {
      //PLACEHOLDER, ACCEPT MEIR'S VERSION
    },
    toggleIsPresent(kid) {
      console.log('toggling is present:', kid.imgUrl)
      
        this.$store.dispatch({
          type: 'togglePresent',
          kid
        })
        this.$message({
          type: 'success',
          message: 'Kid Status Updated'
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
      // console.log('recieved picture update request', prevKid)
      // console.log('kids:', kid, prevKid)
      this.$store.dispatch({
        type: 'updateKid',
        kid
      }).then(
        this.confirmImg(prevKid)
        )
    },
    confirmImg(prevKid) {
      // console.log('current kid url:', kid.imgUrl)
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
          kid: prevKid
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
    },
    sendParentMessage(message) {
      console.log('There is a message from the parents of:', message.kidFullName)
      console.log('message:', message)
      this.$store.dispatch({
        type: 'sendParentMessage',
        message
      })
    },
    resetStatus() {
      // console.log('resetting')
      this.$confirm('Are you sure?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'info'
      }).then(() => {
        this.$message({
          type: 'success',
          message: 'Good Morning New Day!'
        });
      })
    },
    setEmoji(kid, emojiType) {
      console.log('kid', kid, 'should get the emoji', emojiType)
      this.$store.dispatch({
        type: 'sendEmoji',
        _id: kid._id,
        emojiType
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../sass/main.scss";
// * {
//   outline: 1px solid red;
// }
.bell-is-on {
  color: orange!important;
  animation-name: bell-flash;
  animation-duration: 2s;
  animation-iteration-count: 10;
  animation-timing-function: ease-in-out;
}

@keyframes bell-flash {
  0% {
    color: orange;
  }
  50% {
    color: #B8D5E1;
  }
  100% {
    color: orange;
  }
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
  background: linear-gradient(to top, #95C1D2 1%, rgba(255, 255, 255, 0.8) 25%);
  box-shadow: 0 0 11px rgba(0, 0, 0, 0.2);
  border-radius: 1em; // padding-bottom: 0em;
  .status-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0em 2em;
    border-top-left-radius: 0em;
    border-top-right-radius: 0em;
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
    .title {
      display: flex;
    }
  }
}

.kid-details-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

// ------------------------- MEDIA QUERIES ------------------------- //
//
// ---- XS queries ---------
@media screen and (max-width: $xs) {
  .kid-list .status-bar {
    display: flex;
    flex-wrap: wrap;
    font-size: 1em;
    justify-content: center;
  }
}

// ---- SM queries ---------
//
@media screen and (max-width: $sm) {

  .kid-list .status-bar {
    display: flex;
    flex-wrap: wrap;
    font-size: large;
    justify-content: center;
  }
}

@media screen and (min-width: $sm) {
  .kid-list {
    border-top-left-radius: 1em;
    border-top-right-radius: 1em; // display:none;
  }
  .kid-list .status-bar {
    border-top-left-radius: 0.9em;
    border-top-right-radius: 0.9em;
  }
}

// ---- MD queries ---------
//
@media screen and (max-width: $sm) {
  .view {
    display: none;
  }
}
</style>
