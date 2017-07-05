<template>
    <el-row>
      <el-col :xs="24" :sm="24" :md="20">
        <section class="kid-edit">
          <!--<div class=-->
          <h1> Kid edit </h1>
          <div class="editor-header">
            editor header
              <div class="kid-img">
              
              </div>
          </div>
          <div class="editor-nav">
            <h1>nav</h1>
          </div>
        </section>
      </el-col>
    </el-row>
</template>

<script>
export default {
  name: 'kid-edit',
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
.el-row {
  display: flex;
  justify-content: center;
}
.kid-edit {
  width: 100%;
  display: flex;
  align-self: center;
  background: white;
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 11px rgba(0, 0, 0, 0.2);
  border-radius: 1em;
  margin-bottom: 1em;
}

.editor-header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 16.6em;
  
  padding: 0 2em;
  & .kid-img {
    background: #f4f4f4;
    background-image: url('../assets/img-kid/img.png');
    background-size: cover;
    position: relative;
    top: 2.3em;
    width: 11.6em;
    height: 11.6em;
    border: 1px solid rgba(0, 0, 0, 0.2);
    // box-shadow: 0 0 11px rgba(0, 0, 0, 0.2);
  }
}

.editor-nav {
  background: #376283;
  color: white;
  // border-bottom: 5px solid rgba(255,255,255,0.5);
  box-shadow: 0 0 11px rgba(0, 0, 0, 0.2);
}
</style>