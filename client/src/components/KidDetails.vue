<template>
  <section class="main-section" :class="classObject">
  
    <div :class="imgClassObject" :id="cameraId" @click.stop="toggleIsPresent">
      <img class="img-circle" :src="kid.imgUrl">
      <div class="emojis">
        <img class="emoji" src="../assets/msg-icon/heart.png" v-if="emojisObject.heart">
        <img class="emoji" src="../assets/msg-icon/heart-eyes.png" v-if="emojisObject.heartEyes">
        <img class="emoji" src="../assets/msg-icon/star.png" v-if="emojisObject.star">
        <img class="emoji" src="../assets/msg-icon/blink.png" v-if="emojisObject.wink">
      </div>
    </div>
    <div class="list-wraper" v-if="isAdmin && isAdmArea">
      <div class="ctrl-icons">
        <i class="fa fa-volume-control-phone" aria-hidden="true" title="Call Kid's parent"></i>
        <i class="fa fa-camera" aria-hidden="true" @click.stop="cameraClicked" title="Take a picture"></i>
        <i class="m-icon fa fa-pencil-square-o" aria-hidden="true" @click.stop="edit" title="Edit mode"></i>
        <i class="m-icon fa fa-trash " aria-hidden="true" @click.stop="deleteKidCard" title="Delete Card"></i>
        <i class="sm-icon fa fa-smile-o" aria-hidden="true" title="Send imoji"></i>
      </div>
  
    </div>
    <div class="kid-name-wraper" @click.stop="toggleIsPresent">
      <p class="kid-name">{{`${kid.firstName} ${kid.lastName}`}} </p>
  
    </div>
    <ul class="status clear-style" @click.stop="toggleIsPresent">
      <li>
        <ul v-if="isAdmin || isParent" class="icon-list clear-style" :class="{'disabled': !kid.isPresent}">
          <li title="love">
            <img class="fav-icon" src="../assets/msg-icon/heart.png" @click.stop="setEmoji(kid, 'heart')">
          </li>
          <li>
            <img class="fav-icon" src="../assets/msg-icon/heart-eyes.png" @click.stop="setEmoji(kid, 'heartEyes')">
          </li>
          <li>
            <img class="fav-icon" src="../assets/msg-icon/star.png" @click.stop="setEmoji(kid, 'star')">
          </li>
          <li>
            <img class="fav-icon" src="../assets/msg-icon/blink.png" @click.stop="setEmoji(kid, 'wink')">
          </li>
        </ul>
      </li>
    </ul>
  
    <div v-if="isParent" class="msg-parent">
      <el-input placeholder="Send Message" v-model="inputMsgParent" @keyup.native.enter="sendMessage"></el-input>
      <el-button type="default" @click="sendMessage">
        <i class="fa fa-paper-plane" aria-hidden="true"></i>
      </el-button>
    </div>
    <picture-modal class="picture-modal" v-if="showCameraModal" :kid="kid" @close="closeModal" @picture="receivePicture"></picture-modal>
  </section>
</template>

