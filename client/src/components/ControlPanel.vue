<template>
  <el-row>
    <el-col :xs="24" :sm="24" :md="23" :lg="20">
      <section class="control-panel">
        <i class="fa fa-cogs" aria-hidden="true"></i>
        <filter-cmp class="filter-cmp"> </filter-cmp>
        <!--<el-input placeholder="Search" icon="search" v-model="searchInput" @input=filterKids>-->
        <!--</el-input>-->
        
          <el-radio-group  class="controls">
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
      triggerListView: false
    }
  },
  methods: {
    filterKids() {
      console.log('filtering!')
    },
    setListView() {
      console.log('list-view activated...');

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
  border-radius: 1em;
  margin-bottom: 1em;

  .filter-cmp {
    width: 100%;
  }

  &>* {
    margin: 0 1em;
  }
}

.control-panel::after {}

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
    0.3s;

    @media screen and (max-width: 500px) {
      font: {
        size: 1.6em;
      }
    }
  }

  & .fa:hover {
    cursor: pointer;
    color: #ADD8E6;
    transition: all, 0.3s;
  }
}

@media screen and (max-width: $sm) {
  .controls {
    font-size: 0px;
    display: none;
    color: $color-default;
  }
}
</style>
