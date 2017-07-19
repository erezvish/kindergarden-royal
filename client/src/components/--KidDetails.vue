<template>
  <!--<el-col :xs="24" :sm="8">-->
  <section class="kid-details" :class="classObject">
  
    <div class="kid-img" :class="{'kid-present': kid.isPresent, 'kid-away': !kid.isPresent}" :id="cameraId" @click.stop="toggleIsPresent">
      <img class="img-circle" :src="kid.imgUrl">
      <div class="emojis">
        <img class="emoji" src="../assets/msg-icon/heart.png" v-if="emojisObject.heart">
        <img class="emoji" src="../assets/msg-icon/heart-eyes.png" v-if="emojisObject.heartEyes">
        <img class="emoji" src="../assets/msg-icon/star.png" v-if="emojisObject.star">
        <img class="emoji" src="../assets/msg-icon/blink.png" v-if="emojisObject.wink">
      </div>
    </div>
    <div class="list-wraper">
      <div class="ctrl-icons" >
        <i class="fa fa-volume-control-phone" aria-hidden="true"></i>
        <i class="fa fa-camera" aria-hidden="true" @click.stop="cameraClicked"></i>
        <i v-show="isAdmin && isAdmArea" class="fa fa-pencil-square-o" aria-hidden="true" @click.stop="edit"></i>
        <i v-show="isAdmin && isAdmArea" class="fa fa-trash " aria-hidden="true" @click.stop="deleteKidCard"></i>
        <i v-show="isParent" class="m-icon fa fa-smile-o" aria-hidden="true"></i>
        <i class="m-icon fa fa-commenting-o" aria-hidden="true"></i>
      </div>
  
      <div class="kid-name-wraper" @click.stop="toggleIsPresent">
        <p class="kid-name">{{`${kid.firstName} ${kid.lastName}`}} </p>
      </div>
    </div>
    <ul class="status clear-style" @click.stop="toggleIsPresent">
      <li>
        <ul v-if="isParent" class="icon-list clear-style" :class="{'disabled': !kid.isPresent}">
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
    </ul>
  
    <!--<div class="container-right">-->
    <div v-if="isAdmArea" class="msg-parent">
      <el-input placeholder="Send Message" v-model="inputMsgParent" @keyup.native.enter="sendMessage"></el-input>
      <el-button type="default" @click="sendMessage">
        <i class="fa fa-paper-plane" aria-hidden="true"></i>
      </el-button>
    </div>
    <!--<div v-if="isAdmin && isAdmArea" class="action-icons">
                    <i class="fa fa-trash" @click.stop="deleteKidCard" aria-hidden="true"></i>
                    <i class="fa fa-camera" @click.stop="cameraClicked" aria-hidden="true"></i>
                  </div>-->
    <!--</div>-->
  
  </section>
  <!--</el-col>-->
</template>

<script>
import Webcam from 'webcamjs'
export default {
  name: 'kid-details',
  props: ['kid', 'isListView', 'isAdmin', 'isBasic', 'isAdmArea'],
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

// >>>>>>>>>>>>>>>>>>>>>>>>>>>> list view START <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// >>>>>>>>>>>>>>>>>>>>>>>>>>>> list view END <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

.kid-details {
  display: flex;
  flex-direction:row;
  justify-content: flex-start;
  padding: 4vw 0;
  flex-basis: 100%;
  background: linear-gradient(rgba(148, 192, 209, 0.5), white, rgba(148, 192, 209, 0.5));
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

 .kid-img {
  position: relative;
  // z-index: 4;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  background: orange;
  width: 20vw;
  height: 20vw;
  margin: 0 1em;
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
}
.list-wraper {
  display: flex;
  flex-direction: column-reverse;
  flex-basis: 70%;
  .kid-name-wraper {
    .kid-name {
      margin:0 0 0.8em 0;
      font-size: 1.8em;
      text-align: left;
    }
  }
}
.msg-parent {
  display: none;
}

.ctrl-icons {
  display: flex;
  justify-content: flex-start;
  .fa {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 1.2vw;
    padding: 0.6em;
    width: 2vw;
    height: 2vw;
    background: rgba(255, 255, 255, 0.6);
    color: $color-default-faded;
    font-size: $fa-mobile-small;
    box-shadow: 0 0 5px 1px #376283;
    border-radius: 50%;
    cursor: pointer;
    transition: $trans-default;
    &:hover {
      color: $color-default;
      transition: $trans-default;
      position: relative;
      animation: floatIcon 0.5s infinite normal ease-out;
    }
  }

  @keyframes floatIcon {
  0% {
    top: 0;
  }
  50% {
    top: -0.3em;
  }
  100% {
    top: 0em;
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

  }
</style>