<template>
<div @click="change" class="todo-item">
    <i :class="{'el-icon-full-screen': !isFinished, 'el-icon-check': isFinished}"></i>
    <span class="todo-text" :class="{'todo-finished': isFinished}">{{task.content}}</span>
</div>
</template>

<script>
export default {
  name: "ToDoItem",
  data: function(){
      return {
        isFinished: false
      }
  },
  props: {
      task: Object
  },
  methods: {
    change() {
      this.isFinished = !this.isFinished
    }
  },
  created () {
      this.isFinished = this.task.is_finished
  }
};
</script>

<style lang="less" scoped>
.todo-item {
    cursor: pointer;
}
.todo-text {
  margin-left: 15px;
}
.todo-finished {
  text-decoration: line-through;
  color: #bbb;
}
</style>