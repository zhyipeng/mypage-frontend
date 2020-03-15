<template>
  <el-card>
    <ToDoItem v-for="item in items" :key="item.id" :task="item"></ToDoItem>
  </el-card>
</template>

<script>
import ToDoItem from "../components/todoItem";

export default {
  name: "ToDoLists",
  data: function(){
      return {
          items: []
      }
  },
  components: {
    ToDoItem
  },
  created() {
    this.items = [
      { id: 3, is_finished: false, content: "哦啊何必" },
      { id: 2, is_finished: false, content: "哦啊何必" },
      { id: 1, is_finished: true, content: "哦啊何必" }
    ];
    console.log(this.items);
  }
};
</script>

<style lang="less" scoped>
</style>