<template>
  <div>
    <BreadCrumb :items="breadCrumbItems"></BreadCrumb>
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

      <List :data="posts" :attrs="ListAttrs"></List>
    </el-card>
  </div>
</template>

<script>
import List from "../list";
import BreadCrumb from "../breadCrumb";

export default {
  name: "PostList",
  data: function() {
    return {
      q: '',
      breadCrumbItems: [
        { path: "/admin/overview", name: "首页" },
        { path: "", name: "用户列表" }
      ],
      posts: [
        {
          created_at: "2016-05-02",
          title: "王小虎",
          category: { name: "上海市普陀区金弄", id: 1 },
          tags: "1,2,3"
        },
        {
          created_at: "2016-05-04",
          title: "王小虎",
          category: { name: "上海市普陀区金弄", id: 1 }
        }
      ],
      ListAttrs: [
        { attr: "title", label: "标题" },
        { attr: "created_at", label: "创建时间" },
        { attr: "category.name", label: "分类" },
        { attr: "tags", label: "标签" },
        { attr: "is_top", label: "是否置顶", type: "bool" },
        { attr: "", label: "操作", type: "operations" }
      ]
    };
  },
  components: {
    List,
    BreadCrumb
  }
};
</script>

<style lang="less" scoped>
</style>