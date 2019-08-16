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
          <el-input type="password" v-model="ruleForm.password" autocomplete="off" @keyup.enter="submitForm('ruleForm')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" style="width:100%;margin-top:20px" >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { login } from '../api/axios'
  export default {
    data() {

      return {
        ruleForm:{
          username:'',
          password:'',
        },
         rules: {
          // 用户名和密码的校验规则
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
      // 登录按钮的点击事件
      submitForm(formName) {
        // 校验方法,配合 校验规则 校验用户名和密码的格式符不符合要求
        this.$refs[formName].validate((valid) => {
          // 格式符合要求后再进行登录验证
          if (valid) {
            // 发请求查看用户名和密码正确与否
           login(this.ruleForm).then(qwe=>{
             if(qwe.data.meta.status == 200){
               this.$message.success({
                 message:'登录成功',
                 duration:1500
               })
               window.localStorage.setItem('token',qwe.data.data.token)
               this.$router.push('/index')
             }else{
               this.$message.error({
                 message:qwe.data.meta.msg,
                 duration:1500
               })
             }
           })
          } else {
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