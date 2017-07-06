<template>
  <section class="main-panel">
    <h1> Main Panel </h1>
    <control-panel></control-panel>
    <kid-list></kid-list>
  </section>
</template>

<script>
import KidList from './KidList'
import KidEdit from './KidEdit'
import ControlPanel from './ControlPanel'
export default {
  name: 'main-panel',
  components: {
    KidList,
    KidEdit,
    ControlPanel
  },
  data() {
    return {
    }
  },
  methods: {
    }
}
</script>

<style lang="scss" scoped>
.main-panel {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  background: lightblue;
  padding: 2em;
  min-height: 100vh;
}
</style>
