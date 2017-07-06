<template>
<el-col  :md="7">
    <section class="sidebar-container">
        <div class="notes-header hr-bottom">
            <div class="title">
                <ul>
                    <li>
                        <i class="fa fa-file-text-o" aria-hidden="true"></i>
                    </li>
                    <li>Notes</li>
                </ul>
            </div>
            <i class="fa fa-plus-circle" aria-hidden="true"></i>
        </div>
    </section>

</el-col>
</template>

<script>

export default {
    name: 'side-bar',
    components: {
     
    }
}
</script>

<style lang="scss" scoped>
@import "../sass/vars.scss";
// * {
//     outline: 1px solid #333;
// }
.sidebar-container {
    padding: 1em;
    display: flex;
    flex-direction: column;
    background: white;
    box-shadow: 0 0 11px rgba(0, 0, 0, 0.2);
    border-radius: 1em;
    margin-bottom: 1em;
    min-height: 95vh;
    height: 90%;
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

@media screen and (max-width: $md) {
    .el-col {
        display: none;
    }
}
</style>