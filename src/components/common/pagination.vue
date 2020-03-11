<template>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
</template>

<script>
export default {
  name: 'Pagination',
  data: function(){
    return {
      currentPage: 1,
      size: 10,
    }
  },
  props: {
    pageSizes: Array,
    total: Number
  },
  methods: {
    'handleSizeChange': function(size){
      this.size = size
      this.$emit('size_change', size)
    },
    'handleCurrentChange': function(page){
      this.currentPage = page
      this.$emit('page_change', page)
    }
  }
}
</script>

<style lang="less" scoped>
.el-pagination {
  margin-top: 20px;
}
</style>