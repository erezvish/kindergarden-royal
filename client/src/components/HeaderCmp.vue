<template>
  <el-row>
    <header>
      <div class="brand">
        <h1>KinderYA!</h1>
      </div>
      
      <ul class="nav-items">
        <li>
          <router-link class="router-link" to="/">
            <i class="fa fa-home" aria-hidden="true"></i>Home</router-link>
        </li>
        <li>
          <router-link class="router-link" to="/admin">
            <i class="fa fa-unlock-alt" aria-hidden="true"></i>Admin </router-link>
        </li>
        <li>
          <router-link class="router-link" to="/admin">
            <i class="fa fa-user-circle" aria-hidden="true"></i>Log-in</router-link>
        </li>
      </ul>
      <div class="nav-menu-btn">
        <i class="fa fa-bars" aria-hidden="true"></i>
      </div>
    </header>
  </el-row>
</template>

<script>
export default {
  name: 'header-cmp',
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
// * {
//   outline: 1px solid #333;
// }
@import url('https://fonts.googleapis.com/css?family=Boogaloo|Fredoka+One');
@import "../sass/vars.scss";

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
    margin: 0 0.6em;
    font-size: 1.2em;
    cursor: pointer;
  }
}

.nav-menu-btn {

  display: none;
  & .fa {
    margin: 0 0.6em;
    font-size: 2.2em;
  }
}

.el-row::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 18em;
  background: rgba(55, 98, 131, 0.2);
  box-shadow: 0 0 11px rgba(0, 0, 0, 0.3);
}


@media screen and (max-width: $sm) {
  .nav-items {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: absolute;
    top: 3.6em;
    left: 0;
    padding: 0;
    // height: 100%;
    margin: 0;
    background: #ADD8E6;
    z-index: 2;
    width: 100%;

    
    & li {
      font-size: 1.7em;
      margin:0.6em 0;

    }
  }

  .nav-menu-btn {
    display: initial;
    
  }

}
</style>
