<template>
    <section class="notes-panel">
        <div class="title ">
            <H1>
                Notes panel
            </H1>
            <i class="close-btn fa fa-times" aria-hidden="true" @click="closeClicked"></i>
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
            isClosed: true
        }
    },
    computed: {
        notes() {
            return this.$store.state.messages
        }
    },
    methods: {
        deleteNote: function (note) {
            console.log('deleting note: ', );
            this.$store.dispatch({
                type: 'deleteMessage',
                _id: note._id
            })


        },
        closeClicked() {
            console.log('closing notes...');
            this.$emit('toggle-sidebar');
        }
    },
    components: {
        NoteCmp
    }
}
</script>


<style lang="scss" scoped>
@import "../sass/main.scss";

h1 {
    margin: 0;
}

.notes-panel {
    display: flex;
    flex-direction: column;
    justify-content: flex-start; // padding: 0.5em 0;
    .title {
        background: #376283;
        padding: 0.5em 0.5em;
        color: #95C1D2;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.3em;
        border-top-left-radius: 0.5em;
        border-top-right-radius: 0.5em;
        box-shadow: 0 2px 4px rgba(51, 51, 51, 0.8);
        @media all and (max-width: $md) {
            border-top-left-radius: 0;
            border-top-right-radius: 0;
        }
    }
}

.hidden {
    display: none;
}

@media screen and (max-width: $sm) {
    .notes-panel {
        padding-top: 0;
    }
}

// * {
//     outline: 1px solid #333;
// }
</style>