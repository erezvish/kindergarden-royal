<template>
  <el-row>
    <el-col :xs="24" :sm="24" :md="20">
      <section class="kid-edit">
        <!--<div class=-->
        <h2> Kid properties </h2>
        <div class="editor-header">
          <el-col  :lg="14" class="info-form">
            <el-form >
              <el-form-item label="First name">
                <el-input v-mode="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="Last name">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="Gender">
                <el-select placeholder="Gender">
                  <el-option label="Male" value="Male"></el-option>
                  <el-option label="Female" value="Female"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Birthdate:" required>
                <el-col :span="11">
                  <el-form-item prop="date1">
                    <el-date-picker type="date" placeholder="Pick a date"></el-date-picker>
                  </el-form-item>
                </el-col>
  
              </el-form-item>

              <h4>Parents details</h4>
              <el-form-item label="Parent name">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="Parent name">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="Note" prop="note">
                <el-input type="textarea"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">Update</el-button>
                <el-button>Reset</el-button>
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
  data() {
    return {
      name: 'eitan',
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        delivery: false,
        type: [],
        note: ''
      },
      rules: {
        name: [
          { required: true, message: 'Please input first name', trigger: 'blur' },
          { min: 2, max: 15, message: 'Length should be 2 to 15', trigger: 'blur' }
        ],
        region: [
          { required: true, message: 'Please select Activity zone', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: 'Please pick a date', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: 'Please select at least one activity type', trigger: 'change' }
        ],
        desc: [
          { required: true, message: 'Please input activity form', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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