<template>
  <div>
    <breadnav first="权限管理" second="权限列表"></breadnav>
    <el-table :data="tableData" border style="width: 100%">
       <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="250"></el-table-column>
      <el-table-column prop="path" label="路径" width="250"></el-table-column>
      <el-table-column prop="level" label="层级" width="250"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { allright } from '../api/axios'
export default {
    data() {
      return {
        tableData: [],
      }
    },
    methods:{
      // 获取所有
      getRight(list){
        allright(list).then(qwe=>{
          // 获取的数据中 level 的数据需要进行转换
          let data = qwe.data.data;
          for(let i = 0; i < data.length; i ++){
            switch (data[i].level) {
              // switch 的判断是全等的,字符串就要等于字符串
              case '0':
                data[i].level = '一级'
                break;
              case '1':
                data[i].level = '二级'
                break;
              case '2':
                data[i].level = '三级'
                break;
            
              default:
                break;
            }
          }
          this.tableData = qwe.data.data;
        })
      }
    },
    created(){
      this.getRight('list')
    }
};
</script>

<style lang="less" scoped>
</style>