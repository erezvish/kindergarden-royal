<template>
    <el-col class="el-col-sidebar" :md="7" :class="{ 'hidden': !bellProp }">
        <section class="sidebar">

            <div>
                <notes-panel @toggle-sidebar="toggleSidebar"></notes-panel>
            </div>
        </section>
    
    </el-col>
</template>

<script>
import NotesPanel from './NotesPanel'
export default {
    name: 'side-bar',
    props: ['bellProp'],
    data() {
        return {
        }
    },
    computed: {
    },
    components: {
        NotesPanel
    },
    methods: {
        toggleSidebar() {
            this.$emit('toggle-sidebar');
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../sass/main.scss";

.sidebar {
    position: relative;
    z-index: 1;
    height: 100%;
    align-content: space-between;
    justify-content: flex-start;
    display: flex;
    flex-direction: column;
    padding: 0;
    margin-bottom: 0em;
    background: white;
    background: linear-gradient(to top, #95C1D2 1%, white 25%);
    box-shadow: 0 0 11px rgba(0, 0, 0, 0.2);
    border-radius: 1em;
    min-height: 100vh;
    .fa {
        font-size: 2em;
        margin: 0 0.5em;
    }
    .top {
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: #95C1D2;
        background: linear-gradient(rgb(55, 98, 131) 80%, white);
        border-top-left-radius: 1em;
        border-top-right-radius: 1em;
        height: 3em;
    }
}

.hr-bottom {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 0.5em;
}

.close-btn {
    align-self: flex-end;
}

.notes-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    & .title {
        display: flex;
    }
    & ul {
        display: flex;
        align-items: center;
        list-style-type: none;
        padding: 0;
        & .fa {
            font-size: 2.4em;
        }
    }
}

@media screen and (max-width: $md) {
    .el-col-sidebar {
        position: absolute;
        left: 0;
        height: 100%;
    }
    .sidebar {
        border-radius: 0em;
    }
    .sidebar-header {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        background: rgba(149, 193, 210, 0.2);
        color: rgba(55, 98, 131, 0.5);
        box-shadow: $box-shadow-default;
    }
}

// * {
//     outline: 1px solid #333;
// }
</style>