<template>
  <el-row>
    <el-col :xs="24" :sm="24" :md="20">
      <section class="kid-edit">
        <h2> Kid properties </h2>
        <div class="editor-header">
          <el-col  :lg="14" class="info-form">
            <el-form :model="editedKid" :rules="rules" ref="edit-kid" label-width="120px">
              <el-form-item label="First name" prop="firstName">
                <el-input v-model="editedKid.firstName"></el-input>
              </el-form-item>
              <el-form-item label="Last name" prop="lastName">
                <el-input v-model="editedKid.lastName"></el-input>
              </el-form-item>
              <el-form-item label="Gender" prop="gender">
                <el-select placeholder="Gender" v-model="editedKid.gender">
                  <el-option label="Male" value="Male"></el-option>
                  <el-option label="Female" value="Female"></el-option>
                  <el-option label="Undefined" value="Undefined"></el-option>
                </el-select>
              </el-form-item>
              <el-col :span="11">
                <el-form-item prop="birthdate">
                  <el-date-picker type="date" placeholder="Pick a date" v-model="editedKid.birthdate"></el-date-picker>
                </el-form-item>
                <el-form-item label="Note" prop="note">
                  <el-input type="textarea" v-model="editedKid.note"></el-input>
                </el-form-item>
              </el-col>

                <h4>Parents details</h4>
                <el-form-item label="Parent name">
                  <el-input></el-input>
                </el-form-item>
                <el-form-item label="Parent name">
                  <el-input></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary">Update</el-button>
                  <el-button>Reset</el-button>
                <el-button @click="cancel">Cancel</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </div>
        </div>
        <div class="editor-nav">
          <h1>nav</h1>
        </div>
      </section>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'kid-edit',
  props: {
    kid: Object
  },
  data() {
    return {
      editedKid: {
        firstName: '',
        lastName: '',
        gender: '',
        birthdate: '',
        note: '',
        _id: ''
      },
      rules: {
        firstName: [
          { required: true, message: 'Please input first name', trigger: 'submit' },
        ],
        lastName: [
          { required: true, message: 'Please input last name', trigger: 'submit' },
        ],
        birthdate: [
          { required: false }
        ],
        gender: [
          { required: true, message: 'Please select gender', trigger: 'submit' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.kid) {
            this.editedKid._id = this.kid._id
            this.$store.dispatch({
              type: 'updateKid',
              kid: this.editedKid
            })
          } else {
            this.$store.dispatch({
              type: 'createKid',
              kid: this.editedKid
            })
          }
          this.$emit('closeEdit')

        } else {
          return false;
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    cancel() {
      this.$emit('closeEdit')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../sass/main.scss";
// * {
//   outline: 1px solid #333;
// }
.el-row {
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
}

.el-form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: start;
  & .el-form-item {
    width: 100%;
  }
}

.info-form {
  align-self: center;
}

.kid-edit {
  // width: 100%;
  display: flex;
  align-self: center;
  background: $bg-default;
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  box-shadow: $box-shadow-default;
  border-radius: 1em;
  margin-bottom: 1em;
}

.editor-header {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  background: rgba(55, 98, 131, 0.06);
  min-height: 16.6em;
  padding: 2EM 2em;
  border: {
    bottom: $border-alpha-wide;
    top: $border-alpha-wide;
  }
  ;
  & .kid-img {
    background: #f4f4f4;
    background-image: url('../assets/img-kid/img.png');
    background-size: cover;
    width: 12.4em;
    height: 20em;
    border: $border-alpha-narrow;
  }
  ;

  & ul {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 0 2em;

    & .fa {
      font-size: 1em;
      margin-right: 0.6em;
      opacity: 0.7;
    }

    & li {
      margin: 1em 0;
      font-size: 1.5em;
    }
  }
}

.editor-nav {
  background: #376283;
  color: white;
  box-shadow: $box-shadow-default;
}

@media screen and (max-width: $md) {
  .editor-header {
    flex-direction: column;
    align-items: center;
    & .kid-img {
      width: 10.4em;
      height: 14em;
    }
  }
}
</style>