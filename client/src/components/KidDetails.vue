<template>
  <section :class="classObject" @click.self="toggleIsPresent">
  
    <div class="kid-img" :id="cameraId" @click.stop="toggleIsPresent">
      <img :src="kid.imgUrl">
    </div>
    <div class="properties">
      <div class="container">
        <div class="card-header hr" @click.stop="toggleIsPresent">
          <h2>{{`${kid.firstName} ${kid.lastName}`}} </h2>
  
          <el-button v-if="isAdmin && isAdmArea" @click.stop="edit">
            <i class="fa fa-pencil" aria-hidden="true"></i>
          </el-button>
        </div>
        <ul class="status" @click.stop="toggleIsPresent">
          <li> {{ t('Status') }}:
            <span class="kid-present" v-show="kid.isPresent"> {{ t('In class') }} </span>
            <span class="kid-away" v-show="!kid.isPresent"> {{ t('NOT IN CLASS') }} </span>
          </li>
  
          <!--<li class="hr"> {{ t('Last seen') }}:</li>-->
        </ul>
  
      </div>
      <div class="container-right" @click.self="toggleIsPresent">
        <div class="msg-parent x-space-child">
          <el-input placeholder="Send Message" v-model="inputMsgParent" @keyup.native.enter="sendMessage"></el-input>
          <el-button type="default" @click="sendMessage">
            <i class="fa fa-paper-plane" aria-hidden="true"></i>
          </el-button>
        </div>
        <div v-if="isAdmin && isAdmArea" class="action-icons" @click.self="toggleIsPresent">
          <div class="icons-left">
            <i class="fa fa-trash" @click.stop="deleteKidCard" aria-hidden="true"></i>
            <i class="fa fa-cog" aria-hidden="true"></i>
          </div>
          <div class="icons-right">
            <i class="fa fa-camera" @click.stop="cameraClicked" aria-hidden="true"></i>
            <i class="fa fa-medkit" aria-hidden="true"></i>
            <i class="fa fa-phone-square" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </div>
  </section>
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
      cameraId: 'K' + this.kid._id
    }
  },
  computed: {
    classObject() {
      return {
        'kid-details': true,
        'mark-present': this.kid.isPresent,
        'mark-absent': !this.kid.isPresent,
        'list-view': this.isListView,
        // 'kid-details-container': this.isListView
      }
    },
    imgUrl() {
      return this.kid.imgUrl
    }
  },
  created() {
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
    cameraClicked() {
      if (this.isCameraOn) {
        let capturedImgUrl = null;
        // console.log('url before change:', this.kid.imgUrl)
        Webcam.snap(function (data_uri) {
          capturedImgUrl = data_uri;
        });
        Webcam.reset()
        let updatedKid = Object.assign({}, this.kid)
        updatedKid.imgUrl = capturedImgUrl;
        this.$emit('picture', updatedKid, this.kid)
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
.el-row {
  display: flex;
}

.properties {
  padding: 0 0.5em;
  & .fa {
    // font-size: 1.8em;
  }
}

.kid-details-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.kid-details {
  background: white;
  border-radius: 1em;
  padding: 1em;
  display: flex;
  flex-direction: column;
  padding-top: 1em;
  width: 250px; // height: 350px;
  margin: 1em;
  border: 0.2em solid rgba(51, 51, 51, 0.2);
  cursor: pointer;
  box-shadow: 0 0 8 px #333;
  & ul {
    list-style-type: none;
    padding: 0;
    text-align: left; // align-self: flex-start
    & li {
      padding: 0.5em 0;
    }
  }
  & .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.kid-img {
  position: relative;
  border: {
    top-left-radius: 0.1em;
    top-right-radius: 0.1em;
    bottom: 0.1em solid rgba(0, 0, 0, 0.07);
  }
  background: lightgray;
  height: 150px;
  width: 100%;
  & img {
    max-width: 100%;
  }
}

.mark-present {
  background: rgba(0, 155, 2, 0.7);
  background: $bg-present;
  color: white;
}

.mark-absent {
  background: lightcoral;
  background: $bg-absent;
  color: white;
}

.msg-parent {
  display: flex;
  justify-content: space-between;
  margin: 1.2em 0;
}

.action-icons {
  display: flex;
  justify-content: space-between;
  font-size: 2em;
  .fa {
    margin: 0.1em;
    color: rgba(0, 0, 0, 0.4);
    transition: all, 0.4s;
  }
  .fa:hover {
    color: #fff;
    transition: all, 0.4s;
  }
  .icons-left,
  .icons-right {
    display: flex;
  }
}

.hr {
  margin: 0.5em 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.list-view {
  width: 100%;
  display: flex;
  flex-direction: row;
  .properties {
    display: flex;
    flex: 1;
    flex-direction: row;
    & .container {
      flex-direction: row;
      width: 100%;
      padding: 10px;
      text-align: left;
    }
    & .container-right {
      flex-direction: column;
      width: 100%;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      .msg-parent {
        margin-top: 8px;
      }
      .action-icons {
        align-self: flex-end;
        >* {
          margin-left: 0.4em;
        }
      }
    }
  }
  .kid-img {
    max-width: 13em;
    display: inline;
  }
  .card-header {
    display: flex;
    h2 {
      margin: 0;
    }
    .status {
      margin: 0;
    }
  }
  @media screen and (max-width: $md) {
    .msg-parent {
      display: none;
    }
    .list-view {
      display: none;
    }
    .card-header {}
  }
}

// ------------------------- MEDIA QUERIES ------------------------- //
//
</style>