<template>
  <el-row>
    <el-col :xs="24" :sm="24" :md="23" :lg="23">
      <section class="control-panel">
  
        <i class="fa fa-search" aria-hidden="true" @click="toggleSearchBar"></i>
        <filter-cmp class="filter-cmp" :class="{showSearchBar: isSearchBarClicked}"> </filter-cmp>
        <!--<el-input placeholder="Search" icon="search" v-model="searchInput" @input=filterKids>-->
        <!--</el-input>-->

  
        <el-radio-group class="controls">
          <el-radio-button name="list-options" label="All"></el-radio-button>
          <el-radio-button name="list-options" label="Present"></el-radio-button>
          <el-radio-button name="list-options" label="Absent"></el-radio-button>
        </el-radio-group>
  

      </section>
    </el-col>
  </el-row>
</template>

<script>
import FilterCmp from './FilterCmp'
export default {
  name: 'control-panel',
  components: {
    FilterCmp
  },
  data() {
    return {
      searchInput: '',
      isSearchBarClicked: true
    }
  },
  methods: {
    filterKids() {
      console.log('filtering!')
    },
    setListView() {
      console.log('list-view activated...');
    },
    toggleSearchBar() {
      this.isSearchBarClicked = !this.isSearchBarClicked;
      console.log('toggle search bar...', this.isSearchBarClicked);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../sass/vars.scss";

// * {
//   outline: 1px solid #333;
// }
.el-row {
  display: flex;
  justify-content: center;
}

.control-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;

  height: 4em;
  box-shadow: 0 0 11px rgba(0, 0, 0, 0.2);
  border-radius: 0em;
  margin-bottom: 1em;
  padding: 0 0em;
  .filter-cmp {
    width: 100%;
  }

  &>* {
    margin: 0 1em;
  }
}

.control-panel {
  // display: flex;
  .controls {
    display: flex;
    padding: 2em!important;
  }

  & .fa {
    font: {
      size: 2em;
    }
    margin: 0.2em 0.4em;
    transition: all,
    0.3s; // @media screen and (max-width: 500px) {
    //   font: {
    //     size: 1.6em;
    //   }
    // }
  }

  & .fa:hover {
    cursor: pointer;
    color: #ADD8E6;
    transition: all, 0.3s;
  }
}

@media screen and (min-width: $xs) {
  .control-panel {
    justify-content: space-between;
    border-radius: 0em;
    padding: 0 2em;
    margin: 0 0 1.5em 0;
    background: rgba(255, 255, 255, 0.8);
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.9) .021em, rgba(255, 255, 255, 0.3));

    .fa-search {
      margin-left: 0;
      font-size: 2.6em;
      color: rgba(55, 98, 131, 0.6);
    }
  }
}

@media screen and (max-width: $sm) {
  .control-panel .filter-cmp {
    // display: none;
    position: absolute;
    top: 7em;
    // left: 0;
    margin: 0 auto;
    padding: 0 0em;
    z-index: 1;
    width: 80%;
  }
  .showSearchbar {
    border: 4px solid yellow!important;
    display: none;
    position: absolute;
    top: 7em;
    // left: 0;
    margin: 0 auto;
    padding: 0 0em;
    z-index: 1;
    width: 80%;
  }
}

@media screen and (min-width: $sm) {
  .control-panel {
    border-radius: 1em;
  }
}

@media screen and (min-width: $md) {
  .control-panel {
    .fa-search {
      display: none;
    }
    .filter-cmp {
      display: initial;
    }
  }
}
</style>
