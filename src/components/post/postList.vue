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
          <el-button plain @click="writePost">写文章</el-button>
        </el-col>
      </el-row>

      <List
        :data="posts"
        :attrs="ListAttrs"
        @edit_item="editPost"
        @delete_item="deletePost"
        @view_item="viewPost"
        @switch_change="switchIsTop"
      ></List>
      <pagination
        class="pagination"
        :total="total"
        :pageSizes="[10,50,100]"
        @size_change="handleSizeChange"
        @page_change="handleCurrentPageChange"
      ></pagination>
    </el-card>
  </div>
</template>

<script>
import List from "../common/list";
import BreadCrumb from "../common/breadCrumb";
import Pagination from "../common/pagination";
import { api } from "../../core/api.js";
import { timestampToTime } from "../../core/utils.js";

export default {
  name: "PostList",
  data: function() {
    return {
      q: "",
      breadCrumbItems: [
        { path: "/admin/overview", name: "首页" },
        { path: "", name: "文章管理" }
      ],
      posts: [],
      ListAttrs: [
        { attr: "title", label: "标题" },
        { attr: "created_at", label: "创建时间" },
        { attr: "category.name", label: "分类" },
        { attr: "is_top", label: "是否置顶", type: "bool" },
        { attr: "", label: "操作", type: "operations" }
      ],
      currentPage: 1,
      size: 10,
      total: 0
    };
  },
  components: {
    List,
    BreadCrumb,
    Pagination
  },
  created() {
    this.getPosts();
  },
  methods: {
    async getPosts() {
      let ret = await api.get("/v1/post", {
        params: { page: this.currentPage, size: this.size }
      });
      let data = ret.data;
      for (let i = 0; i < data.length; i++) {
        data[i].created_at = timestampToTime(data[i].created_at);
      }
      this.posts = data;
      this.total = ret.page_info.total;
    },
    handleSizeChange(size) {
      this.size = size;
      this.getPosts();
    },
    handleCurrentPageChange(page) {
      this.currentPage = page;
      this.getPosts();
    },
    writePost() {
      this.$router.push("/admin/posts/create");
    },
    viewPost(id) {
      this.$router.push("/")
    },
    deletePost(id) {
      console.log(id)
    },
    editPost(id) {
      this.$router.push({path: `/admin/posts/update/${id}`});
    },
    async switchIsTop(id, isTop) {
      let ret = await api.put('/v1/post/' + id + '/is_top', {'is_top': isTop})
      if (ret) {
        this.$message.success("设置成功")
      }
    },
  }
};
</script>

<style lang="less" scoped>
.search-row {
  justify-content: space-between;
  margin-bottom: 20px;
}
.pagination {
  text-align: center;
}
</style>