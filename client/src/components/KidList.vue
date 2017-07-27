<template>
  <el-row>
    <el-col :xs="24" :sm="24" :md="23">
      <section class="kid-list">
        <div class="status-bar">
          <div class="title">
            <h1> {{t('Kids list area ')}} </h1>
          </div>
          <ul class="controls">
            <i title="Notifications" class="fa fa-bell-o" :class="{'bell-is-on': hasMessages}" v-if="isAdmin && isAdmArea" aria-hidden="true" @click="bellClicked"></i>
            <i title="reload list" class="fa fa-power-off" @click=confirmReset aria-hidden="true"></i>
            <i title="Sort up" class="fa fa-sort-amount-asc" @click="sortKids(false)" aria-hidden="true"></i>
            <i title="Dort down" class="fa fa-sort-amount-desc" @click="sortKids(true)" aria-hidden="true"></i>
            <i title="List view" class="view fa fa-list" aria-hidden="true" :isListView="triggerListView" @click="setListView"></i>
            <i title="Thumbnails view" class="view fa fa-th-large" @click="setThumbView" aria-hidden="true"></i>
            <i title="Add new kid" class="fa fa-plus-square-o" v-if="isAdmin && isAdmArea" aria-hidden="true" @click="createKid"></i>
          </ul>
        </div>
        <div class="info-bar flex spread middle">
          <div class="warn-system">
            <label class="switch">
              <input type="checkbox" v-model="warningSystemOn">
              <span class="slider round"></span>
            </label>
            <h5> {{t('Toggle Warning')}} </h5>
          </div>
          <div class="clock">{{(time)}}</div>
        </div>
        <div v-if="thumbnailView" class="kid-details-container">
          <!--:class="{ thumbnail: list}-->
  
          <kid-details v-for="kid in kids" :activateWarning="activateWarning" :warningSystemStatus="warningSystemOn" :kid="kid" :isAdmin="isAdmin" :isBasic="isBasic" :isParent="isParent" :isListView="triggerListView" :isAdmArea="isAdmArea" @toggle="toggleIsPresent(kid)" @edit="edit(kid)" @picture="updateKidPicture" @delete="deleteKidCard(kid)" @parent-message="sendParentMessage" @emoji="setEmoji" :key="kid._id"></kid-details>
  
        </div>
      </section>
    </el-col>
  </el-row>
</template>

<script>
import swal from 'sweetalert2'
import { mapGetters, mapState } from 'vuex'
import KidDetails from './KidDetails'
import moment from 'moment'
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
      time: moment().format('HH:mm'),
      checkTime: moment('9:30', 'HH:mm'), //TODO: change the hardcoded time to a user selection
      PresentChecked: false,
      activateWarning: false,
      warningSystemOn: true,
      toggleAudio: new Audio('/static/sound/yay.mp3'),
    }
  },
  created() {
    window.moment = moment
    let that = this;
    const clockInterval = setInterval(function clockRun() {
      that.time = moment().format('HH:mm');
      let currTime = moment();
      if (!that.PresentChecked && that.checkTime.isBefore(currTime)) {
        that.PresentChecked = true;
        that.activateWarning = true;
      }
      if (currTime.hours() === 7 && currTime.minutes() === 0 && currTime.seconds() === 0) {
        console.log('A new day has arrived')
        that.resetData()
      }
    }, 1000)
  },
  destroyed() {
    clearInterval(this.clockInterval)
  },
  computed: {
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
    toggleIsPresent(kid) {
      if (!kid.isPresent) { //quick and dirty, wrong if toggle failed. Will suffice for demo since it is only a sound and an alert
        this.toggleAudio.play()
        swal({
          title: `${kid.firstName} ${kid.lastName} is here!`,
          type: 'success',
          timer: 2000
        }).then(
          function () { },
          // handling the promise rejection
          function (dismiss) {
            if (dismiss === 'timer') {
              console.log('I was closed by the timer')
            }
          }
          )
      }
      this.$store.dispatch({
        type: 'togglePresent',
        kid
      })

      // this.$message({
      // type: 'success',
      // message: 'Kid Status Updated'
      // });

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
      })
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
      // console.log('There is a message from the parents of:', message.kidFullName)
      // console.log('message:', message)
      this.$store.dispatch({
        type: 'sendParentMessage',
        message
      })
    },
    confirmReset() {
      this.$confirm('This will reset the system, perform action?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'info'
      }).then(() => {
        this.resetData()
        this.$message({
          type: 'success',
          message: 'Good Morning New Day!'
        });
      })
    },
    resetData() {
      this.warningSystemOn = true;
      this.PresentChecked = false;
      this.kids.forEach(kid => {
        if (kid.isPresent) this.toggleIsPresent(kid);
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
@import '../../node_modules/sweetalert2/dist/sweetalert2.min.css';

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
        family: Abel, 'Avenir', 'Varela Round', Helvetica, Arial, sans-serif;
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

.info-bar {
  padding: 0.2em 1em;
}

.warn-system {
  display: flex;
  justify-content: flex-start;
  flex-basis: 1;
  margin: 0 0.5em;
  height: 3em;
  h5 {
    margin: 1em;
  }
}



// The switch - the box around the slider

.switch {
  position: relative;
  display: inline-block;
  width: 4em;
  height: 2em;
  transform: translate(0.4em, 0.4em)
}

h5 {
  display: inline-block;
}

// Hide default HTML checkbox 

.switch input {
  display: none;
}

// The slider 

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 1.5em;
  width: 1.5em;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
}

input:checked+.slider {
  background-color: #2196F3;
}

input:focus+.slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked+.slider:before {
  transform: translateX(2em);
}


// Rounded sliders 

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.unseen {
  display: none;
}

// ------------------------- MEDIA QUERIES ------------------------- //


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
</style>