<script>
import Webcam from 'webcamjs'
import PictureModal from './PictureModal'
export default {
  name: 'kid-details',
  components: {
    PictureModal
  },
  props: ['kid', 'isParent', 'isListView', 'isAdmin', 'isBasic', 'isAdmArea', 'activateWarning', 'warningSystemStatus'],
  data() {
    return {
      inputMsgParent: '',
      cameraId: 'K' + this.kid._id,
      showCameraModal: false
    }
  },
  computed: {
    imgClassObject() {
      return {
        'kid-img': true,
        'kid-present': this.kid.isPresent,
        'kid-away': !this.kid.isPresent,
        'warning': this.warningSystemStatus && this.activateWarning && !this.kid.isPresent
      }
    },
    classObject() {
      return {
        'list-view': this.isListView,
      }
    },
    emojisObject() {
      return {
        heart: this.kid.emojiType === 'heart',
        heartEyes: this.kid.emojiType === 'heartEyes',
        star: this.kid.emojiType === 'star',
        wink: this.kid.emojiType === 'wink'
      }
    }
  },
  methods: {
    toggleIsPresent() {
      if (this.isAdmin || this.isBasic) this.$emit('toggle')
    },
    deleteKidCard() {
      this.$emit('delete')
    },
    edit() {
      this.$emit('edit')
    },
    setEmoji(kid, emojiType) {
      this.$emit('emoji', this.kid, emojiType)
      // console.log('emoji clicked')
    },
    cameraClicked() {
      this.showCameraModal = true;
    },
    closeModal() {
      this.showCameraModal = false
    },
    receivePicture(updatedKid) {
      this.$emit('picture', updatedKid, this.kid)
    },
    createEmptyMessage() {
      const kidFullName = this.kid.firstName + ' ' + this.kid.lastName;
      return {
        _id: null,
        to: null,
        from: this.kid._id,
        kidFullName,
        title: `Message from ${kidFullName} Parents`,
        text: null,
        timestamp: null
      }
    },
    sendMessage() {
      console.log('message sent to KidList')
      let newMessage = this.createEmptyMessage();
      newMessage.text = this.inputMsgParent;
      newMessage.timestamp = Date.now();
      this.$emit('parent-message', newMessage)
      this.inputMsgParent = '';
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../sass/main.scss";

// * {
//   outline: 1px solid green;
// }
.main-section {
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  margin: 1.9vw 0.9vw;
  padding: 0.7em 0;
  background: linear-gradient(rgba(148, 192, 209, 0.5), white, rgba(148, 192, 209, 0.5));
  box-shadow: 0 0 11px rgba(0, 0, 0, 0.1);
  border-top-left-radius: 5%;
  border-top-right-radius: 5%;
  border: {
    left: $border-alpha-narrow;
    right: $border-alpha-narrow;
  }
  @media screen and (max-width: $sm) {
    margin: 3vw 0;
    width: 80vw;
  }
}

.kid-img {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: orange;
  width: 20vw;
  height: 20vw; // margin: 0 1em;
  border-radius: 50%;
  box-shadow: 0 0 11px #333;
  cursor: pointer;
  .img-circle {
    position: relative;
    z-index: 1;
    width: 85%;
    height: 85%;
    border-radius: 50%;
    box-shadow: 0.1em 0.1em 2em rgba(0, 0, 0, 0.5);
    border: none;
  }
  @media screen and (max-width: $sm) {
    // display: none;
    width: 55vw;
    height: 55vw;
  }
}

.kid-present {
  background: rgba(0, 155, 2, 0.7);
  background: $bg-present;
  color: white;
}

.kid-away {
  background: lightcoral;
  background: $bg-absent;
  box-shadow: $box-shadow-default;
  color: white;
}


.warning {
  animation: 1s warn-absent infinite
}

.msg-parent {
  display: flex;
  @media screen and (min-width: $xs) and (max-width: $sm) {}
}

.action-icons {
  display: flex;
  justify-content: space-between;
  align-self: flex-end;
  padding: 0.5em 0;
  font-size: 2em;
  color: #376283;
}


.status {
  .kid-status {
    & span {
      font-size: 1.3vw;
      padding: 0.2em 0.5em;
      border-radius: 0.5em;
    }
  }
  .icon-list {
    display: flex;
    justify-content: space-between;
    margin: 1em 0;
    li {
      display: table-cell;
      vertical-align: middle;
      margin: 0 0.5em;
      img {
        width: 3vw;
        height: 3vw;
      }
    }
  }
  @media screen and (max-width: $sm) {
    display: none;
  }
}

.kid-name-wraper {
  display: flex;
  justify-content: center;
  .kid-name {
    font-size: 2.4em;
    margin: 0.1em 0;
    @media screen and (max-width: $md) {
      font-size: 1.6rem; // margin: 3.2vw;
    }
  }
}

.emojis {
  cursor: pointer;
  .emoji {
    position: absolute;
    z-index: 2;
    top: 0;
    animation: 1.5s blink-anim infinite;
  }
}

@keyframes blink-anim {
  0% {
    width: 1vw;
    opacity: 0;
    transform: rotate(0deg);
  }
  50% {
    width: 9vw;
    opacity: 0.7;
    transform: rotate(360deg);
  }
  100% {
    width: 1vw;
    opacity: 0;
    transform: rotate(0deg);
  }
}

@keyframes warn-absent {
  50% {
    transform: scale(0.98);
    background: linear-gradient(to top, rgba(236, 162, 0, 1) 1%, orange 0.5em, rgba(236, 162, 0, 0.9) 18em);
  }
}

// >>>>>>>>>>>>>>>>>>>>> LIST VIEW <<<<<<<<<<<<<<<<<<<<<<
.list-view {
  margin: 0;
  padding: 0.9em 0;
  width: 100%;
  background: yellow;
  background: linear-gradient(rgba(148, 192, 209, 0.5), white, rgba(148, 192, 209, 0.5));
  flex-direction: row;
  justify-content: space-around;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  .kid-img {
    width: 13vw;
    height: 13vw;
  }
  .list-wraper {
    display: flex;
    flex-basis: 25%;
    height: 100%;
    flex-direction: column-reverse;
    justify-content: center;
    @media screen and (max-width: $sm) {
      flex-basis: 70%;
      .ctrl-icons {
        justify-content: space-between;
        .fa {
          font-size: 5vw;
          padding: 3vw;
        }
      }
    }
  }
  .kid-name-wraper {
    position: relative;
    left: 0;
    display: none;
    justify-content: flex-start;
    align-self: flex-start;
    & p {
      display: none;
      position: absolute;
      left: 0;
    }
  }
  .ctrl-icons {
    top: 0; // flex-basis: 70%;
    @media screen and (max-width: $md) {
      justify-content: space-between;
    }
    .fa {
      margin: 0 0.3em 0 0;
    }
  }
  .status {
    position: relative;
    order: 4;
    flex-basis: 25%; // margin: 0 auto;
    .icon-list img {
      max-width: 3.2vw;
      max-height: 3.2vw;
      width: 100%;
      height: 100%;
    }
  }
  .msg-parent {
    // position: absolute;
    flex-basis: 25%;
    right: 10%;
    order: 3;
    @media screen and (max-width: $sm) {
      position: absolute;
      display: none;
    }
  }
}

// .picture-modal {
  // position: relative;
// }

// ------------------------- MEDIA QUERIES ------------------------- //
//
</style>