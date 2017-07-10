<template>
  <el-row class="header-section">
    <header>
      <div class="brand">
        <h1>KinderYA!</h1>
      </div>
  
      <ul id="nav-items" class="nav-items" :class="{ 'menu-on': menuIsClicked }">
        <li @click="slideMenu">
          <router-link class="router-link" to="/">
            <i class="fa fa-home" aria-hidden="true"></i>Home</router-link>
        </li>
  
        <li v-if="isAdmin" @click="slideMenu">
          <router-link class="router-link" to="/admin">
            <i class="fa fa-unlock-alt" aria-hidden="true"></i>Admin </router-link>
        </li>
        <li v-if="!isAdmin" @click="slideMenu">
          <router-link class="router-link" to="/login">
            <i class="fa fa-user-circle" aria-hidden="true"></i>Login </router-link>
        </li>
        <li v-if="isAdmin" @click="logout">
          <router-link class="router-link" to="/">
            <i class="fa fa-sign-out" aria-hidden="true"></i>Logout</router-link>
        </li>
        <!--<li v-if="isAdmin" @click="logout" class="">
            <router-link class="router-link" to="/">
            <i class="fa fa-user-circle " aria-hidden="true"></i>Logout</router-link>
          </li>-->
      </ul>
      <div class="nav-menu-btn" @click="menuClicked">
        <i class="fa fa-bars" aria-hidden="true"></i>
      </div>
      </div>
    </header>
  </el-row>
</template>

<script>
export default {
  name: 'header-cmp',
  data() {
    return {
      menuIsClicked: false,
    }
  },
  computed: {
    isAdmin() {
      return this.$store.state.isAdmin
    }
  },
  methods: {
    iconClicked: () => {

    },
    menuClicked: function () {
      this.menuIsClicked = !this.menuIsClicked;
      // $('body, html').css('overflow-y', 'hidden');
      console.log('Clicking on menu btn: ', this.menuIsClicked);
      var fixed = document.querySelector('body');
      if (this.menuIsClicked) {
        fixed.classList.add('unScroll');
        console.log(fixed);
      } else {
        fixed.classList.remove('unScroll');
      }
    },
    slideMenu: function () {
      console.log('slide menu...');
      var fixed = document.querySelector('body');
      var nav = document.querySelector('.nav-items');
      nav.classList.remove('menu-on');
      fixed.classList.remove('unScroll');
      this.menuIsClicked = false;

    },
    logout() {
      this.$confirm('Are you sure?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'info'
      })
        .then(() => {
          this.$store.dispatch({
            type: 'logout'
          })
            .then(() => {
              this.$message({
                type: 'success',
                message: 'logout successful'
              })
              this.$router.push('/')
            })
            .catch(() => {
              this.$message({
                type: 'error',
                message: 'log out failed :-('
              })
            })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
// * {
//   outline: 1px solid #333;
// }

@import url('https://fonts.googleapis.com/css?family=Boogaloo|Fredoka+One');
@import "../sass/main.scss";

h1 {
  margin: 0;
  font-family: 'Boogaloo', cursive; // font-family: 'Fredoka One', cursive;
  font-size: 3em;
}

a {
  color: white;
  text-decoration: none;
}

a:active {
  color: pink;
}

a:hover {
  color: white;
}

.header-section::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 18em;
  background: rgba(55, 98, 131, 0.2);
  box-shadow: 0 0 11px rgba(0, 0, 0, 0.3);
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #376283;
  height: 5em;
  border-bottom: 0.5em solid rgba(0, 0, 0, 0.2);
}

.router-link {
  margin: 1em;
}

.nav-items {
  list-style-type: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font: {
    size: 1.5em;
  }

  & .fa {
    margin-right: 0.6em;
    font-size: 1.2em;
    cursor: pointer;
  }
}

.brand {
  position: relative;
  z-index: 3;
}

.nav-menu-btn {
  position: relative;
  z-index: 3;
  display: none;
  & .fa {
    margin: 0 0.6em;
    font-size: 2.2em;
  }
}


// -------------------------------
@media screen and (max-width: $sm) {
  .nav-items {
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    top: 0;
    height: 100vh;
    right: -20em;
    padding: 0;
    margin: 0;
    background: #376283;
    background: linear-gradient(to bottom, white -3em, #376283 12%);
    z-index: 2;
    width: 100%;
    transition: all, 0.8s;

    & li {
      font-size: 1.5em;
      margin: 0.6em 0;
    }
  }

  .nav-menu-btn {
    display: initial;
  }
}

.menu-on {
  right: 0;
  transition: all, 0.7s;
}
</style>


// unscoped style

<style>
.unScroll {
  overflow: hidden;
}
</style>