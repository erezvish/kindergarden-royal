<template>
    <el-col class="el-col-sidebar" :md="7" :class="{ 'hidden': !bellProp }">
        <section class="sidebar">
            <div class="sidebar-header">
                <i class="fa fa-times" aria-hidden="true" @click="closeClicked"></i>
            </div>
            <div>
                <notes-panel></notes-panel>
                <!--<note-cmp></note-cmp>-->
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
        closeClicked() {
            console.log('closeClicked');
            this.$emit('toggle-sidebar');
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../sass/main.scss";
// * {
//     outline: 1px solid #333;
// }
.sidebar {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin-bottom: 0em;
    background: white;
    background: linear-gradient(to top, #95C1D2 1%, white 25%);
    box-shadow: 0 0 11px rgba(0, 0, 0, 0.2);
    border-radius: 1em;
    min-height: 100%;
    .fa {
        font-size: 2em;
        margin: 0 0.5em;
    }
}
.hr-bottom {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 0.5em;
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
        z-index: 1;
        height: 100vh;
        left: 0;
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
</style>