<template>
  <div>
    <BreadCrumb :items="breadCrumbItems"></BreadCrumb>
    <el-card class="box-card">
      <div class="btn">
        <el-button plain @click="createCate">创建分类</el-button>
      </div>
      <List
        :data="cates"
        :attrs="ListAttrs"
        @edit_item="editCate"
        @delete_item="deleteCate"
        @view_item="viewCate"
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
import { MessageBox } from "element-ui";

export default {
  name: "CategoryList",
  data: function() {
    return {
      breadCrumbItems: [
        { path: "/admin/overview", name: "首页" },
        { path: "", name: "分类管理" }
      ],
      cates: [],
      ListAttrs: [
        { attr: "name", label: "分类名" },
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
    async getCates() {
      let ret = await api.get("/v1/post/categories", {
        params: { page: this.currentPage, size: this.size }
      });
      this.cates = ret.data;
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
    createCate() {
      MessageBox.prompt("请输入分类名", "添加分类", {
        confirmButtonText: "添加",
        cancelButtonText: "取消"
      })
        .then(async ({ value }) => {
          let ret = await api.post("/v1/post/categories", { name: value });
          if (!ret) {
            return;
          }
          this.$message({
            type: "success",
            message: '"' + value + '"添加成功'
          });
          this.getCates();
        })
        .catch(() => {});
    },
    viewCate(id){
    },
    editCate(id) {
    },
    deleteCate(id) {
    },
  },
  created() {
    this.getCates();
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