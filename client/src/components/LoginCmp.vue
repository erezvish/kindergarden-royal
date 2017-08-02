<template>
  <el-row class="login">
    <el-col :xs="24" :sm="17" :md="10">
      <section class="login-container">
        <i class="fa fa-user-circle" aria-hidden="true"></i>
        <h1> {{t('Log In')}} </h1>
        <div class="kid-details-container" dir="ltr">
  
          <!-- form -->
          <el-form action="" ref="login">
            <div>
              <el-input ref="username" type="text" placeholder="Type a for admin, b for basic" autofocus required v-model="user.username" @keyup.native.enter="isPasswordFocused = true"></el-input>
            </div>
            <div>
              <el-input ref="password" type="password" placeholder="Type a for admin, b for basic" required v-model="user.pass" @keyup.native.enter="submit"></el-input>
            </div>
            <div>
              <el-button type="success" value="Login" @click="submit" autofocus>{{t('Ok')}}</el-button>
            </div>
            <div>
              <!--<a href="#">Lost your password?</a>-->
              <!--<a href="#">Register</a>-->
            </div>
          </el-form>
          <!-- form -->
  
        </div>
      </section>
    </el-col>
  </el-row>
</template>

<script>
import Vue from 'vue'
export default {
  data() {
    return {
      user: {
        username: '',
        pass: ''
      },

      username: 'username',
      password: 'password',
      isPasswordFocused: false
    }
  },
  watch: {
    isPasswordFocused(val) {
      this.toggleFocus(val)
    }
  },
  methods: {
    toggleFocus(isPasswordFocused) {
      if (isPasswordFocused) this.$refs.password.$el.querySelector('input').focus()
      else this.$refs.username.$el.querySelector('input').focus()
    },
    submit() {
      this.$store.dispatch({
        type: 'login',
        user: this.user
      })
        .then((res) => {
          this.$router.push('/')
        },
        () => {
          this.$message({
            type: 'error',
            message: 'Error in log in'
          })
          this.$router.push('/login')
          this.user.username = ''
          this.user.pass = ''
        })
      this.isPasswordFocused = false
    }
  }
}

</script>

<style lang="scss" scoped>
@import "../sass/main.scss";

.login {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  background: lightblue;
  padding: 2em;
  min-height: 100vh;
}

.login-container {
  padding: 2em;
  display: flex;
  flex-direction: column;
  background: white;
  background: $bg-login;
  box-shadow: 0 0 11px rgba(0, 0, 0, 0.2);
  border-radius: 1em;
  margin-bottom: 1em;

  & .fa {
    font-size: 6em;
  }
}

.kid-details-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.el-form {
  display: flex;
  width: 100%;
  flex-direction: column;
  &>div {
    margin: 1em 0;
    width: 100%;
  }
}

// * {
//   outline: 1px solid #333;
// }

</style>
