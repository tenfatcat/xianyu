<template>
  <div>
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">
          <el-col :span="12">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>用户管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1">
                       <i class="el-icon-menu"></i>
                        <span slot="title">用户列表</span>
                  </el-menu-item>
                </el-menu-item-group>
               
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>用户管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1">
                       <i class="el-icon-menu"></i>
                        <span slot="title">用户列表</span>
                  </el-menu-item>
                </el-menu-item-group>
               
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>用户管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1">
                       <i class="el-icon-menu"></i>
                        <span slot="title">用户列表</span>
                  </el-menu-item>
                </el-menu-item-group>
               
              </el-submenu>
              </el-submenu>
              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>用户管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1">
                       <i class="el-icon-menu"></i>
                        <span slot="title">用户列表</span>
                  </el-menu-item>
                </el-menu-item-group>
               
              </el-submenu>
              </el-submenu>
              <el-submenu index="5">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>用户管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1">
                       <i class="el-icon-menu"></i>
                        <span slot="title">用户列表</span>
                  </el-menu-item>
                </el-menu-item-group>
               
              </el-submenu>
            </el-menu>
          </el-col>
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
    methods: {
         handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
};
</script>

<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 500px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 500px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
div.el-col-12{
    width: 100%;
}
</style>