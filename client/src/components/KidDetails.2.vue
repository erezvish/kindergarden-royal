<template>
<!--<el-col :xs="12" :sm="8">-->
  <section class="main-section" :class="classObject">
  
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
      <div class="ctrl-icons" v-if="isAdmin && isAdmArea">
        <i class="fa fa-volume-control-phone" aria-hidden="true"></i>
        <i class="fa fa-camera" aria-hidden="true" @click.stop="cameraClicked"></i>
        <i class="m-icon fa fa-pencil-square-o" aria-hidden="true" @click.stop="edit"></i>
        <i class="m-icon fa fa-trash " aria-hidden="true" @click.stop="deleteKidCard"></i>
      </div>
  
      <div class="kid-name-wraper" @click.stop="toggleIsPresent">
        <p class="kid-name">{{`${kid.firstName} ${kid.lastName}`}} </p>
      </div>
    </div>
    <ul class="status clear-style" @click.stop="toggleIsPresent">
      <li>
        <ul v-if="isAdmin" class="icon-list clear-style" :class="{'disabled': !kid.isPresent}">
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
//
.main-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1.9vw 0.9vw;
  padding-top: 0.7em;
  background: linear-gradient(rgba(148, 192, 209, 0.5), white, rgba(148, 192, 209, 0.5));
  box-shadow: 0 0 11px rgba(0, 0, 0, 0.1);
  border-top-left-radius: 5%;
  border-top-right-radius: 5%;
  border: {
    left: $border-alpha-narrow;
    right: $border-alpha-narrow;
  }
}

.kid-img {
  position: relative;
  z-index: 1;
  display: flex; // flex-direction: column;
  justify-content: center;
  align-items: center;
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

.ctrl-icons {
  position: relative;
  top: -1em;
  z-index: 2;
  width: 100%;
  display: flex;
  justify-content: center;
  .fa {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 0.2vw;
    padding: 0.4em;
    width: 2vw;
    height: 2vw;
    background: rgba(255, 255, 255, 0.6);
    color: $color-default-faded;
    font-size: 2.2vw; // border: 1px solid #376283;
    box-shadow: 0 0 5px 1px #376283;
    border-radius: 50%;
    cursor: pointer;
    transition: $trans-default;
    &:hover {
      color: $color-default;
      transition: $trans-default;
    }
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

.msg-parent {
  display: flex; // width:100%;
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

.kid-name-wraper {
  display: flex;
  justify-content: center;
  width: 100%;
  .kid-name {
    font-size: 2.4vw;
    margin: 0.1em 0;
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

.list-view {
  margin: 0;
  padding: 0.6em 0;
  width: 100%;
  background: yellow;
  background: linear-gradient(rgba(148, 192, 209, 0.5), white, rgba(148, 192, 209, 0.5));
  flex-direction: row;
  justify-content: flex-start;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  .kid-img {
    width: 11vw;
    height: 11vw;
  }
  .list-wraper {
    margin: 0 2em 0 1em;
    display: flex;
    height: 100%;
    flex-direction: column-reverse;
    justify-content: space-around;
  }
  .kid-name-wraper {
    // align-self: flex-start;
    justify-content: flex-start;
  }
  .ctrl-icons {
    .fa {
      margin: 0 0.3em 0 0; // font-size: 4.6vw;
    }
  }
  .status {
    position: relative;
  
    order: 4;
    margin: 0 auto;
    .icon-list img {
      max-width: 3.2vw;
      max-height: 3.2vw;
      width: 100%;
      height: 100%;
    }
  }
  .msg-parent {
    // position: absolute;
    right: 10%;
    order: 3;
  }
}
// ------------------------- MEDIA QUERIES ------------------------- //
//
// @media screen and (max-width: $md) {
//   .main-section {
//     width: 30vw;
//     padding: 0;
//   }
// }

// @media screen and (max-width: $md) {
//   .main-section {
//     width: 30%;
//   }
//   .kid-img {
//     width: 25vw;
//     height: 25vw; // max-width: 23vw;
//     // max-height: 23vw;
//     margin: 0 1em;
//     border-radius: 50%;
//     box-shadow: 0 0 11px #333;
//     cursor: pointer; // .ctrl-icons {
//     //   .fa {
//     //     width: 3vw;
//     //     height: 3vw;
//     //     color: $color-default;
//     //   }
//     // }
//     .img-circle {
//       width: 90%;
//       height: 90%;
//       border-radius: 50%;
//     }
//   }
//   .status {
//     .icon-list {
//       margin: 1em 0;
//       li {
//         margin: 0 0.5em;
//         img {
//           // width: 80%;
//           // height: 80%;
//         }
//       }
//     }
//   }
//   .kid-name {
//     font-size: 3vw;
//   }
// }
// @media screen and (max-width: $sm) {
//   .main-section {
//     margin: 0.4em 0;
//     padding: 0.1em 0;
//     flex-direction: row;
//     justify-content: space-between;
//     align-items: center;
//     width: 90vw;
//     border-bottom: 1px solid rgba(0, 0, 0, 0.2);
//   }
//   .kid-img {
//     width: 21vw;
//     height: 21vw;
//     margin: 0 0;
//     box-shadow: 0 0 2px #333;
//   }
//   .container-right {
//     display: none;
//     flex-direction: column-reverse;
//   }
//   .status {
//     margin: 0.5em 0;
//     .icon-list {
//       // width: 50vw;
//       margin: 0em 0;
//       li {
//         width: 7vw;
//         margin: 0 0.5em; // display: none;
//         img {
//           width: 100%;
//           height: 100%;
//         }
//       }
//     }
//   }
//   .kid-name-wraper {
//     width: 70%;
//     display: flex;
//     flex-direction: column;
//     align-items: flex-start; // justify-content: space-between;
//   }
//   .kid-name {
//     color: #376283;
//     font-size: 6vw;
//     margin: 0;
//     padding: 0;
//   }
//   .emojis {
//     cursor: pointer;
//     .emoji {
//       position: absolute;
//       top: 0;
//       animation: 1.5s blink-anim infinite;
//     }
//   }
//   @keyframes blink-anim {
//     0% {
//       width: 1vw;
//       opacity: 0;
//       transform: rotate(0deg);
//     }
//     50% {
//       width: 19vw;
//       opacity: 0.7;
//       transform: rotate(360deg);
//     }
//     100% {
//       width: 1vw;
//       opacity: 0;
//       transform: rotate(0deg);
//     }
//   }
// }
// .fav-icon {
//   cursor: pointer;
// }
</style>