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
            searchInput: ''
        }
    },
    methods: {
        filterKids() {
            console.log('filtering!')
            this.$store.dispatch({
                type: 'filterKids',
                text: this.searchInput
            })
        }
    }
}
</script>


<style lang="scss" scoped>

</style>
