<template>
    <section class="note">
        <ul class="title clear-style" @click="noteClicked">
            <li>
                <i class="fa fa-sticky-note-o" aria-hidden="true"></i>
            </li>
            <li>
                <h4>{{note.title}}</h4>
                <h5>{{note.text}}</h5>
            </li>
        </ul>
        <ul class="add-note clear-style" @click="trashClicked">
            <li>
                <i class="fa fa-trash-o" aria-hidden="true"></i>
            </li>
        </ul>
    </section>
</template>

<script>
export default {
    name: 'note-cmp',
    props: ['note'],
    methods: {
        noteClicked: function () {
            console.log('note clicked!');
        },
        trashClicked: function (e) {
            console.log('Trash clicked!');
            this.$emit('delete-note');
        }
    }
}
</script>


<style lang="scss" scoped>
@import "../sass/main.scss";

// * {
//     outline: 1px solid #333;
// }
.note {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(53, 53, 53, 0.2);
    & .title {
        flex: 1;
    }
    & ul {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 0;
        padding: 1em 0;
        & li {
            margin: 0 0.5em;

            & .fa {
                font-size: 2.5em;
            }
        }
    }
    ;

    & .add-note {
        display: flex;
        align-items: center;
        cursor: pointer;
        & .fa {
            font-size: 1.7em;
        }
        &:hover {
            color: lightcoral;
            transition: all, 0.2s;
        }
    }
}
</style>