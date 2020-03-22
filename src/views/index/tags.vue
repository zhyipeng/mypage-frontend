<template>
  <el-card>
    <wordcloud
      :data="tags"
      nameKey="name"
      valueKey="post_count"
      :showTooltip="false"
      :wordPadding="7"
      :wordClick="jump_to_list"
    ></wordcloud>
  </el-card>
</template>

<script>
import wordcloud from "vue-wordcloud";
import { api } from "../../core/api.js";

export default {
  name: "Tags",
  data: function() {
    return {
      tags: []
    };
  },
  methods: {
    async get_tags() {
      let ret = await api.get("/v1/post/tags");
      this.tags = ret;
    },
    jump_to_list(name, value, item) {
      let id = null;
      for (let i = 0; i < this.tags.length; i++) {
        if (this.tags[i].name == name) {
          id = this.tags[i].id;
          break;
        }
      }
      this.$router.push({ path: "/", query: { tag_id: id } });
    }
  },
  created() {
    this.get_tags();
  },
  components: {
    wordcloud
  }
};
</script>

<style lang="less" scoped>
</style>