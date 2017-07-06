<template>
    <section class="test">
        <h1> for test purposes only! </h1>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="username">
                <el-select v-model="formInline.username" placeholder="Enter username">
                <el-option label="Puki" value="Puki"></el-option>
                <el-option label="Popo" value="Popo"></el-option>
                </el-select>
            </el-form-item><el-form-item>
            <el-form-item label="password">
                <el-input v-model="formInline.pass" placeholder="Enter password"></el-input>
            </el-form-item>
                <el-button type="primary" @click="onSubmit">Query</el-button>
        <el-button type="success" @click="create">create kid</el-button>
            </el-form-item>
        </el-form>
            <!--<ul>
                <li v-for="kid in kids" :key="kid._id">{{kid}}
        <el-button @click="update(kid)">update kid</el-button>
        <el-button @click="deleteKid(kid)">delete kid</el-button>
        </li>
            </ul>-->
            <el-table
      :data="kids"
      style="width: 100%">
      <el-table-column
        prop="firstName"
        label="first name"
        width="180">
      </el-table-column>
      <el-table-column
        prop="lastName"
        label="last name"
        width="180">
      </el-table-column>
      <el-table-column
        prop="_id"
        label="id">
      </el-table-column>
    </el-table>
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
            formInline: {
            username: '',
            pass: ''
            }
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
        },
        onSubmit() {
            console.log('submit!');
            this.$store.dispatch({
                type: 'login',
                user: this.formInline
            })
        }
    }
};
    </script>
