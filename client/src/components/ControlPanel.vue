<template>
  <el-row>
    <el-col :xs="24" :sm="24" :md="23" :lg="23">
      <section class="control-panel">
        <i class="fa fa-microphone" aria-hidden="true" :class="{'hideSearchBar': isSearchBarHidden}" @click="activateVoice"></i>
        <el-input type="search" class="search-bar" :class="{'hideSearchBar': isSearchBarHidden}" placeholder="Search" icon="search" v-model="searchInput" @input="filterKids">
        </el-input>
        <i class="fa fa-search" aria-hidden="true" @click="toggleSearchBar"></i>
        <div class="controls-wraper" :class="{'hideSearchBar': !isSearchBarHidden}">
          <el-radio-group class="controls" v-model="radioSelected">
            <el-radio-button label="all">All</el-radio-button>
            <el-radio-button label="present">Present</el-radio-button>
            <el-radio-button label="absent">Absent</el-radio-button>
          </el-radio-group>
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
        'clear': this.clearFilter,
        'show *radioSelection': this.runSpokenRadioFilter
      },
      audioSounds: {
        micAudio1: new Audio('/static/sound/mic1.mp3'),
        micAudio2: new Audio('/static/sound/mic2.mp3'),
      },
      micDuration: 5000
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
    runSpokenRadioFilter(radioSelection) {
      debugger;
      if (radioSelection.toLowerCase === 'all') this.radioSelected = 'all';
      else if (radioSelection.toLowerCase === 'here') this.radioSelected = 'present'
      else if (radioSelection.toLowerCase === 'away') this.radioSelected = 'absent'
    },
    clearFilter() {
      this.searchInput = '';
      this.filterKids()
    },
    radioClicked() {
      console.log('radio clicked!')
    },
    activateVoice() {
      if (!annyang.isListening()) {
        annyang.start();
        this.audioSounds.micAudio2.play()
        this.$message({
          message: 'Mic is on!',
          duration: this.micDuration,
          type: 'success'
        });
        setTimeout(() => {
          annyang.abort()
          this.audioSounds.micAudio1.play()
          this.$message('Mic is off!')
        }, this.micDuration)
      }
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

// ------------------------- MEDIA QUERIES ------------------------- //
//
@media screen and (min-width: $xs) {
  .control-panel {
    // display: none;
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
  .control-panel .filter-cmp {
    display: none;
  }
}

@media screen and (max-width: $sm) {
  .control-panel {
    .controls-wraper {
      margin: 0;
    }
  }
  .search-bar {
    position: absolute;
    margin: 0 18%;
    width: 66%;
    z-index: 1;
    visibility: visible;
    opacity: 1;
    transition: all, 1s;
  }
  .hideSearchBar {
    transition: all, 1s;
    visibility: hidden;
    opacity: 0;
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
      border: 14px solid red;
    }
  }
}
</style>
