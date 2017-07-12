<template>
  <el-row class="header-section">
    <header>
      <div class="brand">
  
        <h1>{{ t('KinderYA') }}!</h1>
  
      </div>
  
      <ul id="nav-items" class="nav-items clear-style" :class="{ 'menu-on': menuIsClicked }" :dir="direction">
        <li>
          <div class="lang-icons">
            <img @click="lang='eng'" src="../../static/img/eng.png">
            <img @click="lang='heb'" src="../../static/img/heb.png">
          </div>
        </li>
        <li>
          <ul class="navbar clear-style-nav">
            <li class="nav-item" @click="slideMenu" v-if="isAdmin || isBasic || isParent">
              <router-link class="router-link single-item" to="/">
                <i class="fa fa-home" aria-hidden="true"></i>{{ t('Home') }}</router-link>
            </li>
            <li v-if="isAdmin" @click="slideMenu">
              <router-link class="router-link single-item" to="/admin">
                <i class="fa fa-unlock-alt" aria-hidden="true"></i>{{ t('Admin') }}</router-link>
            </li>
            <li v-if="!isAdmin" @click="slideMenu">
              <router-link class="router-link single-item" to="/login">
                <i class="fa fa-user-circle" aria-hidden="true"></i>{{ t('Log In') }}</router-link>
            </li>
            <li v-if="isAdmin" @click="logout">
              <div class="single-item">
                <i class="fa fa-sign-out" aria-hidden="true"></i>
                {{ t('Log Out') }}
              </div>
            </li>
          </ul>
        </li>
  
      </ul>
      <div class="nav-menu-btn" @click="menuClicked">
        <i class="fa fa-bars" aria-hidden="true"></i>
      </div>
      </div>
    </header>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'header-cmp',
  data() {
    return {
      menuIsClicked: false,
      lang: 'eng'
    }
  },
  mounted() {
    this.$el.classList.add('root-comp')
  },
  watch: {
    lang: function (val) {
      this.$translate.setLang(val)
      this.$root.$el.setAttribute('dir', this.direction)
    }
  },
  computed: {
    ...mapState([
      'isAdmin',
      'isBasic',
      'isParent'
    ]),
    direction() {
      let direction = this.lang === 'eng' ? 'ltr' : 'rtl'
      return direction
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
              this.$router.push('/login')
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
@import "../sass/main.scss";
  // * {
  //   outline: 1px solid red;
  // }
h1 {
  margin: 0;
  font-family: 'Boogaloo','Varela Round', cursive; // font-family: 'Fredoka One', cursive;
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
.nav-item {
  margin: 1em;
}
.nav-items {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  .navbar {
    font-size: 1.7em;
    .fa {
      margin: 0 0.2em;
      font-size: 1.2em;
      cursor: pointer;
    }
    .single-item {
      // display: none;
      margin: 0 0.8em;
      padding: 0;
      cursor: pointer;
    }
  }
  .lang-icons {
    margin: 0 1.2em;
    font-size: 1.5em;
    & img {
      width: 1.6em;
      height: 1.6em;
    }
  }
}
.brand {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;
  position: relative; // margin-right: 1.5em;
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
  .lang-icons {
  display: flex;
  img {
    height: 1em;
    width: 1em;
    cursor: pointer;
    margin: 0.3em;
  }
}
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> MEDIA QUERIES <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //
//
@media screen and (max-width: $md) {
  .nav-items {
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    flex-direction: column-reverse;
    top: 0;
    height: 100vh;
    right: -70em;
    padding: 0;
    margin: 0;
    background: #376283;
    background: linear-gradient(to bottom, white -3em, #376283 12%);
    z-index: 2;
    width: 100%;
    transition: all, 0.8s;
    & li {
      // font-size: 1.5em;
      margin: 0.6em 0;
    }
  }
  .nav-menu-btn {
    display: initial;
    cursor: pointer;
  }
  .nav-items .navbar {
    position: relative;
    top: 1em;
    // flex-direction: column;
    li {
      // text-align: center;
      .single-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 1.1em;
        .fa {
          margin: 0.2em 0em;
          font-size: 170%;
        }
      }
    }
  }
  .nav-items .lang-icons {
    position: relative;
    top: 1em;
    & img {
      width: 1.7em;
      height: 1.7em;
    }
  }
}

@media screen and (max-width: $sm) {
  .nav-items .navbar {
    position: relative;
    top: 1em;
    flex-direction: column;
  }
}
// this class must be after the media query!
.menu-on {
  right: 0;
  transition: all, 0.7s;
}
</style>

<style>
.unScroll {
  overflow: hidden;
}
</style>