<template>
<el-col  :md="7">
    <section class="sidebar-container">
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
    components: {
        NotesPanel
    }
}
</script>

<style lang="scss" scoped>
@import "../sass/vars.scss";
// * {
//     outline: 1px solid #333;
// }
.sidebar-container {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin-bottom: 0em;
    background: white;
    background: linear-gradient(to top, #95C1D2 1%, white 25%);
    box-shadow: 0 0 11px rgba(0, 0, 0, 0.2);
    border-radius: 1em;
    min-height: 100%;
    & .fa {
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

@media screen and (max-width: $lg) {
    .el-col {
        display: none;
    }
}
</style>