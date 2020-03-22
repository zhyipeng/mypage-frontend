<template>
  <el-card>
    <p class="overview">很好，已经完成了 {{total}} 篇文章，继续加油！</p>
    <el-divider></el-divider>
    <el-timeline :reverse="reverse" v-infinite-scroll="load">
      <el-timeline-item v-for="post in posts" :key="post.id" :timestamp="post.created_at">
        <a class="post-title-link" @click="jumpToDetail(post.id)">{{post.title}}</a>
      </el-timeline-item>
    </el-timeline>
  </el-card>
</template>

<script>
import { api } from "../../core/api.js";
import { timestampToTime } from "../../core/utils.js";

export default {
  name: "Archieve",
  data() {
    return {
      reverse: false,
      posts: [],
      currentPage: 1,
      size: 20,
      total: 0,
      end: false
    };
  },
  methods: {
    async getPosts() {
      console.log(this.posts);
      let ret = await api.get("/v1/post", {
        params: { page: this.currentPage, size: this.size }
      });
      let data = ret.data;
      for (let i = 0; i < data.length; i++) {
        data[i].created_at = timestampToTime(data[i].created_at);
        this.posts.push(data[i]);
      }
      this.total = ret.page_info.total;
      if (this.currentPage >= ret.page_info.last_page) {
        this.end = true;
      }
    },
    load() {
      if (this.end) {
        return;
      }
      this.currentPage += 1;
      this.getPosts();
    },
    jumpToDetail(id){
      this.$router.push('/' + id)
    }
  },
  created() {
    this.getPosts();
  }
};
</script>

<style lang="less" scoped>
a {
  text-decoration: none;
  border-bottom: none;
  margin: 0 auto;
}
.el-timeline-item {
  font-size: 18px;
  padding-bottom: 40px;
  color: #555;
}
.post-title-link {
  position: relative;
  text-decoration: none;
  color: #555;
  cursor: pointer;
}
.post-title-link:before {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -2px;
  width: 0;
  height: 2px;
  background: #555;
  transition: all 0.2s;
}
.post-title-link:hover:before {
  width: 100%;
  left: 0;
  right: 0;
}
.overview {
    margin-top: 40px;
    padding-left: 20px;
    color: #555;
}
</style>