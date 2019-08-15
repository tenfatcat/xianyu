<template>
  <el-container class="my-cont">
    <el-header class="my-header">
      <img src="../assets/img/logo.png" alt />
      <h2>三玖天下第一</h2>
      <a href="#" @click.prevent="logout">退出</a>
    </el-header>
    <el-container>
      <el-aside width="200px" class="my-aside">
        <el-menu class="el-menu-vertical-demo" :unique-opened="true" router>
          <el-submenu v-for="(item,index) in menulist" :index=" ''+index" >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>

            <el-menu-item v-for="subitem in item.children" :index="'index/' + subitem.path" >
              <i class="el-icon-menu"></i>
              {{ subitem.authName }}
            </el-menu-item>
            
            
          </el-submenu>

        </el-menu>
      </el-aside>

      <el-main class="my-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { menus } from '../api/axios'
export default {
  name:'index',
  data() {
    return {
      menulist:[],
    }
  },
  methods: {
    logout() {
      this.$confirm("请问是否要退出", "退出", {
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出成功!",
            duration: 1500
          });
          window.localStorage.removeItem("token");
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
            duration: 1500
          });
        });
    }
  },
  created(){
    menus().then(qwe=>{
      window.console.log(qwe)
      this.menulist = qwe.data.data
    })
  }
};
</script>

<style lang="less" scoped>
.my-cont {
  height: 100%;
  .my-header {
    background-color: #b2bfd0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    a {
      color: orangered;
      font-size: 20px;
    }
    h2 {
      color: white;
    }
  }
  .my-aside {
    background-color: #fff;
  }
  .my-main {
    background-color: #e8edf2;
  }
}
</style>