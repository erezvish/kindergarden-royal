<template>
    <section class="notes-panel">
        <div class="title ">
            <H1>
                Notes panel
            </H1>
           
            <!--<div>
                <i class="fa fa-plus-square-o" aria-hidden="true" @click="plusClicked"></i>
            </div>-->
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
<<<<<<< HEAD
=======
            notes: ['lorede sdsdf', 'sdf a ds dd', 'dewr asda vvdsd', 'edasdas'],
            isClosed: true
>>>>>>> master
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
        deleteNote: function (note) {
            console.log('deleting note: ', );
<<<<<<< HEAD
            this.$store.dispatch({
                type: 'deleteMessage',
                _id: note._id
            })
=======
        },
        closeClicked() {
            console.log('closing notes...');

>>>>>>> master
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
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 1em;
    & .title {
        position: absolute;
        top: -1.1em;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.3em; // + button icon
    }
}
.hidden {
    display: none;
}
// ------------------------- MEDIA QUERIES ------------------------- //
//
@media screen and (max-width: $sm) {
    .notes-panel {
        padding-top: 0;
    }
}
</style>