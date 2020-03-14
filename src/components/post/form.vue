<template>
  <div>
    <BreadCrumb :items="breadCrumbItems"></BreadCrumb>

    <el-card class="box-card">
      <el-form :model="createForm" :rules="rules" ref="createForm" label-width="100px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="createForm.title"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="summary">
          <el-input type="textarea" autosize placeholder="请输入内容" v-model="createForm.summary"></el-input>
        </el-form-item>
        <el-form-item label="分类" prop="category_id">
          <el-select v-model="createForm.category_id" placeholder="请选择分类">
            <el-option
              v-for="cate in categories"
              :key="cate.id"
              :label="cate.name"
              :value="cate.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签" prop="tags_id">
          <el-transfer
            :data="tags"
            v-model="createForm.tags_id"
            :titles="['未选', '已选']"
          ></el-transfer>
        </el-form-item>

        <el-form-item label="正文" prop="body">
          <MarkdownPro v-model="createForm.body"></MarkdownPro>
        </el-form-item>

        <div class="btn">
          <el-button type="primary" @click="submit">保存</el-button>
          <el-button type @click="cancel">返回</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { api } from "../../core/api.js";
import BreadCrumb from "../common/breadCrumb";
import { MarkdownPro } from "vue-meditor";

export default {
  name: "PostForm",
  props: {
    id: {
      type: Number,
      default: null
    }
  },
  data: function() {
    return {
      breadCrumbItems: [
        { path: "/admin/overview", name: "首页" },
        { path: "/admin/posts", name: "文章管理" },
        { path: "", name: "写文章" }
      ],
      categories: [],
      createForm: {
        category_id: null,
        tags_id: [],
        title: "",
        summary: "",
        body: ""
      },
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        category_id: [
          { required: true, message: "请选择分类", trigger: "blur" }
        ],
        body: [{ required: true, message: "请输入正文", trigger: "blur" }]
      },
      tags: [],
      tags_id: []
    };
  },
  components: {
    BreadCrumb,
    MarkdownPro
  },
  methods: {
    submit() {
      console.log(this.createForm);
      if (this.id) {
        if (this.updatePost()) {
          this.$message.success("保存成功")
          setTimeout(_ => {this.$router.push('/admin/posts')}, 1000)
        }
      }
      else {
        if (this.createPost()) {
          this.$message.success("保存成功")
          setTimeout(_ => {this.$router.push('/admin/posts')}, 1000)
        }
      }
    },
    cancel() {
      this.$router.push("/admin/posts");
    },
    async getCategories() {
      let ret = await api.get("/v1/post/categories");
      this.categories = ret;
    },
    async getTags() {
      let ret = await api.get("/v1/post/tags");
      for (let i=0; i < ret.length; i++) {
        ret[i].key = ret[i].id
      }
      this.tags = ret;
    },
    async getPost(){
      let ret = await api.get("/v1/post/" + this.id)
      this.createForm.category_id = ret.category.id
      this.createForm.title = ret.title
      this.createForm.summary = ret.summary
      this.createForm.body = ret.body
      for (let index = 0; index < ret.tags.length; index++) {
        this.createForm.tags_id.push(ret.tags[index].id)
      }
    },
    async updatePost(){
      let ret = await api.put("/v1/post/" + this.id, this.createForm)
      return ret
    },
    async createPost(){
      let ret = await api.post('/v1/post', this.createForm)
      return ret
    }
  },
  created() {
    this.getCategories();
    this.getTags();
    if (this.id) {
      this.getPost()
    }
  }
};
</script>

<style lang="less" scoped>
.btn {
  display: flex;
  justify-content: flex-end;
}
</style>