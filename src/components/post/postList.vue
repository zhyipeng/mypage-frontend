<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin/overview' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <List :posts="posts"></List>

  </div>
</template>

<script>
import List from './list'

export default {
  name: "PostList",
  data: function() {
    return {
      posts: [
        {
          created_at: "2016-05-02",
          title: "王小虎",
          category: {name: "上海市普陀区金弄", id: 1},
          tags: '1,2,3'
        },
        {
          created_at: "2016-05-04",
          title: "王小虎",
          category: {name: "上海市普陀区金弄", id: 1},
        },
      ]
    };
  },
  components: {
      List
  }
};
</script>

<style lang="less" scoped>
</style>