<template>
  <el-card class="todo-item" @mouseenter.native="mouseEnter" @mouseleave.native="mouseLeave">
    <div @click="change" class="item">
      <i :class="{'el-icon-full-screen': !isFinished, 'el-icon-check': isFinished}"></i>
      <span class="todo-text" :class="{'todo-finished': isFinished}">{{task.task}}</span>
    </div>
    <div class="delete-box" v-if="displayDelete" @click="deleteItem">
      <i class="el-icon-delete"></i>
    </div>
  </el-card>
</template>

<script>
import { api } from "../core/api.js";

export default {
  name: "ToDoItem",
  data: function() {
    return {
      isFinished: false,
      displayDelete: false
    };
  },
  props: {
    task: Object
  },
  methods: {
    change() {
      this.changeFinished()
      this.isFinished = !this.isFinished;
    },
    mouseEnter() {
      this.displayDelete = true;
    },
    mouseLeave() {
      this.displayDelete = false;
    },
    async deleteItem() {
      let ret = await api.delete("/v1/todolist/" + this.task.id);
      this.$emit("delete_item");
    },
    async changeFinished() {
      let ret = await api.put("/v1/todolist/" + this.task.id + "/finished", {
        is_finished: !this.task.is_finished
      });
      this.task.is_finished = !this.task.is_finished
    }
  },
  created() {
    this.isFinished = this.task.is_finished;
  }
};
</script>

<style lang="less" scoped>
.todo-item {
  cursor: pointer;
  margin-bottom: 10px;
  font-size: 26px;
  color: #555;
  position: relative;
  :hover {
    background: #fbfbfb;
  }
}
.item {
  display: inline-block;
}
.todo-text {
  margin-left: 15px;
}
.todo-finished {
  text-decoration: line-through;
  color: #ddd;
}
.delete-box {
  display: inline-block;
  float: right;
}
</style>