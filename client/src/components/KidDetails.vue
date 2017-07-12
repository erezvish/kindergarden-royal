<template>
  <section class="main-section" :class="classObject">
  
    <div class="kid-img kid-present" :id="cameraId" @click.stop="toggleIsPresent" v-show="kid.isPresent">
      <img class="img-circle" src="../assets/img-kid/kid.jpg">
      <div class="emojis">
        <img class="emoji" src="../assets/msg-icon/heart.png" v-if="emojis.heart">
        <img class="emoji" src="../assets/msg-icon/heart-eyes.png" v-if="emojis.heartEyes">
        <img class="emoji" src="../assets/msg-icon/star.png" v-if="emojis.star">
        <img class="emoji" src="../assets/msg-icon/blink.png" v-if="emojis.wink">
      </div>
    </div>
    <div class="kid-img kid-away" :id="cameraId" @click.stop="toggleIsPresent" v-show="!kid.isPresent">
      <img class="img-circle" src="../assets/img-kid/kid.jpg">
    </div>
 
    <!--<div class="">-->
    <div class="kid-name-wraper" @click.stop="toggleIsPresent">
      <p class="kid-name">{{`${kid.firstName} ${kid.lastName}`}} </p>
          <ul class="status clear-style" @click.stop="toggleIsPresent">
      <li class="kid-status">
        <span class="kid-present" v-show="kid.isPresent"> {{ t('Currently In class') }} </span>
        <span class="kid-away" v-show="!kid.isPresent"> {{ t('Currently Not in class') }} </span>
      </li>
      <li>
        <ul class="icon-list clear-style" :class="{'disabled': !kid.isPresent}">
          <li>
            <img class="fav-icon" src="../assets/msg-icon/heart.png">
          </li>
          <li>
            <img class="fav-icon" src="../assets/msg-icon/heart-eyes.png">
          </li>
          <li>
            <img class="fav-icon" src="../assets/msg-icon/star.png">
          </li>
          <li>
            <img class="fav-icon" src="../assets/msg-icon/blink.png">
          </li>
        </ul>
      </li>
      <!--<li class="hr"> {{ t('Last seen') }}:</li>-->
    </ul>
      <!--<div class="status kid-status">
          <span class="kid-present" v-show="kid.isPresent"> {{ t('Currently In class') }} </span>
          <span class="kid-away" v-show="!kid.isPresent"> {{ t('Currently Not in class') }} </span>
        </div>-->
      <el-button class="edit-btn" v-if="isAdmin && isAdmArea" @click.stop="edit">
        <i class="fa fa-pencil" aria-hidden="true"></i>
      </el-button>
    </div>
    <!-- <ul class="status clear-style">
      <li class="kid-status">
        <span class="kid-present" v-show="kid.isPresent"> {{ t('Currently In class') }} </span>
        <span class="kid-away" v-show="!kid.isPresent"> {{ t('Currently Not in class') }} </span>
      </li>
      <li>
        <ul class="icon-list clear-style" :class="{'disabled': !kid.isPresent}">
          <li>
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
      <!--<li class="hr"> {{ t('Last seen') }}:</li>-->
   <!-- </ul> -->
  
    <!--</div>-->
    <div class="container-right">
      <div v-if="isAdmArea" class="msg-parent x-space-child">
        <el-input placeholder="Send Message" v-model="inputMsgParent" @keyup.native.enter="sendMessage"></el-input>
        <el-button type="default" @click="sendMessage">
          <i class="fa fa-paper-plane" aria-hidden="true"></i>
        </el-button>
      </div>
      <div v-if="isAdmin && isAdmArea" class="action-icons">
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
    <!--</div>-->
  </section>
</template>

<script>
import Webcam from 'webcamjs'
export default {
  name: 'kid-details',
  props: ['kid', 'emojis', 'isListView', 'isAdmin', 'isBasic', 'isAdmArea'],
  data() {
    return {
      inputMsgParent: '',
      isCameraOn: false,
      cameraId: 'K' + this.kid._id,
      localKid: Object.assign({}, this.kid),
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
    setEmoji(kid, emojiType) {
      this.$emit('emoji', this.kid, emojiType)
      // console.log('emoji clicked')
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

// * {
//   outline: 1px solid green;
// }
//
.main-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1em 0.5em;
}

.kid-img {
  display: flex;
  justify-content: center;
  align-items: center;
  background: orange;
  width: 20vw;
  height: 20vw; // max-width: 23vw;
  // max-height: 23vw;
  margin: 0 1em;
  border-radius: 50%;
  box-shadow: 0 0 11px #333;
  cursor: pointer;

  .img-circle {
    width: 85%;
    height: 85%;
    border-radius: 50%;
    box-shadow: 0.1em 0.1em 2em rgba(0, 0, 0, 0.5);
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
      font-size: 1.3vw;
      padding: 0.2em 0.5em;
      border-radius: 0.5em;
    }
  }
  .icon-list {
    display: flex;
    justify-content: center;
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
  .main-section {
    width: 30%;
  }
  .kid-img {
    width: 25vw;
    height: 25vw; // max-width: 23vw;
    // max-height: 23vw;
    margin: 0 1em;
    border-radius: 50%;
    box-shadow: 0 0 11px #333;
    cursor: pointer;

    .img-circle {
      width: 90%;
      height: 90%;
      border-radius: 50%;
    }
  }

  .status {
    .icon-list {
      margin: 1em 0;
      li {
        margin: 0 0.5em;
        img {
          // width: 80%;
          // height: 80%;
        }
      }
    }
  }

  .kid-name {
    font-size: 3vw;
  }
}

@media screen and (max-width: $sm) {
  .main-section {
    padding-bottom: 0.7em;
    flex-direction: row;
    width: 90vw;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
  .kid-img {
    width: 31vw;
    height: 31vw;
    margin: 0 0;
    border-radius: 50%;
    box-shadow: 0 0 11px #333;
  }

  .status {
    & span {
      display: none;
      font-size: 0.2em;
      padding: 0.2em 0.5em;
      border-radius: 0.5em;
    }
    .icon-list {
      width: 57vw;
      margin: 0em 0;
      li {
        margin: 0 0.5em;
        img {
          width: 80%;
          height: 80%;
        }
      }
    }
  }
  .kid-name-wraper {
    margin-left: 3vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: space-between;
    align-self: center;
    
  }
  .kid-name {
    color: #376283;
    font-size: 7vw;
    margin: 0;
    padding: 0;
  }
}

.fav-icon {
  cursor: pointer;
}

.emojis {
  position: absolute;
  cursor: pointer;
  .emoji {
    position: relative;
    top: -3em;
    right: -2em;
    animation: 1.5s blink-anim infinite;
  }
}

@keyframes blink-anim {
  0% {
    width: 30px;
  }
  50% {
    width: 40px;
  }
  100% {
    width: 30px;
  }
}
</style>