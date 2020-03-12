<template>
  <div>
    <BreadCrumb :items="breadCrumbItems"></BreadCrumb>
    <el-card class="box-card">
      <div class="btn">
        <el-button plain @click="createTag">创建标签</el-button>
      </div>
      <List :data="tags" :attrs="ListAttrs"></List>
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
import { MessageBox } from "element-ui";

export default {
  name: "TagList",
  data: function() {
    return {
      breadCrumbItems: [
        { path: "/admin/overview", name: "首页" },
        { path: "", name: "标签管理" }
      ],
      tags: [],
      ListAttrs: [
        { attr: "name", label: "标签名" },
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
  methods: {
    async getTags() {
      let ret = await api.get("/v1/post/tags", {
        params: { page: this.currentPage, size: this.size }
      });
      this.tags = ret.data;
      this.total = ret.page_info.total;
    },
    handleSizeChange(size) {
      this.size = size;
      this.getTags();
    },
    handleCurrentPageChange(page) {
      this.currentPage = page;
      this.getTags();
    },
    createTag() {
      MessageBox.prompt("请输入标签名", "添加标签", {
        confirmButtonText: "添加",
        cancelButtonText: "取消"
      })
        .then(async ({ value }) => {
          let ret = await api.post("/v1/post/tags", { name: value});
          if (!ret) {
            return;
          }
          this.$message({
            type: "success",
            message: '"' + value + '"添加成功'
          });
          this.getTags()
        })
        .catch(() => {});
    },
  },
  created() {
    this.getTags();
  }
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
}
.btn {
  display: flex;
  justify-content: flex-end;
}
</style>