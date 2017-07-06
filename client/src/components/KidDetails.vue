<template>
  <section class="kid-details">
    <div class="kid-img">
      <img src="kid.imgURL">
    </div>
    <div class="properties">
      <div class="card-header hr">
        <h2>{{`${kid.firstName} ${kid.lastName}`}}  </h2>
        <i class="fa fa-pencil" aria-hidden="true"></i>
      </div>
      <ul>
        <li>status: 
          <span class="kid-present" v-show="kid.isPresent"> In Class </span> 
          <span class="kid-away" v-show="!kid.isPresent"> NOT IN CLASS </span></li>
        <li class="hr">last seen:</li>
      </ul>
      <div class="msg-parent">
        <el-input placeholder="Message parent" v-model="inputMsgParent"></el-input>
        <el-button type="success"><i class="fa fa-paper-plane" aria-hidden="true"></i></el-button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'kid-details',
  props: ['kid'],
  data() {
    return {
      inputMsgParent: '',
    }
  },
    created() {
    console.log('kid details:', this.kid)
  },
}
</script>

<style lang="scss" scoped>

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
  display: flex;
  flex-direction: column;
  width: 250px;
  // height: 350px;
  margin: 1em;
  border: 0.2em solid rgba(51, 51, 51,0.2);

  & ul {
    list-style-type: none;
    padding: 0;
    text-align: left;
    // align-self: flex-start

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
 border: {
  top-left-radius: 0.1em;
  top-right-radius: 0.1em;
  bottom: 0.1em solid rgba(0,0,0,0.07);
 } 
  background: lightgray;
  height: 150px;
  width: 100%;

  & img {
    max-width: 100%;
  }
}

.msg-parent {
  display: flex;
  justify-content: space-between;
  margin: 1.2em 0 ;
}

.hr {
  margin: 0.5em 0;
  border-bottom: 1px solid rgba(0,0,0,0.1);
}
</style>
