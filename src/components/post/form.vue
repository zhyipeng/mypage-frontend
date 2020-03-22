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
        <el-form-item label="标签">
          <el-checkbox-group v-model="choiced_tags_id">
            <el-checkbox
              v-for="t in tags"
              :label="t.id"
              :key="t.id"
              :checked="checkTag(t.id)"
            >{{t.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="是否置顶" prop="is_top">
          <el-switch v-model="createForm.is_top"></el-switch>
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
        body: "",
        is_top: false
      },
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        category_id: [
          { required: true, message: "请选择分类", trigger: "blur" }
        ],
        body: [{ required: true, message: "请输入正文", trigger: "blur" }]
      },
      tags: [],
      choiced_tags_id: []
    };
  },
  components: {
    BreadCrumb,
    MarkdownPro
  },
  methods: {
    submit() {
      this.createForm.tags_id = this.choiced_tags_id;
      if (this.id) {
        if (this.updatePost()) {
          this.$message.success("保存成功");
          setTimeout(_ => {
            this.$router.push("/admin/posts");
          }, 1000);
        }
      } else {
        if (this.createPost()) {
          this.$message.success("保存成功");
          setTimeout(_ => {
            this.$router.push("/admin/posts");
          }, 1000);
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
      this.tags = ret;
      if (this.id) {
        this.getPost();
      }
    },
    async getPost() {
      let ret = await api.get("/v1/post/" + this.id);
      this.createForm.category_id = ret.category.id;
      this.createForm.title = ret.title;
      this.createForm.summary = ret.summary;
      this.createForm.body = ret.body;
      this.is_top = ret.is_top
      for (let index = 0; index < ret.tags.length; index++) {
        this.choiced_tags_id.push(ret.tags[index].id);
      }
    },
    async updatePost() {
      let ret = await api.put("/v1/post/" + this.id, this.createForm);
      return ret;
    },
    async createPost() {
      let ret = await api.post("/v1/post", this.createForm);
      return ret;
    },
    checkTag(tag_id) {
      for (let index = 0; index < this.choiced_tags_id.length; index++) {
        if (this.choiced_tags_id[index] == tag_id) {
          return true;
        }
      }
      return false;
    }
  },
  created() {
    this.getCategories();
    this.getTags();
  }
};
</script>

<style lang="less" scoped>
.btn {
  display: flex;
  justify-content: flex-end;
}
</style>