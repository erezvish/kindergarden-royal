<template>
    <section class="filter-controls">
        <el-input class="filter-text" placeholder="Search" icon="search" v-model="searchInput" @input=filterKids>
        </el-input>
        <el-radio-group class="controls" v-model="radioSelected">
            <el-radio-button label="All"></el-radio-button>
            <el-radio-button label="Present"></el-radio-button>
            <el-radio-button label="Absent"></el-radio-button>
        </el-radio-group>
    </section>
</template>

<script>

export default {
    name: 'filter-cmp',
    data() {
        return {
            searchInput: '',
            radioSelected: 'All',
            voiceCommands: {
                'search *spokenFilter': this.runSpokenFilter,
                'find *spokenFilter': this.runSpokenFilter,
            }
        }
    },
    created() {
        annyang.addCommands(this.voiceCommands)
    },
    methods: {
        filterKids() {
            console.log('filtering!')
            this.$store.dispatch({
                type: 'filterKids',
                text: this.searchInput
            })
        },
        runSpokenFilter(spokenFilter) {
            this.searchInput = spokenFilter;
            this.filterKids()
        },
        radioClicked() {
            console.log('radio clicked!')
        }
    }
}
</script>


<style lang="scss" scoped>
* {
    // outline: 1px solid red;
}

.filter-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .controls {
        display: flex;
        padding: 2em!important;
    }
}
</style>
