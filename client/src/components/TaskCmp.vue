<template>
    <section class="note">
        <ul class="clear-style">
            <li>
                <i class="fa fa-sticky-note-o" aria-hidden="true"></i>
            </li>
            <li>Note Title</li>
        </ul>
        <ul class="add-note">
            </li><i class="fa fa-trash-o" aria-hidden="true"></i></i></li>
        </ul>
    </section>
</template>

<script>
export default {
    name: 'note-cmp'
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
    border-bottom: 1px solid rgba(53,53,53,0.2);
    & ul {
        display: flex;
        flex-direction: row;
        align-items: center;
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

        & .fa {
            font-size: 1.7em;
        }
    }
}
</style>