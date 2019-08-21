<template>
  <div>
    <breadnav first="用户管理" second="用户列表"></breadnav>

    <!-- 未优化版的 input 关键词搜索事件写法 -->
    <!-- @input 为组件自带的事件名 -->
    <!-- <el-input @input="search" placeholder="请输入内容" v-model.trim="input3" class="input-with-select inputSearch"> -->

    <!-- 优化后的方案 -->
    <el-input
      @input="getUsers"
      placeholder="请输入内容"
      v-model.trim="searchpeople.query"
      class="input-with-select inputSearch"
    >
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <el-button type="success" plain @click="dialogFormVisible=true">添加用户</el-button>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="250"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="300"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="300"></el-table-column>
      <el-table-column width="100" label="用户状态">
        <template slot-scope="scope">
          <el-switch
            @change="changeState(scope.row)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column width="180" label="操作">
        <template slot-scope="scope">
          <!-- 编辑用户信息的按钮 -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="small"
            plain
            @click="showedit(scope.row)"
          ></el-button>
          <!-- 删除用户的按钮 -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="small"
            plain
            @click="deluser(scope.row.id)"
          ></el-button>
          <!-- 改变用户角色的按钮 -->
          <el-button
            type="success"
            icon="el-icon-check"
            size="small"
            plain
            @click="showrole(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="searchpeople.pagenum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="searchpeople.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 这里是添加用户的弹窗 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="用户名" prop="username" label-width="120px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px" prop="password">
          <el-input v-model="form.password" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="120px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 这里是修改用户信息的弹窗 -->
    <el-dialog title="修改用户" :visible.sync="editdialog">
      <el-form :model="editform">
        <el-form-item label="用户名" prop="username" label-width="120px">
          <el-input v-model="editform.username" autocomplete="off" disabled></el-input>
        </el-form-item>

        <el-form-item label="邮箱" label-width="120px">
          <el-input v-model="editform.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="120px">
          <el-input v-model="editform.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editdialog = false">取 消</el-button>
        <el-button type="primary" @click="sureedit()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 这里是分配角色的弹窗 -->
    <el-dialog title="分配权限" :visible.sync="roleformVisible">
      <el-form :model="roleform">
        <el-form-item label="用户名称" label-width="220px">
          <span>{{roleform.username}}</span>
        </el-form-item>
        <el-form-item label="活动区域" label-width="220px">
          <el-select v-model="roleform.rid" placeholder="请选择权限等级">
            <el-option v-for="item in roleslist" :label="item.roleName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleformVisible = false">取 消</el-button>
        <el-button type="primary" @click="editroles()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  // 获取用户列表
  users,
  // 添加用户
  adduser,
  // 改变用户状态
  userState,
  // 编辑用户信息
  edituser,
  // 删除用户
  deleteuser,
  // 获取所有的角色等级
  checkroles,
  // 改变角色等级
  changeroles
} from "../api/axios";

export default {
  name: "users",
  data() {
    return {
      // input3: "",

      searchpeople: {
        query: "",
        pagenum: 1,
        pagesize: 5
      },
      total: 0,
      tableData: [],

      // 新增输入框
      rules: {
        // 用户名和密码的校验规则
        username: [
          { required: true, message: "请输入账号名", trigger: "blur" },
          {
            min: 3,
            max: 12,
            message: "长度在 3 到 12 个字符",
            trigger: "change"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 13,
            message: "长度在 6 到 13 个字符",
            trigger: "change"
          }
        ]
      },
      // 弹窗的关闭
      dialogTableVisible: false,
      dialogFormVisible: false,
      editdialog: false,
      roleformVisible: false,
      // 用户数据列表表单
      form: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      // 用户编辑表单
      editform: {
        username: "",
        email: "",
        mobile: ""
      },
      // 用户角色表单
      roleform: {
        rid: "",
        id: "",
        username: ""
      },
      // 存放修改后的角色数据
      roleslist: []
    };
  },
  methods: {
    // 根据输入内容搜索用户
    // search(){
    //   this.searchpeople.query = this.input3
    //   this.searchpeople.pagenum = 1
    //   this.getUsers()
    // },


    // 页容量,一页多少条信息
    handleSizeChange(pagesize) {
      this.searchpeople.pagesize = pagesize;
      this.getUsers();
    },
    // 当前页
    handleCurrentChange(page) {
      this.searchpeople.pagenum = page;
      this.getUsers();
    },
    
      // 获取用户
    getUsers() {
       //数据渲染到页面上后需要重新回到第一页 
      if (this.searchpeople.query != "") this.searchpeople.pagenum = 1;
      users(this.searchpeople).then(qwe => {
        this.tableData = qwe.data.data.users;
        this.total = qwe.data.data.total;
      });
    },
    // 添加用户以及规则验证
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          adduser(this.form).then(qwe => {
            if (qwe.data.meta.status == 201) {
              this.dialogFormVisible = false;
              this.getUsers();
            } else {
              this.$message.error(qwe.data.meta.msg);
            }
          });
        } else {
          return false;
        }
      });
    },
    // 改变用户状态,禁用还是启用
    changeState(val) {
      userState(val.id, val.mg_state).then(qwe => {
        if (qwe.data.meta.status == 200) {
          this.$message.success(qwe.data.meta.msg);
        } else {
          this.$message.error(qwe.data.meta.msg);
        }
      });
    },
  // 用户编辑,将用户信息显示编辑弹窗上
    showedit(row) {
      this.editdialog = true;
      this.editform.username = row.username;
      this.editform.email = row.email;
      this.editform.mobile = row.mobile;
      this.editform.id = row.id;
    },
// 编辑,点击确定
    sureedit() {
      edituser(this.editform).then(qwe => {
        window.console.log(qwe);
        if (qwe.data.meta.status == 200) {
          this.$message.success(qwe.data.meta.msg);
          this.editdialog = false;
          this.getUsers();
        } else {
          this.$message.error(qwe.data.meta.msg);
        }
      });
    },
// 删除用户
    deluser(id) {
      this.$confirm("确定执行删除操作?", "是否删除", {
        type: "warning"
      })
        .then(() => {
          deleteuser(id).then(qwe => {
            if (qwe.data.meta.status == 200) {
              this.$message.success(qwe.data.meta.msg);
              this.getUsers();
            } else {
              this.$message.error(qwe.data.meta.msg);
            }
          });
        })
        .catch(() => {
          this.$message("已取消删除操作");
        });
    },
// 改变角色的弹窗
    showrole(row) {
      this.roleformVisible = true;
      // 让角色表单的数据等于 scope.row的数据
      this.roleform.username = row.username;
      // 获取权限id
      let nid = 0;
      for (let i = 0; i < this.roleslist.length; i++) {
        if (this.roleslist[i].roleName == row.role_name) {
          nid = this.roleslist[i].id;
          break;
        }
      }

      this.roleform.rid = nid;
      this.roleform.id = row.id;
    },
    // 编辑用户权限
    editroles() {
      changeroles(this.roleform).then(qwe => {
        // window.console.log(qwe);
        if (qwe.data.meta.status == 200) {
          this.$message.success(qwe.data.meta.msg);
          this.roleformVisible = false;
          this.getUsers();
        } else {
          this.$message.error(qwe.data.meta.msg);
        }
      });
    }
  },
  created() {
    // 发请求获取用户列表
    this.getUsers();
    checkroles().then(qwe => {
      window.console.log(qwe);
      this.roleslist = qwe.data.data;
    });
  }
};
</script>

<style lang="less" scoped>
.inputSearch {
  width: 300px;
}
</style>