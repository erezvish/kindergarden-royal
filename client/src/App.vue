<template>
  <div id="app" ref="app">
    <header-cmp v-if="showHeader"> </header-cmp>
    <main>
      <router-view @toggle-header="setShowHeader"></router-view>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import appSpeech from './speech/app.speech'
import HeaderCmp from './components/HeaderCmp'
export default {
  name: 'app',
  components: {
    HeaderCmp
  },
  data() {
    return {
      showHeader: true,
    }
  },
  computed: mapState([
    'isAdmin',
    'isBasic',
    'isParent'
  ]),
  created() {
    const id = this.$route.params.kidId
    const that = this
    let currPath = this.$route.path
    if (!this.isAdmin && !this.isBasic) {
      this.$router.push('/intro')
      setTimeout(function () {
        // that.$router.push(currPath)
        that.$store.dispatch({
          type: 'checkUser',
          id,
          that
        })
      }, 5000);
    }
    this.$store.dispatch({
      type: 'initSocket',
    })
    this.$store.dispatch({
      type: 'getMessages',
    })
    this.$store.dispatch({
      type: 'getKids'
    })

    annyang.addCommands(this.voiceCommands);
  },
  destroyed() {
    annyang.abort()
  },
  methods: {
    setShowHeader(showStatus) {
      this.showHeader = showStatus;
    }
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', 'Varela Round', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
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
