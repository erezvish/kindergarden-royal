<template>
    <section class="note">
        <div class="body clear-style" @click="noteClicked">
            <h4>{{note.title}}</h4>
            <p>{{note.text}}</p>
        </div>
        <div class="ctrl ctrl-icons clear-style" @click="trashClicked">
            <i class="fa fa-reply" aria-hidden="true"></i>
            <!--<i class="fa fa-eye" aria-hidden="true"></i>-->
            <i class="fa fa-eye-slash" aria-hidden="true"></i>
            <i class="fa fa-trash-o" aria-hidden="true"></i>
        </div>
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

.body {
    text-align: left;
    padding: 0 0.5em 1em 0.5em;
}

.ctrl {
    background: linear-gradient(white, rgba(53, 53, 53, 0.1), white);
    text-align: right;
}

.ctrl-icons {
    justify-content: flex-end;
    .fa {
        margin: 0.3em;
        padding: 0.2em;
        font-size: 1.3em;
        @media all and (max-width: $md) {
            padding: 0.5em;
            
        }
    }
    @media all and (max-width: $sm) {
        width: 100vw;
    }
}

// * {
//     outline: 1px solid #333;
// }
</style>