<template>
  <section class="main-panel">
    <h1> Main Panel </h1>
    <control-panel></control-panel>
    <card-list></card-list>
  </section>
</template>

<script>
import CardList from './CardList'
import ControlPanel from './ControlPanel'
export default {
  name: 'main-panel',
  components: {
    CardList,
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.main-panel {
  background: pink;
}
</style>
