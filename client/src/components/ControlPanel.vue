<template>
  <el-row>
    <el-col :xs="24" :sm="24" :md="23" :lg="23">
      <section class="control-panel">
        <div class="icon-wraper">
          <i class="fa fa-microphone" aria-hidden="true" :class="{'disabled': isSearchBarHidden}"></i>
          <i class="fa fa-search" aria-hidden="true" @click="toggleSearchBar" :class="{'hideSearchBar': !isSearchBarHidden}"></i>
          <i class="fa fa-filter" aria-hidden="true" @click="toggleSearchBar" :class="{'hideSearchBar ': isSearchBarHidden}"></i>
        </div>
        <div class="search-and-filter">
            <el-input type="search" class="search-bar" :class="{'hideSearchBar': isSearchBarHidden}" placeholder="Search" icon="search" v-model="searchInput" @input="filterKids">
            </el-input>
          <div class="filter-wraper" :class="{'hideSearchBar': !isSearchBarHidden}">
            <el-radio-group class="controls" v-model="radioSelected">
              <el-radio-button label="all">All</el-radio-button>
              <el-radio-button label="present">Present</el-radio-button>
              <el-radio-button label="absent">Absent</el-radio-button>
            </el-radio-group>
          </div>
          </div>
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
      isSearchBarHidden: true,
      radioSelected: 'ignore',

      voiceCommands: {
        'search *spokenFilter': this.runSpokenFilter,
        'find *spokenFilter': this.runSpokenFilter,
      }
    }
  },
  computed: {

  },
  created() {
    annyang.addCommands(this.voiceCommands)
  },
  methods: {
    filterKids() {
      console.log('filtering!')
      this.$store.dispatch({
        type: 'filterKids',
        text: this.searchInput,
        radio: this.radioSelected
      })
    },
    setListView() {
      console.log('list-view activated...');
    },
    toggleSearchBar() {
      this.isSearchBarHidden = !this.isSearchBarHidden;
      console.log('toggle search bar...', this.isSearchBarHidden);
    },
    runSpokenFilter(spokenFilter) {
      this.searchInput = spokenFilter;
      this.filterKids()
    },
    radioClicked() {
      console.log('radio clicked!')
    }
  },
  watch: {
    radioSelected(val) {
      this.filterKids();
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../sass/main.scss";

* {
  outline: 1px solid #333;
}

.el-row {
  display: flex;
  justify-content: center;
}

.control-panel {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0em;
  margin-bottom: 1.5em;
  height: 4em;
  background: rgba(255, 255, 255, 0.8);
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.9) .021em, rgba(255, 255, 255, 0.3));
  border-radius: 0em;
  box-shadow: 0 0 11px rgba(0, 0, 0, 0.2);
  .icon-wraper {
    .fa {
      font-size: 2em;
      margin: 0 0.2em;
    }
    .disabled {
      opacity: 0.3;
    }
  }
  .search-and-filter {
    display: flex;
    .filter-wraper {
      display: flex;
      .controls {
        display: flex;
            
      }
    }
  }
  .hideSearchBar {
    display: none!important;
    transition: all, 1s;
    visibility: hidden;
    opacity: 0;
  }
}


// ------------------------- MEDIA QUERIES ------------------------- //
//
@media screen and (min-width: $xs) {
  .control-panel {
    padding: 0 0.5em;
  }
}


@media screen and (min-width: $sm) {
  .control-panel {
    justify-content: space-between;
    border-radius: 1em;
    padding: 0 0.8em;
  }
}


@media screen and (min-width: $md) {
  .control-panel {
    .filter-wraper {
    }
    border-radius: 1em;
    padding: 0 0.8em;
    .icon-wraper {
      .fa-search {
        // visibility: hidden;
        display: none;
      }
    }
      .search-bar {
        display: initial;  
      }
  }
}
</style>
