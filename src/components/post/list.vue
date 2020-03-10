<template>
    <el-card class="box-card">
      <el-row type="flex" class="search-row">
        <el-col :span="5">
          <div class="demo-input-suffix">
            <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="q"></el-input>
          </div>
        </el-col>
        <el-col :span="2">
          <el-button plain>写文章</el-button>
        </el-col>
      </el-row>

        <el-table :data="posts" style="width: 100%" stripe>
          <el-table-column prop="title" label="标题" width="180"></el-table-column>
          <el-table-column prop="created_at" label="创建时间" width="180"></el-table-column>
          <el-table-column prop="category.name" label="分类"></el-table-column>
          <el-table-column prop="tags" label="标签"></el-table-column>
          <el-table-column prop="is_top" label="是否置顶"></el-table-column>
          <el-table-column label="操作"></el-table-column>
        </el-table>
    </el-card>
</template>

<script>
export default {
  name: "List",
  props: {
      posts: Array
  },
  data: function(){
    return{
      q: ''
    }
  }
};
</script>

<style lang="less" scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}
.search-row {
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>