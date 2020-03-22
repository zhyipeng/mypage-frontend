<template>
        <el-menu
          background-color="#fff"
          text-color="#555"
          active-text-color="#aaa"
          :collapse-transition="false"
          :default-active="currentPath"
          router
        >
          <el-menu-item index="/">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/archieve">
            <i class="el-icon-video-camera-solid"></i>
            <span slot="title">归档</span>
          </el-menu-item>
          <el-menu-item index="/tags">
            <i class="el-icon-s-management"></i>
            <span slot="title">标签</span>
          </el-menu-item>
          <el-menu-item index="/categories">
            <i class="el-icon-s-order"></i>
            <span slot="title">分类</span>
          </el-menu-item>
          <el-menu-item index="/search">
            <i class="el-icon-search"></i>
            <span slot="title">搜索</span>
          </el-menu-item>
        </el-menu>
    
</template>

<script>
export default {
    name: 'Menu',
    computed: {
        currentPath: function(){return this.$router.history.current.path}
    }
}
</script>

<style lang="less" scoped>
.el-menu {
    padding: 20px 0;
    width: 100%;
}
// .el-menu-item {
//     height: 37px;
//     line-height: 37px;
//     font-size: 13px;
// }
</style>