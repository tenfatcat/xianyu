<template>
  <div class="basebox">
    <div class="login">
      <h2>用户登录</h2>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        label-position="top"
      >
        <el-form-item label="账号" prop="username">
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" >
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" style="width:100%;margin-top:20px">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    data() {

      return {
        ruleForm:{
          username:'',
          password:'',
        },
         rules: {
          username: [
            { required: true, message: '请输入账号名', trigger: 'blur' },
            { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 13, message: '长度在 6 到 13 个字符', trigger: 'blur' }
          ],
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
    },
  }
</script>
  

<style lang="less" scoped>
.basebox {
  height: 100%;
  background-color: #324152;
  display: flex;
  justify-content: center;
  align-items: center;
  .login {
    width: 500px;
    height: 356px;
    background-color: #fff;
    border-radius: 5px;
    padding: 40px;
    h2 {
      margin-bottom: 20px;
    }
    
  }
}
</style>