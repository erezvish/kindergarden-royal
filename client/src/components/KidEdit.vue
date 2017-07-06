<template>
  <el-row>
    <el-col :xs="24" :sm="24" :md="20">
      <section class="kid-edit">
        <!--<div class=-->
        <h1> Kid edit </h1>
        <div class="editor-header">
          editor header
          <div class="kid-img">
            img
          </div>
        </div>
        
        <el-form  label-width="120px">
          <el-form-item label="First name">
            <el-input></el-input>
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
                <el-date-picker type="date" placeholder="Pick a date"  style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
   
          </el-form-item>
          <el-form-item label="membership" prop="isMember">
            <el-switch on-text="Yes" off-text="No" ></el-switch>
          </el-form-item>
          <el-form-item label="Notes" prop="notes">
            <el-input type="textarea" ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">Update</el-button>
            <el-button>Reset</el-button>
          </el-form-item>
        </el-form>
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
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: 'Please input Activity name', trigger: 'blur' },
          { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
        ],
        region: [
          { required: true, message: 'Please select Activity zone', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: 'Please pick a date', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: 'Please pick a time', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: 'Please select at least one activity type', trigger: 'change' }
        ],
        resource: [
          { required: true, message: 'Please select activity resource', trigger: 'change' }
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
// * {
//   outline: 1px solid #333;
// }

.el-row {
  display: flex;
  justify-content: center;
}

.el-form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  // width: 80%;
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

  padding: 0 2em;
  & .kid-img {
    background: #f4f4f4;
    background-image: url('../assets/img-kid/img.png');
    background-size: cover;
    // position: relative;
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