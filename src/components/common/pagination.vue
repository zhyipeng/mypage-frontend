<template>
    <el-pagination
      v-if="total >= size"
      :background="bgStyle"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="size"
      :layout="layout"
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
    total: Number,
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    bgStyle: {
      type: Boolean,
      default: false
    }
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