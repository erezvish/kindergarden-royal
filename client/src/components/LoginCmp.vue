<template>
  <el-row class="login">
    <el-col :xs="24" :sm="17" :md="10">
      <section class="login-container">
        <i class="fa fa-user-circle" aria-hidden="true"></i>
        <h1> Log-in </h1>
        <div class="kid-details-container">
  
          <!-- form -->
          <el-form action="">
            <div>
              <el-input type="text" placeholder="Username" required="" id="username"></el-input>
            </div>
            <div>
              <el-input type="password" placeholder="Password" required="" id="password"></el-input>
            </div>
            <div>
              <el-button type="success" value="Login">Log-in</el-button>
            </div>
            <div>
              <a href="#">Lost your password?</a>
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


</script>

<style lang="scss" scoped>
// * {
//   outline: 1px solid #333;
// }

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
</style>
