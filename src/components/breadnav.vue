<template>
  <div>
     <el-breadcrumb separator-class="el-icon-arrow-right" class="breadnav">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{first}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{second}}</el-breadcrumb-item>
    </el-breadcrumb>

  </div>
</template>

<script>
export default {
   props:['first','second']
}
</script>

<style lang="less" scoped>
.breadnav {
  font-size: 16px;
  line-height: 45px;
  padding-left: 15px;
  margin-top: -20px;
  background-color: #d2dbe5;
}

</style>