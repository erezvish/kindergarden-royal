<template>
    <section class="notes-panel">
        <div class="title">
            <H1>
                Notes panel
            </H1>
            <i class="fa fa-plus-square-o" aria-hidden="true" @click="plusClicked"></i>
        </div>
        <NoteCmp v-for="note in notes" @delete-note="deleteNote(this)"></NoteCmp>
    </section>
</template>


<script>
import NoteCmp from './NoteCmp'
export default {
    name: 'notes-panel',
    data() {
        return {
            notes: ['lorede sdsdf', 'sdf a ds dd','dewr asda vvdsd', 'edasdas']
        }
    },
    methods: {
        plusClicked: () => {
            console.log('plusClicked');
            
        },
        deleteNote: function(e) {
            console.log('deleting note: ',);
        }
    },
    components: {
        NoteCmp
    }
}
</script>


<style lang="scss" scoped>
// * {
//     outline: 1px solid #333;
// }
.notes-panel {
    // display rules
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 1em; //design rules
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
</style>