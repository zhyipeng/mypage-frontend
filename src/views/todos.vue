<template>
<div>
      <BreadCrumb :items="breadCrumbItems"></BreadCrumb>
  <el-card>
    <div class="block">
      <el-timeline>
        <el-timeline-item placement="top">
          <el-card class="add-item" @click.native="addItem">+</el-card>
        </el-timeline-item>
        <el-timeline-item
          v-for="item in items"
          :key="item.id"
          :timestamp="item.created_at"
          placement="top"
          :type="item.is_finished?'success':'primary'"
        >
          <ToDoItem :task="item" @delete_item="getItems"></ToDoItem>
        </el-timeline-item>
      </el-timeline>
    </div>
  </el-card>
</div>
</template>

<script>
import ToDoItem from "../components/todoItem";
import BreadCrumb from "../components/common/breadCrumb"
import { MessageBox } from "element-ui";
import { api } from "../core/api.js";
import { timestampToTime } from "../core/utils.js";

export default {
  name: "Todos",
  data: function() {
    return {
      items: [],
      currentPage: 1,
      size: 10,
      total: 0,
      id: null,
      breadCrumbItems: [
        { path: "/admin/overview", name: "首页" },
        { path: "/admin/todolists", name: "任务簿" },
        { path: "", name: "Todo List" },
      ],
    };
  },
  components: {
    ToDoItem,
    BreadCrumb
  },
  created() {
    this.id = this.$route.params.id;
    this.getItems();
  },
  methods: {
    addItem() {
      MessageBox.prompt("请输入任务", "提示", {
        confirmButtonText: "提交",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          ret = this.createItem(value);
        })
        .catch(() => {});
    },
    async createItem(task) {
      let ret = await api.post("/v1/todolist/" + this.id + "/items", {
        task: task
      });
      this.getItems();
      return ret;
    },
    async getItems() {
      let ret = await api.get("/v1/todolist/" + this.id + "/items", {});
      let data = ret;
      for (let i = 0; i < data.length; i++) {
        data[i].created_at = timestampToTime(data[i].created_at);
      }
      this.items = ret
    }
  }
};
</script>

<style lang="less" scoped>
.add-item {
  font-size: 26px;
  text-align: center;
  color: #555;
  cursor: pointer;
  margin-bottom: 10px;
  :hover {
    background: #fbfbfb;
  }
}
</style>