<template>
    <section class="notes-panel">
        <div class="title">
            <div class="sidebar-header">
                <i class="fa fa-times" aria-hidden="true"></i>
            </div>
            <H1>
                Notes panel
            </H1>
            <!--<i class="fa fa-times" aria-hidden="true"></i>-->
            <div>
                <i class="fa fa-plus-square-o" aria-hidden="true" @click="plusClicked"></i>
            </div>
        </div>
        <NoteCmp v-for="note in notes" :note="note" :key="note._id" @delete-note="deleteNote(note)"></NoteCmp>
    </section>
</template>


<script>
import NoteCmp from './NoteCmp'
export default {
    name: 'notes-panel',
    data() {
        return {
        }
    },
    computed: {
        notes() {
            return this.$store.state.messages
        }
    },
    created() {
    },
    methods: {
        plusClicked: () => {
            console.log('plusClicked');

        },
        deleteNote: function (e) {
            console.log('deleting note: ', );
        }
    },
    components: {
        NoteCmp
    }
}
</script>


<style lang="scss" scoped>
@import "../sass/main.scss";
// * {
//     outline: 1px solid #333;
// }
.notes-panel {
    // display rules
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 1em;
    & .title {
        display: flex;
        justify-content: space-between;
        align-items: center;

        font-size: 1.3em; // + button icon
        border-bottom: 1px solid rgba(53, 53, 53, 0.2);
        margin-bottom: 0.5em;
        & .fa {
            font-size: 2em;
            padding: 0.3em 0 0.3em 0.3em;
            cursor: pointer;
        }
    }
}

// ------------------------- MEDIA QUERIES ------------------------- //
//
@media screen and (max-width: $sm) {
    .notes-panel {
        padding-top: 0;
    }
}
</style>