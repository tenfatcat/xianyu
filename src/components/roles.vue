<template>
  <div>
    <breadnav first="权限管理" second="角色列表"></breadnav>
    <el-button>添加角色</el-button>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="expand">
        <template slot-scope="scope">
          <span v-if="scope.row.children.length == 0">没有分配权限</span>
          <!-- 一级菜单 -->
          <el-row v-for="tag in scope.row.children">
            <el-col :span="4">
              <el-tag closable @close="delTag(scope.row.id,tag.id,scope.row)">{{tag.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <!-- 二级菜单 -->
              <el-row v-for="tag2 in tag.children">
                <el-col :span="4">
                  <el-tag
                    closable
                    type="success"
                    @close="delTag(scope.row.id,tag2.id,scope.row)"
                  >{{tag2.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <!-- 三级菜单 -->
                <el-col :span="20">
                  <el-tag
                    v-for="tag3 in tag2.children"
                    closable
                    type="warning"
                    class="ssmall"
                    @close="delTag(scope.row.id,tag3.id,scope.row)"
                  >{{tag3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>

      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
      <el-table-column width="180" label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="small"
            plain
           
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="small"
            plain
          
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-check"
            size="small"
            plain
            @click="showTree(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="提示" :visible.sync="dialogVisible">
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="[5]"
        :props="defaultProps"
        ref="tree"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="getRoleRight()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { checkroles, delRight,allright,roleright,addplayer } from "../api/axios";
export default {
  data() {
    return {
      tableData: [],
      data: [],
      defaultProps: {
        children: "children",
        label: "authName"
      },
      dialogVisible:false,
      currentId:0,
    };
  },
  methods: {
    // 删除 tag 标签
    delTag(roleId, rightId, row) {
      // 调用封装好的 axios--delRight 发送删除请求
      delRight(roleId, rightId).then(qwe => {
        // window.console.log(qwe)
        if (qwe.data.meta.status == 200) {
          this.$message.success("删除成功");
          // 给row重新赋值, 因为 row 是scope.row传的参数,所以 row 的改变可以传给 scope.row
          // scope.row 改变了,所以不用刷新或者重新获取数据就可以将删除的 tag 从页面上去掉
          row.children = qwe.data.data;
        } else {
          this.$message.error(qwe.data.meta.msg);
        }
      });
    },
    // 树形图
    showTree(row){
      this.currentId = row.id
      this.dialogVisible =true
      let list = [];


      // for 循环遍历所有子元素,获取最里面的子元素的id,手动循环

      // for(let u = 0;u<row.children.length;u++){
      //   // list.push(row.children[u].id)
      //   let level2 = row.children[u].children
      //   for(let i =0;i<level2.length;i++){
      //     // list.push(level2[i].id)
      //     let level3 = level2[i].children
      //     for(let o = 0 ; o < level3.length; o++){
      //       list.push(level3[o].id)
      //     }
      //   }
      // }


      // 递归函数,不断调用自己找到最底层的子元素,自动循环
      function getChildrenId (item){
        // 如果item 还有子元素就继续调用自己
          if(item.children){
            for(let i =0;i<item.children.length;i++){
              getChildrenId(item.children[i])
            }
          }else{
            // 如果没有子元素了就传入 id
            // 这里的 item 等于 上面的传入的 item.children[i],所以直接传入 item.id 就可以了
            list.push(item.id)
          }
      }
      getChildrenId(row)
      // 下一次 dom 更新时调用
      this.$nextTick(()=>{
        // 调用组件自带的 setCheckedKeys 方法以 list 的数据为准设置勾选
        this.$refs.tree.setCheckedKeys(list)
      })
     
    },
    getRight(){
      checkroles().then(qwe => {
      // window.console.log(qwe);
      this.tableData = qwe.data.data;
    });
    },
    getRoleRight(){
     
      // 使用 tree 组件的默认事件 getCheckedKeys 获取被选中的id
      let keys = this.$refs.tree.getCheckedKeys();
      // 使用 tree 组件的默认事件 getHalfCheckedKeys 获取半选中的id
      let keys2 = this.$refs.tree.getHalfCheckedKeys();
      // 使用数组解构方法将两个数组合并
      let arr = [...keys,...keys2];
      // rids 参数需要的是字符串,使用 toString() 或者 join() 将数组转化成字符串
      let rids = arr.toString()
        // window.console.log(rids)
        roleright({roleId:this.currentId,rids}).then(qwe=>{
          // window.console.log(qwe)
          if(qwe.data.meta.status == 200){
            this.$message.success(qwe.data.meta.msg);
              this.dialogVisible =false;
              this.getRight();
          }
        })
    }
  },
  created() {
    
     this.getRight();
     allright('tree').then(qwe=>{
        window.console.log(qwe)
        this.data= qwe.data.data
      })
  }
};
</script>

<style lang="less" scoped>
.ssmall {
  margin-bottom: 5px;
  margin-right: 10px;
}
</style>