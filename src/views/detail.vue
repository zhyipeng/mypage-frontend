<template>
  <div class="post-box">
    <div class="post_title">
      <a class="post-title-link">{{post.title}}</a>
    </div>
    <div class="info">
      <i class="el-icon-edit"></i>
      <span>发表于{{post.created_at}}</span>
      <el-divider direction="vertical"></el-divider>
      <i class="el-icon-folder"></i>
      <span>
        分类于
        <el-link>{{post.category.name}}</el-link>
      </span>
    </div>

    <div class="body">
        <MarkdownPro 
        v-model="post.body" 
        :bordered="false" 
        height="100%"
        theme="gitHub" 
        isPreview></MarkdownPro>
    </div>
  </div>
</template>

<script>
import {api} from '../core/api.js'
import {formatDatetime} from '../core/utils.js'
import { MarkdownPro } from "vue-meditor";


export default {
  name: "PostDetail",
  data: function (){
      return {
          post: {
              id: null,
              title: '',
              created_at: '',
              category: {
                  id: null,
                  name: ''
              },
              tags: [],
              body: ''
          }
      }
  },
  methods: {
      async getPost(){
          let r = await api.get('/v1/post/' + this.post.id)
          r.created_at = formatDatetime(r.created_at)
          this.post = r
          console.log(this.post)
      }
  },
  created(){
      this.post.id = Number(this.$route.params.id)
      this.getPost()
  },
  components: {
      MarkdownPro
  }
};
</script>

<style lang="less" scoped>
a {
    border: none;
}
.post_title {
  font-size: 26px;
  text-align: center;
  margin-bottom: 20px;
}
.info {
  font-size: 12px;
  text-align: center;
  color: #999;
  margin-top: 3px;
  margin-bottom: 20px;
  span {
    margin-left: 5px;
  }
}
.post-box {
    padding-top: 40px;
}

</style>