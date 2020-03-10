<template>
  <el-table :data="data" style="width: 100%" stripe>
    <el-table-column v-for="item in attrs" :key="item.label" :prop="item.attr" :label="item.label"></el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "List",
  props: {
    data: Array,
    attrs: Array
  },
  data: function() {
    return {
      q: ""
    };
  }
};
</script>

<style lang="less" scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}
.search-row {
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>