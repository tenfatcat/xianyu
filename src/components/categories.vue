<template>
  <div>
    <breadnav first="商品管理" second="商品分类"></breadnav>
    <el-button type="success" plain>添加商品</el-button>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="cat_id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="cat_name" label="分类名称"></el-table-column>
      <el-table-column prop="cat_level" label="级别">
        <template slot-scope="scope">
          {{ scope.row.cat_level | formatLevel }}
        </template>
      </el-table-column>
      <el-table-column prop="cat_deleted" label="是否有效">
        <template slot-scope="scope">
          {{ scope.row.cat_deleted ? '无效' : '有效' }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="small" plain></el-button>
          <el-button type="danger" icon="el-icon-delete" size="small" plain></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getCategories } from "../api/axios.js";
export default {
  data() {
    return {
      tableData: [],
      data:[],
      // 页容量
      pagesize:10,
      // 页码
      pageindex:1,
    };
  },
  methods: {},
  filters:{
    formatLevel(val){
      switch(val){
        case 0:
          return "一级";
        case 1:
          return "二级";
        case 2:
          return "三级";
      }
    }
  },
  created() {
    getCategories(3).then(qwe => {
      window.console.log(qwe);
      this.data = qwe.data.data;
      let start = (this.pageindex - 1) * this.pagesize;
      let end = start + this.pagesize;
      this.tableData = this.data.slice(0,end)
    });
  }
};
</script>

<style>
</style>