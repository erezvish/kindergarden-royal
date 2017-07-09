<template>
    <section>
        <el-input placeholder="Search" icon="search" v-model="searchInput" @input=filterKids>
        </el-input>
    </section>
</template>

<script>

export default {
    name: 'filter-cmp',
    data() {
        return {
            searchInput: '',
            voiceCommands: {
                'search *spokenFilter': this.runSpokenFilter
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
        }
    }
}
</script>


<style lang="scss" scoped>

</style>
