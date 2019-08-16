<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadnav">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-input placeholder="请输入内容" v-model="input3" class="input-with-select inputSearch">
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <el-button type="success" plain>添加用户</el-button>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" width="30"></el-table-column>
      <el-table-column prop="username" label="姓名" width="250"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="300"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="300"></el-table-column>
      <el-table-column width="100" label="用户状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column width="180" label="操作">
        <template slot-scope="scope">
           <el-button type="primary" icon="el-icon-edit" size="small" plain></el-button>
           <el-button type="danger" icon="el-icon-delete" size="small" plain></el-button>
            <el-button type="success" icon="el-icon-check" size="small" plain></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="searchpeople.pagenum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="searchpeople.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import { users } from '../api/axios'
export default {
  name:'users',
  data() {
    return {
      input3: "",
      value: false,
      searchpeople:{
        query:'',
        pagenum:1,
        pagesize:5,
      },
      total:0,
      tableData: [],
    };
  },
  methods: {
    handleSizeChange(pagesize) {
      this.searchpeople.pagesize = pagesize
      this.getUsers()
    },
    handleCurrentChange(page) {
      this.searchpeople.pagenum = page
      this.getUsers()
    },
    getUsers(){
      users(this.searchpeople).then(qwe=>{
        window.console.log(qwe)
        this.tableData = qwe.data.data.users
        this.total = qwe.data.data.total
      })
    }

  },
 created() {
    // 发请求获取用户列表
    this.getUsers()

  }
};
</script>

<style lang="less" scoped>
.breadnav {
  font-size: 16px;
  line-height: 45px;
  padding-left: 15px;
  margin-top: -20px;
  background-color: #d2dbe5;
}
.inputSearch {
  width: 300px;
}
</style>