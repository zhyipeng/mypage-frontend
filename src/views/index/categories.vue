<template>
  <el-card class="box-card">
    <h3>分类</h3>
    <div v-for="c in categories" :key="c.id" class="cate-item" @click="jump_to_posts(c.id)">
        <i class="el-icon-arrow-right"></i>
        <span class="cate-name">{{c.name}}</span>
        <span class="post-count">({{c.post_count}})</span>
    </div>
      <pagination
        class="pagination"
        :total="total"
        :pageSizes="[20,50,100]"
        @size_change="handleSizeChange"
        @page_change="handleCurrentPageChange"
      ></pagination>
  </el-card>
</template>

<script>
import Pagination from "../../components/common/pagination";
import { api } from "../../core/api.js";

export default {
  name: "Categories",
  data: function() {
    return {
      categories: [],
      currentPage: 1,
      size: 20,
      total: 0
    };
  },
  methods: {
    async getCategories() {
      let ret = await api.get("/v1/post/categories", {
        params: { page: this.currentPage, size: this.size }
      });
      this.categories = ret.data;
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
    jump_to_posts(id){
        this.$router.push({path: '/', query: {'category_id': id}})
    }
  },
  created(){
      this.getCategories()
  },
  components: {
      Pagination
  }
};
</script>

<style lang="less" scoped>
.box-card {
    padding: 50px;
}
.cate-item {
    margin-top: 30px;
    cursor: pointer;
    :hover {
        color: #aaa;
        text-decoration: underline
    }
}
.cate-name {
    margin-left: 5px;
    margin-right: 10px;
}
.pagination {
  text-align: center;
  margin-top: 50px;
}
</style>