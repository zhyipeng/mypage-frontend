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
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签" prop="tags_id">
          <el-transfer
            filterable
            :filter-method="queryTags"
            filter-placeholder
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
            <el-button type="" @click="cancel">返回</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
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
        body: [{ required: true, message: "请输入正文", trigger: "blur" }],
      },
      tags: [
        { label: "python", key: 1 },
        { label: "go", key: 2 },
        { label: "php", key: 3 }
      ],
      tags_id: []
    };
  },
  components: {
    BreadCrumb,
    MarkdownPro,
  },
  methods: {
    queryTags(q = null) {
      return [
        { label: "python", key: 1 },
        { label: "go", key: 2 },
        { label: "php", key: 3 }
      ];
    },
    submit() {
      console.log(this.createForm);
    },
    cancel() {
        this.$router.push('/admin/posts')
    }
  },
};
</script>

<style lang="less" scoped>
.btn {
    display: flex;
    justify-content: flex-end;
}
</style>