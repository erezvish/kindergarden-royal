<template>
  <section class="main-section" :class="classObject" @click.self="toggleIsPresent">
  
    <div class="kid-img kid-present" :id="cameraId" @click.stop="toggleIsPresent" v-show="kid.isPresent">
      <img class="img-circle" src="../assets/img-kid/kid.jpg">
      <img class="heart-emoji" src="../assets/msg-icon/heart.png"> </div>
      <div class="kid-img kid-away" :id="cameraId" @click.stop="toggleIsPresent" v-show="!kid.isPresent">
        <img class="img-circle" src="../assets/img-kid/kid2.jpg">
      </div>
      <div class="properties">
        <div class="container">
          <div class="" @click.stop="toggleIsPresent">
            <p class="kid-name">{{`${kid.firstName} ${kid.lastName}`}} </p>
  
            <el-button v-if="isAdmin && isAdmArea" @click.stop="edit">
              <i class="fa fa-pencil" aria-hidden="true"></i>
            </el-button>
          </div>
          <ul class="status clear-style" @click.stop="toggleIsPresent">
            <li class="kid-status">
              <span class="kid-present" v-show="kid.isPresent"> {{ t('Currently In class') }} </span>
              <span class="kid-away" v-show="!kid.isPresent"> {{ t('NOT IN CLASS') }} </span>
            </li>
            <li>
              <ul class="icon-list clear-style" :class="{'disabled': !kid.isPresent}">
                <li>
                  <img class="fav-icon" src="../assets/msg-icon/heart.png" @click.stop="emojiClicked('heart')">
                </li>
                <li>
                  <img class="fav-icon" src="../assets/msg-icon/heart-eyes.png" @click.stop="emojiClicked('heartEyes')">
                </li>
                <li>
                  <img class="fav-icon" src="../assets/msg-icon/star.png" @click.stop="emojiClicked('star')">
                </li>
                <li>
                  <img class="fav-icon" src="../assets/msg-icon/blink.png" @click.stop="emojiClicked('wink')">
                </li>
              </ul>
            </li>
            <!--<li class="hr"> {{ t('Last seen') }}:</li>-->
          </ul>
  
        </div>
        <div class="container-right" @click.self="toggleIsPresent">
          <div v-if="isAdmArea" class="msg-parent x-space-child">
            <el-input placeholder="Send Message" v-model="inputMsgParent" @keyup.native.enter="sendMessage"></el-input>
            <el-button type="default" @click="sendMessage">
              <i class="fa fa-paper-plane" aria-hidden="true"></i>
            </el-button>
          </div>
          <div v-if="isAdmin && isAdmArea" class="action-icons" @click.self="toggleIsPresent">
            <div class="icons-left">
              <i class="fa fa-trash" @click.stop="deleteKidCard" aria-hidden="true"></i>
              <i v-if="false" class="fa fa-cog" aria-hidden="true"></i>
            </div>
            <div class="icons-right">
              <i class="fa fa-camera" @click.stop="cameraClicked" aria-hidden="true"></i>
              <i v-if="false" class="fa fa-medkit" aria-hidden="true"></i>
              <i v-if="false" class="fa fa-phone-square" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </div>
  </section>
</template>

<script>
import Webcam from 'webcamjs'
import img1 from './img1.js'
import img2 from './img2.js'
export default {
  name: 'kid-details',
  props: ['kid', 'isListView', 'isAdmin', 'isBasic', 'isAdmArea'],
  // created() {
  //   this.localKid.imgUrl = img2
  // },
  // mounted() {
  //   setTimeout(() => {
  //     this.localKid.imgUrl = img1
  //   }, 2000)
  // },
  data() {
    return {
      inputMsgParent: '',
      isCameraOn: false,
      cameraId: 'K' + this.kid._id,
      localKid: Object.assign({}, this.kid),
      activeEmoji: 'heart',
      dataClassObject: {
        heart: 'heart-emoji',
        heartEyes: 'heart-eyes-emoji',
        star: 'star-emoji',
        wink: 'wink-emoji',
      },
      currSrc: '../assets/msg-icon/heart.png',
      currClass: 'heart-emoji'
    }
  },
  computed: {
    classObject() {
      return {
        'kid-details': true,
        'mark-present': this.kid.isPresent,
        'mark-absent': !this.kid.isPresent,
        'list-view': this.isListView,
        'kid-details-container': this.isListView
      }
    }
  },
  methods: {
    toggleIsPresent() {
      if (this.isAdmin || this.isBasic) this.$emit('toggle')
      // else this.$message({
      //   type: 'error',
      //   message: 'Sorry, status may only be changed at the Kindergarden'
      // });
    },
    deleteKidCard() {
      this.$emit('delete')
    },
    edit() {
      this.$emit('edit')
    },
    emojiClicked(emojiType) {
      this.$emit('emoji', this.kid, emojiType)
    },
    cameraClicked() {
      if (this.isCameraOn) {
        let capturedImgUrl = null;
        // console.log('url before change:', this.kid.imgUrl)
        Webcam.snap(function (data_uri) {
          capturedImgUrl = data_uri;
        });
        Webcam.reset()
        let updatedKid = Object.assign({}, this.kid)
        this.localKid.imgUrl = capturedImgUrl
        updatedKid.imgUrl = capturedImgUrl
        this.$emit('picture', updatedKid, this.kid)
        this.localKid.imgUrl = capturedImgUrl
      }
      else Webcam.attach(`#${this.cameraId}`);
      this.isCameraOn = !this.isCameraOn;
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

* {
  outline: 1px solid green;
}

//
.main-section {
  margin: 1em 0;
}

.kid-img {
  display: flex;
  justify-content: center;
  align-items: center;
  background: orange;
  width: 23vw;
  height: 23vw;
  max-width: 23vw;
  max-height: 23vw;
  margin: 0 1em;
  border-radius: 50%;
  box-shadow: 0 0 11px #333;
  cursor: pointer;

  .img-circle {
    width: 20vw;
    height: 20vw;
    border-radius: 50%;
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

.status {
  .kid-status {
    & span {
      padding: 0.2em 0.5em;
      border-radius: 0.5em;
    }
  }
  .icon-list {
    display: flex;
    justify-content: center;
    margin: 1em 0;
    li {
      margin: 0 0.5em;
      img {
        width: 3vw;
        height: 3vw;
      }
    }
  }
}

.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.kid-name {
  font-size: 2.4vw;
}

// ------------------------- MEDIA QUERIES ------------------------- //
//
@media screen and (max-width: $md) {

  .kid-img {
    width: 25vw;
    height: 25vw;
    max-width: 23vw;
    max-height: 23vw;
    margin: 0 1em;
    border-radius: 50%;
    box-shadow: 0 0 11px #333;
    cursor: pointer;

    .img-circle {
      width: 20vw;
      height: 20vw;
      border-radius: 50%;
    }
  }

  .status {
    .icon-list {
      margin: 1em 0;
      li {
        margin: 0 0.5em;
        img {
          width: 3.6vw;
          height: 3.6vw;
        }
      }
    }
  }

  .kid-name {
    font-size: 2.8vw;
  }
}

.heart-emoji {
  position: absolute;
  width: 100px;
  animation: 1s blink-anim infinite;
}

@keyframes blink-anim {
  0% {
    width: 30px;
  }
  50% {
    width: 50px;
  }
  100% {
    width: 30px;
  }
}
</style>