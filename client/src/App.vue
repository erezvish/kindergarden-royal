<template>
  <div id="app">
    <header-cmp> </header-cmp>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import appSpeech from './speech/app.speech'
import HeaderCmp from './components/HeaderCmp'
export default {
  name: 'app',
  components: {
    HeaderCmp
  },
  data() {
    return {
      temp: {
        'hello': function () { alert('Hello world!'); },
        'hey': () => { this.$message('Hello'); },
      }
    }
  },
  created() {
    this.$store.dispatch({
      type: 'initSocket',
    })
    console.log('fetching kids from state!')
    this.$store.dispatch({
      type: 'getKids'
    })

    // Add our commands to annyang
    annyang.addCommands(this.temp);
    annyang.start();
  },
  destroyed() {
    annyang.abort()
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center; // margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}

// Media queries sizes
</style>
