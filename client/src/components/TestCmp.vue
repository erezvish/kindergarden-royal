<template>
    <section class="test">
        <h1> for test purposes only! </h1>

    <!-- Form -->
        <el-button @click="create">create kid</el-button>
            <ul>
                <li v-for="kid in kids" :key="kid._id">{{kid}}
        <el-button @click="update(kid)">update kid</el-button>
        <el-button @click="deleteKid(kid)">delete kid</el-button>
        </li>
            </ul>
        </section>
</template>

<script>
export default {
    name: 'test-cmp',
    created() {
        this.$store.dispatch({
            type: 'getKids'
        })
    },
    data() {
        return {
        box1visible: false,
        box2visible: false,
        form: {
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
        },
        formLabelWidth: '120px'
        };
    },
    computed: {
        kids() {
            return this.$store.state.kids
        }
    },
    methods: {
        create(){
            this.$store.dispatch({
                type: 'createKid',
                kid: {
                    firstName: 'meir',
                    lastName: 'pechthalt'
                }
            })
        },
        update(kid){
            kid.firstName ='popo'
            kid.lastName = 'momo'
            this.$store.dispatch({
                type: 'updateKid',
                kid
            })
        },
        deleteKid(kid){
            this.$store.dispatch({
                type: 'deleteKid',
                _id: kid._id
            })
        }
    }
};
    </script>
