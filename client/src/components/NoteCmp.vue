<template>
    <section class="note">
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
</template>

<script>
export default {
    name: 'note-cmp'
}
</script>


<style lang="scss" scoped>
@import "../sass/vars.scss";

.note {
    background: blue;
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

</style>