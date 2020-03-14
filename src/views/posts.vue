<template>
  <div>
    <PostItem v-for="post in posts" :key="post.id" :post="post"></PostItem>
  </div>
</template>

<script>
import PostItem from "../components/post/postItem";
import { api } from "../core/api.js";
import {timestampToTime} from '../core/utils.js'

export default {
  name: "Posts",
  data: function(){
      return {
          posts: []
      }
  },
  components: {
    PostItem
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
    }
  },
  created() {
    this.getPosts();
  }
};
</script>