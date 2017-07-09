<template>
  <section :class="classObject" @click="toggleIsPresent">
    <div class="kid-img" :id="cameraId">
      <img :src="kid.imgUrl">
    </div>
    <div class="properties">
      <div class="card-header hr">
        <h2>{{`${kid.firstName} ${kid.lastName}`}} </h2>

        <el-button @click.stop="edit">

          <i class="fa fa-pencil" aria-hidden="true"></i>
        </el-button>
      </div>
      <ul>
        <li>status:
          <span class="kid-present" v-show="kid.isPresent"> In Class </span>
          <span class="kid-away" v-show="!kid.isPresent"> NOT IN CLASS </span>
        </li>
  
        <li class="hr">last seen:</li>
      </ul>
      <div class="msg-parent x-space-child">
        <el-input placeholder="Message parent" v-model="inputMsgParent"></el-input>
        <el-button type="default">
          <i class="fa fa-paper-plane" aria-hidden="true"></i>
        </el-button>
      </div>
      <div class="action-icons">
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
  </section>
</template>

<script>
import Webcam from 'webcamjs'
export default {
  name: 'kid-details',
  props: ['kid', 'isListView'],
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
        'list-view': this.isListView
      }
    }
  },
  methods: {
    toggleIsPresent() {
      this.$emit('toggle')
    },
    deleteKidCard() {
      this.$emit('delete')
    },
    edit() {
      this.$emit('edit')

    },
    cameraClicked() {
      if (this.isCameraOn) {
        Webcam.freeze()
        let capturedImgUrl = null;
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

    }
  }
}
</script>

<style lang="scss" scoped>
@import "../sass/main.scss";
// * {
//   outline: 1px solid green;
// }
.properties {
  padding: 0 0.5em;

  & .fa {
    // font-size: 1.8em;
  }
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
  border: none;
  background: rgba(0, 155, 2, 0.7); // background: linear-gradient(to bottom, rgba(0, 155, 2, 0.7), lightgreen 2em, rgba(0, 155, 2, 0.7) 17em);
  background: linear-gradient(to top, rgba(0, 155, 2, 0.7) 1%, lightgreen 0.5em, rgba(0, 155, 2, 0.7) 50%);
  color: white;
}

.mark-absent {
  border: none;
  background: rgba(230, 0, 0, 0.9); // background: linear-gradient(to bottom, rgba(200, 0, 0, 1), lightcoral 1em, rgba(230, 0, 0, 0.9) 18em);
  background: linear-gradient(to top, rgba(200, 0, 0, 1) 1%, lightcoral 0.5em, rgba(230, 0, 0, 0.9) 18em);
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
}

.hr {
  margin: 0.5em 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.list-view {
  display: flex;
  flex-direction: row;
  background: yellow;
  outline: 12px solid BLUE;
}
</style>
