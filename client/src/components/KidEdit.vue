<template>
  <el-row>
    <el-col :xs="24" :sm="24" :md="20">
      <section class="kid-edit">
        <h1> Kid edit </h1>
        <div class="editor-header">
          editor header
          <div class="kid-img">
            img
          </div>
        </div>
        
        <el-col :span="17" class="info-form">
        <h2>Kid details</h2>
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
          <el-form-item label="Birthdate:">
            <el-col :span="11">
              <el-form-item prop="birthdate">
                <el-date-picker type="date" placeholder="Pick a date" v-model="editedKid.birthdate"></el-date-picker>
              </el-form-item>
            </el-col>
  
          </el-form-item>
          <!--<el-form-item label="membership" prop="isMember">
            <el-switch on-text="Yes" off-text="No"></el-switch>
          </el-form-item>-->
          <el-form-item label="Note" prop="note">
            <el-input type="textarea" v-model="editedKid.note"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('edit-kid')">Update</el-button>
            <el-button @click="resetForm('edit-kid')">Reset</el-button>
            <el-button @click="cancel">Cancel</el-button>
          </el-form-item>
        </el-form>
        </el-col>
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
    // display: none;
    width: 100%;
  }
}

.info-form {
  align-self: center;
  
}
.kid-edit {
  width: 100%;
  display: flex;
  align-self: center;
  background: white;
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 11px rgba(0, 0, 0, 0.2);
  border-radius: 1em;
  margin-bottom: 1em;
}

.editor-header {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 16.6em;
  border-bottom: 5px solid rgba(0,0,0,0.051);
  padding: 0 2em;
  & .kid-img {
    background: #f4f4f4;
    background-image: url('../assets/img-kid/img.png');
    background-size: cover; // position: relative;
    // top: 2.3em;
    width: 11.6em;
    height: 11.6em;
    border: 1px solid rgba(0, 0, 0, 0.2); // box-shadow: 0 0 11px rgba(0, 0, 0, 0.2);
  }
}

.editor-nav {
  background: #376283;
  color: white; // border-bottom: 5px solid rgba(255,255,255,0.5);
  box-shadow: 0 0 11px rgba(0, 0, 0, 0.2);
}
</style>