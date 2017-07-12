<template>
  <section class="main-panel" v-if="isAdmin || isBasic || isParent">
    <control-panel></control-panel>
    <kid-list :isAdmArea="false"></kid-list>
  </section>
</template>

<script>
import { mapState } from 'vuex'
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
  computed: mapState([
    'isAdmin',
    'isBasic',
    'isParent'
  ])
}
</script>

<style lang="scss" scoped>
@import "../sass/main.scss";

.main-panel {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  background: lightblue;
  padding: 2em;
  min-height: 100vh;
}


// ------------------------- MEDIA QUERIES ------------------------- //
//
@media screen and (min-width: $xs) {
  .main-panel {
    padding: 0em;
  }
}

@media screen and (min-width: $sm) {
  .main-panel {
    padding: 1em;
  }
}

@media screen and (min-width: $md) {
  .main-panel {
    padding: 2em;
  }
}
</style>
